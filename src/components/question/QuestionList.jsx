import { useEffect, useState } from 'react';
import {
  findQuestion,
  getQuestion,
  getSubjects,
} from '../../services/apiQuestion.js';
import toast from 'react-hot-toast';
import { Box, CircularProgress } from '@mui/material';
import { UserContextProvider } from '../../admin/UserContextProvider.jsx';
import ModalCreateQuestion from '../question/ModalCreateQuestion.jsx';
import ModalUploadFileQuestion from '../question/ModalUploadFileQuestion.jsx';
import ModalEditQuestion from './ModalEditQuestion.jsx';
import ModalDeleteQuestion from './ModalDeleteQuestion.jsx';
import { useQuestionContext } from '../../admin/QuestionContextProvider.jsx';

const status_ids = {
  1: 'Đóng',
  2: 'Mở',
  3: 'Chờ duyệt',
  4: 'Đã duyệt',
  5: 'Không duyệt',
};

const QuestionItem = ({
  question,
  index,
  openModal,
  openDeleteModal,
  subjects,
}) => {
  return (
    <>
      <tr className="hover:bg-slate-200" key={index}>
        <td className="px-3 py-4 text-center">{index + 1}</td>
        <td className="px-3 py-4 text-center w-1/6">
          {question.question_content}
        </td>
        <td className="px-3 py-4 text-center w-1/6 whitespace-nowrap">
          {question.level_id === 1
            ? 'Dễ'
            : question.level_id === 2
            ? 'Trung bình'
            : 'Khó'}
        </td>
        <td className="px-3 py-4 text-center w-1/6 whitespace-nowrap">
          <span className="whitespace-nowrap">
            Môn {subjects[question.subject_id]}
          </span>
          <br />
          <span>Chương {question?.unit}</span>
          <br />
          <span>Khối {question?.grade_id}</span>
          <br />
        </td>
        <td className="px-3 py-4 text-center w-1/6">
          {question?.teacher?.name ?? 'admin'}
        </td>
        <td className="px-3 py-4 text-center w-1/6">
          {status_ids[question?.status_id]}
        </td>
        <td className="px-3 py-4 whitespace-nowrap">
          <div className="flex flex-col">
            <button
              onClick={() => openModal(question)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-2"
            >
              Xem chi tiết
            </button>

            <button
              onClick={() => openDeleteModal(question)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Xoá
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [subjects, setSubjects] = useState({});
  const [queryQuestion, setQueryQuestion] = useState([]);
  const { grade, setGrade, level, setLevel, subject, setSubject, query } =
    useQuestionContext();

  useEffect(() => {
    async function fetchData() {
      try {
        const [questionData, subjectsData] = await Promise.all([
          getQuestion(),
          getSubjects(),
        ]);
        setQuestions(questionData.data?.data);

        const subjectMap = subjectsData.data.subjects.reduce((acc, subject) => {
          acc[subject.subject_id] = subject.subject_detail;
          return acc;
        }, {});
        setSubjects(subjectMap);
      } catch (err) {
        toast.error(err.message || 'Có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchSearchQuestion() {
      const { data } = await findQuestion(query);
      setQueryQuestion(data.data);
    }
    if (query !== '' && query.length > 3) fetchSearchQuestion();
  }, [query]);

  const openModal = question => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  const openDeleteModal = question => {
    setSelectedQuestion(question);
    setIsDeleteModalOpen(true);
  };

  const visibleUsers = () => {
    let filteredQuestions = questions;
    if (queryQuestion.length > 0) filteredQuestions = queryQuestion;

    if (grade !== 0)
      filteredQuestions = filteredQuestions.filter(
        question => question.grade_id === grade
      );
    if (level !== 0)
      filteredQuestions = filteredQuestions.filter(
        question => question.level_id === level
      );
    if (subject !== 0)
      filteredQuestions = filteredQuestions.filter(
        question => question.subject_id === subject
      );
    return filteredQuestions;
  };
  const totalPages = Math.ceil(visibleUsers()?.length / perPage) || 1;

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            width: '100vw',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress
            size={80}
            sx={{
              translateX: '-10px',
              translateY: '-10px',
            }}
          />
        </Box>
      ) : (
        <table className="table-fixed">
          <thead className="bg-gray-50 text-slate-700">
            <tr>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider"
              >
                Câu hỏi
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider"
              >
                Cấp độ
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider "
              >
                Thông tin
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium  uppercase tracking-wider"
              >
                Người đăng
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium  uppercase tracking-wider"
              >
                Trạng thái
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider"
              >
                <p className="material-icons">settings</p>
              </th>
            </tr>
          </thead>
          <tbody
            className="bg-white divide-y divide-gray-200 "
            id="list_admins"
          >
            {visibleUsers()
              ?.slice((currentPage - 1) * perPage, currentPage * perPage)
              ?.map((question, index) => (
                <QuestionItem
                  key={index}
                  question={question}
                  index={index}
                  openModal={openModal}
                  openDeleteModal={openDeleteModal}
                  subjects={subjects}
                />
              ))}
          </tbody>
          <ModalEditQuestion
            open={isModalOpen}
            setOpen={setIsModalOpen}
            question={selectedQuestion}
          />
          <ModalDeleteQuestion
            open={isDeleteModalOpen}
            setOpen={setIsDeleteModalOpen}
            question={selectedQuestion}
          />
        </table>
      )}
      <div className="flex justify-center px-10 border-t-2 border-black pt-4">
        <div className="pagination pb-3 flex gap-2">
          <button
            className="min-w-20 bg-customPurple hover:bg-customPurpleLight text-white py-2 px-4 rounded-md"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Trước
          </button>
          <button
            disabled
            className="bg-customPurple hover:bg-customPurpleLight text-white py-2 px-4 rounded-md"
          >
            {`${currentPage}/${totalPages}`}
          </button>
          <button
            className=" min-w-20 bg-customPurple hover:bg-customPurpleLight text-white py-2 px-4 rounded-md"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Sau
          </button>
        </div>
      </div>
      <div className=" flex flex-col">
        <div className="title-content">
          <div className="text-center grid grid-cols-2 gap-4 w-full border-t-2 border-edu">
            <div className={showAdminForm ? 'border-b-2 border-edu' : ''}>
              <button
                className="text-sm font-medium my-4 bg-customPurple text-white px-3 py-2 rounded-md hover:bg-customPurpleLight outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customPurple"
                onClick={() => {
                  setShowAdminForm(true);
                  setShowFileUpload(false);
                }}
              >
                Thêm câu hỏi
              </button>
            </div>
            <div className={showFileUpload ? 'border-b-2 border-edu' : ''}>
              <button
                className="text-sm font-medium my-4 bg-customPurple text-white px-3 py-2 rounded-md hover:bg-customPurpleLight outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customPurple"
                onClick={() => {
                  setShowFileUpload(true);
                  setShowAdminForm(false);
                }}
              >
                Thêm bằng file
              </button>
            </div>
          </div>
        </div>
        <ModalCreateQuestion open={showAdminForm} setOpen={setShowAdminForm} />
        <ModalUploadFileQuestion
          open={showFileUpload}
          setOpen={setShowFileUpload}
        />
      </div>
    </>
  );
}

export default QuestionList;
