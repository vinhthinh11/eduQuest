import { Button, Input } from '@mui/joy';
import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import SearchComponent from '../../components/SearchComponent';

const style = {
  maxHeight: '2rem',
  backgroundColor: '#836FFF',
  color: 'white',
  ':hover': { backgroundColor: '#624afd' },
};

const QuesttionHeader = ({ setPerPage }) => {
  const [grade, setGrade] = useState(10);
  const [level, setLevel] = useState('Easy');

  const handleChangeGrade = event => {
    setGrade(event.target.value);
  };

  const handleChangeLevel = event => {
    setLevel(event.target.value);
  };

  return (
    <div>
      <div className="flex items-center py-6 justify-between px-4 border-b-2 border-edu">
        <div className="flex max-h-2 gap-3 items-center">
          <Input
            slotProps={{
              input: { placeholder: 'Enter here to search ...', type: 'text' },
            }}
            sx={{
              '--Input-minHeight': '30px',
              '--Input-radius': '10px',
              ':focus': { outline: 'none' },
              ':active': { outline: 'none' },
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
          {/* <SearchComponent /> */}
        </div>
        <div className="flex gap-2">
          <Select
            sx={style}
            labelId="grade"
            id="grade"
            value={grade}
            label="grade"
            onChange={handleChangeGrade}
          >
            <MenuItem value={10}>Grade 10</MenuItem>
            <MenuItem value={11}>Grade 11</MenuItem>
            <MenuItem value={12}>Grade 12</MenuItem>
          </Select>
          <Select
            sx={style}
            labelId="level"
            id="level"
            value={level}
            label="grade"
            onChange={handleChangeLevel}
          >
            <MenuItem value={'Easy'}>Easy</MenuItem>
            <MenuItem value={'Medium'}>Medium</MenuItem>
            <MenuItem value={'Hard'}>Hard</MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
};
export { QuesttionHeader };
