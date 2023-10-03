import TextField from '@mui/material/TextField';

export default function SearchBar({ updateSearchTerm }) {
  //return <input onChange={(e) => updateSearchTerm(e.target.value)} />;

  return (
    <TextField
      id="outlined-search"
      label="Search"
      type="search"
      onChange={(e) => updateSearchTerm(e.target.value)}
      fullWidth
      sx={{ marginTop: '20px' }}
    />
  );
}
