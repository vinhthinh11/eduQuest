import { Button, Input } from '@mui/joy';
import { MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuestionContext } from '../QuestionContextProvider.jsx';
import { getSubject } from '../../services/apiSubject.js';

const style = {
  maxHeight: '2rem',
  backgroundColor: '#836FFF',
  minWidth: '130px',
  color: 'white',
  ':hover': { backgroundColor: '#624afd' },
};

const QuesttionHeader = ({ setPerPage }) => {
  const {
    grade,
    setGrade,
    level,
    setLevel,
    subject,
    setSubject,
    query,
    setQuery,
  } = useQuestionContext();
  const [subjects, setSubjects] = useState([]);

  const handleChangeGrade = event => {
    setGrade(event.target.value);
  };

  const handleChangeLevel = event => {
    setLevel(event.target.value);
  };
  const handleChangeSubject = event => {
    setSubject(event.target.value);
  };
  useEffect(() => {
    // Fetch subjects from API or any other data source
    const fetchSubjects = async () => {
      try {
        const { data } = await getSubject();
        setSubjects(data?.subjects);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, []);
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
            value={query}
            onChange={e => setQuery(e.target.value)}
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
        <div className="flex gap-2">
          <Select
            sx={style}
            labelId="grade"
            id="grade"
            value={grade}
            label="grade"
            onChange={handleChangeGrade}
          >
            <MenuItem value={0}>Chọn khối</MenuItem>
            <MenuItem value={10}>Lớp 10</MenuItem>
            <MenuItem value={11}>Lớp 11</MenuItem>
            <MenuItem value={12}>Lớp 12</MenuItem>
          </Select>
          <Select
            sx={style}
            labelId="subject"
            id="grade"
            value={subject}
            label="Môn"
            onChange={handleChangeSubject}
          >
            <MenuItem value={0}>Chọn môn</MenuItem>
            {subjects.map(e => (
              <MenuItem key={e.subject_id} value={e.subject_id}>
                {e.subject_detail}
              </MenuItem>
            ))}
          </Select>

          <Select
            sx={style}
            labelId="level"
            id="level"
            value={level}
            label="grade"
            onChange={handleChangeLevel}
          >
            <MenuItem value={0}>Chọn mức độ</MenuItem>
            <MenuItem value={1}>Dễ</MenuItem>
            <MenuItem value={2}>Trung bình</MenuItem>
            <MenuItem value={3}>Khó</MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
};
export { QuesttionHeader };
