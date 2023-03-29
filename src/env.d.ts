/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_API_KEY: string;
  readonly VITE_SHEET_ID: string;
  readonly VITE_LINEUP_RANGE: string;
  readonly VITE_ARTIST_RANGE: string;
  readonly VITE_VENUE_RANGE: string;
  readonly VITE_SETTINGS_RANGE: string;
  readonly VITE_EVENT_START_DATE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
