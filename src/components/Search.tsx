import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import { useLineup } from "../lineup";

export const Search = () => {
  const { artists, search, setSearch } = useLineup();
  const inputRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter") {
      inputRef.current?.blur();
      btnRef.current?.focus();
    }
  }

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Stack direction="row" gap={2} component="form" onSubmit={handleOnSubmit}>
      <Autocomplete
        disablePortal
        id="search-artists"
        options={artists}
        value={search}
        fullWidth
        onKeyDown={handleKeyDown}
        onChange={(_e, newValue) => {
          setSearch(newValue);
        }}
        freeSolo
        autoSelect
        renderInput={(params) => (
          <TextField ref={inputRef} {...params} label="Search Artists" />
        )}
      />
      <button
        ref={btnRef}
        style={{ position: "absolute", left: "-9999px", opacity: 0 }}
        tabIndex={-1}
      >
        Hidden button
      </button>
    </Stack>
  );
};
