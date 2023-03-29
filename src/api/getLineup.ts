import { z } from "zod";
import { parseDateTime } from "../utils";
import { getData, Mapper } from "./apiUtils";

const daySchema = z.enum(["Fri", "Sat", "Sun"]);

const lineupSchema = z.object({
  id: z.number(),
  name: z.string(),
  day: daySchema,
  startTime: z.date(),
  endTime: z.date(),
  venue: z.string(),
  details: z.string().optional(),
  artistBioUrl: z.string().url(),
  venueAddress: z.string(),
});

export type Lineup = z.infer<typeof lineupSchema>;

const lineupMapper: Mapper<Lineup> = (row) => {
  const dateStr = daySchema.parse(row[2]);
  return lineupSchema.parse({
    id: parseInt(row[0]),
    name: row[1],
    day: dateStr,
    startTime: parseDateTime(dateStr, row[3]), //4th element in the array is the start time only
    endTime: parseDateTime(dateStr, row[4]), //5th element in the array is the end time only
    venue: row[5],
    details: row[6],
    artistBioUrl: row[7],
    venueAddress: row[8],
  });
};

export const getLineup = async (): Promise<Lineup[]> => {
  return getData("lineup", lineupSchema, lineupMapper);
};