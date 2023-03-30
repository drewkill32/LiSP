import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useLineup } from "../lineup";

export const Search = () => {
  const { artists, search, setSearch } = useLineup();

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
        onChange={(_e, newValue) => {
          setSearch(newValue);
        }}
        freeSolo
        autoSelect
        renderInput={(params) => (
          <TextField {...params} label="Search Artists" />
        )}
      />
    </Stack>
  );
};
