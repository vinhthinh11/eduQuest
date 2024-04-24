import React, { useState, useEffect } from "react";
import { getUser } from "../services/apiUser";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

function TestComponent() {
  const [testData, setTestData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true);
        const data = await getUser(`/teacher/test/get/${id}`);
        const responseData = data.data;
        if (responseData && responseData.data && responseData.data.time_to_do) {
          setTime(responseData.data.time_to_do * 60);
        } else {
          console.log("Không thể tìm thấy trường time_to_do trong dữ liệu");
          setTime(0);
        }
        setTestData(responseData.data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, [id]);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        setOpenModal(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]);

  const handleAnswerChange = (index, answer) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [index]: answer,
    }));

    if (!answeredQuestions.includes(index)) {
      setAnsweredQuestions((prevState) => [...prevState, index]);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmitTest = () => {
    setOpenModal(false);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress
          size={80}
          sx={{
            translateX: "-10px",
            translateY: "-10px",
          }}
        />
      </Box>
    );
  else
    return (
      <>
        {testData && (
          <div>
            <nav className="bg-gray-800 text-white snap-start fixed top-0 left-0 right-0 z-50 py-4 px-9">
              <div className="flex justify-between mx-9">
                <div className="left pad-left-20">
                  <span className="title">{testData?.test_name}</span>
                </div>
                <div className="right pad-right-20">
                  <span className="title">
                  {minutes.toString().padStart(2, '0')} : {seconds.toString().padStart(2, '0')} {" "}
                  </span>
                </div>
              </div>
            </nav>
            <div className="body-login overflow-scroll pl-6 snap-y">
              <div id="status" className="status"></div>
            </div>
            <div className="test-content mt-19">
              <div className="testing-left">
                {testData?.questions.map((question, questionIndex) => (
                  <a
                    href={`#quest-${questionIndex + 1}`}
                    className="menu-link block"
                    key={questionIndex}
                  >
                    Câu {questionIndex + 1}{" "}
                    <span
                      className="tick"
                      style={{
                        visibility: answeredQuestions.includes(questionIndex)
                          ? "visible"
                          : "hidden",
                      }}
                    >
                      ✓
                    </span>
                  </a>
                ))}
              </div>

              <div className="testing-right px-5">
                {testData?.questions.map((question, questionIndex) => (
                  <div
                    key={questionIndex}
                    className="border border-gray-300 rounded-lg p-4 mb-4"
                  >
                    <p>
                      <span className="font-bold">
                        Câu {questionIndex + 1} :{" "}
                      </span>{" "}
                      {question.question_content}
                    </p>
                    <form>
                      <label>
                        <input
                          type="radio"
                          value="A"
                          checked={selectedAnswers[questionIndex] === "A"}
                          onChange={() =>
                            handleAnswerChange(questionIndex, "A")
                          }
                        />
                        Answer A: {question.answer_a}
                      </label>
                      <br />
                      <label>
                        <input
                          type="radio"
                          value="B"
                          checked={selectedAnswers[questionIndex] === "B"}
                          onChange={() =>
                            handleAnswerChange(questionIndex, "B")
                          }
                        />
                        Answer B: {question.answer_b}
                      </label>
                      <br />
                      <label>
                        <input
                          type="radio"
                          value="C"
                          checked={selectedAnswers[questionIndex] === "C"}
                          onChange={() =>
                            handleAnswerChange(questionIndex, "C")
                          }
                        />
                        Answer C: {question.answer_c}
                      </label>
                      <br />
                      <label>
                        <input
                          type="radio"
                          value="D"
                          checked={selectedAnswers[questionIndex] === "D"}
                          onChange={() =>
                            handleAnswerChange(questionIndex, "D")
                          }
                        />
                        Answer D: {question.answer_d}
                      </label>
                    </form>
                  </div>
                ))}
              </div>
              <div className="clear"></div>
            </div>
            <button
              className="btn bg-blue-500 text-white py-2 px-4 rounded-lg"
              style={{
                width: "100px",
                marginLeft: "40%",
                marginBottom: "20px",
              }}
              onClick={() => setOpenModal(true)}
            >
              Nộp
            </button>
          </div>
        )}

        {/* Modal */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              p: 2,
              mt: 2,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Cảnh báo
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Xác nhận nộp bài
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
                gap: 1,
              }}
            >
              <button
                onClick={handleCloseModal}
                className="min-w-24 bg-slate-100 hover:bg-slate-500 text-slate-600 hover:text-slate-100 font-bold py-2 px-4 rounded border-2 border-slate-500 transition duration-300 ease-in-out"
              >
                Quay lại
              </button>
              <button
                onClick={handleSubmitTest}
                className="min-w-24 bg-slate-100 hover:bg-red-500 text-red-500 hover:text-slate-100 font-bold py-2 px-4 rounded border-2 border-red-500 transition duration-300 ease-in-out"
              >
                Nộp bài
              </button>
            </Box>
          </Box>
        </Modal>
      </>
    );
}

export default TestComponent;
