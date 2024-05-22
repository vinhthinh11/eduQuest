import { Button, Input } from '@mui/joy';
import React, { useState } from 'react';

const SearchComponent = ({ usersData, setUsers, users }) => {
  const initialUser = usersData;
  // console.log(initialUser, users);
  const [query, setQuery] = useState('');

  return (
    <div className="flex max-h-2 gap-3 items-center">
      <Input
        slotProps={{
          input: { placeholder: 'Enter here to search ...', type: 'text' },
        }}
        value={query}
        sx={{
          '--Input-minHeight': '30px',
          '--Input-radius': '10px',
          ':focus': { outline: 'none' },
          ':active': { outline: 'none' },
        }}
        onChange={e => {
          setQuery(e.target.value);
          if (e.target.value === '') {
            setUsers(() => initialUser);
            return;
          }
          setUsers(
            initialUser.filter(user =>
              user.name.toLowerCase().includes(e.target.value.toLowerCase())
            )
          );
        }}
      />
      <Button
        sx={{
          height: '10px',
          backgroundColor: '#836FFF',
          ':hover': { backgroundColor: '#624afd' },
        }}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchComponent;
