import { z, ZodSchema } from "zod";

export type SheetRange = "lineup" | "artist" | "venue" | "settings";

export const getSheetUrl = (range: SheetRange): string => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  const sheetId = import.meta.env.VITE_SHEET_ID;

  const sheetRange = getSheetRange(range);

  return `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${apiKey}`;
};

export const googleSheetResponseSchema = z.object({
  values: z.array(z.any()),
});

export type GoogleSheetResponse = z.infer<typeof googleSheetResponseSchema>;

export type Mapper<T> = (row: any[]) => T;

export const getData = async <T>(
  sheetRange: SheetRange,
  schema: ZodSchema<T>,
  mapper: Mapper<T>
): Promise<T[]> => {
  try {
    const apiUrl = getSheetUrl(sheetRange);

    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(
        `error getting response from '${apiUrl}' Status Code ${res.status}`
      );
    }
    const data = await res.json();
    var sheet = googleSheetResponseSchema.parse(data);
    return sheet.values.map((row) => {
      const parsedRow = mapper(row);
      return schema.parse(parsedRow);
    });
  } catch (e: any) {
    console.error(e);
    throw new Error(e);
  }
};

const getSheetRange = (range: SheetRange) => {
  switch (range) {
    case "artist":
      return import.meta.env.VITE_ARTIST_RANGE;
    case "lineup":
      return import.meta.env.VITE_LINEUP_RANGE;
    case "venue":
      return import.meta.env.VITE_VENUE_RANGE;
    case "settings":
      return import.meta.env.VITE_SETTINGS_RANGE;
  }
};
