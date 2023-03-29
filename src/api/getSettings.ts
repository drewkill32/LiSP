import { z } from "zod";
import { getData, Mapper } from "./apiUtils";

const settingsSchema = z.record(z.string());

export type Settings = z.infer<typeof settingsSchema>;

const settingsMapper: Mapper<Settings> = (row) => ({
  [row[0]]: row[1],
});

export const getSettings = async (): Promise<Settings[]> => {
  return getData("settings", settingsSchema, settingsMapper);
};
