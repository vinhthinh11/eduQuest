import React, { useEffect, useState } from "react";
import { getUser } from "../services/apiUser";
import "../assets/style.css";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function TestDetail() {
  const [testDetail, setTestDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const { id } = useParams();
  const [timer, setTimer] = useState({
    minutes: 10,
    seconds: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getUser(`/admin/test/detail/${id}`);
        if (Array.isArray(data.data)) {
          const initialSelectedAnswers = {};
          data.data.forEach((question, index) => {
            initialSelectedAnswers[index] = "";
          });
          setSelectedAnswers(initialSelectedAnswers);
          setTestDetail(data.data);
          setIsLoading(false);
        } else {
          console.error("Data is not an array:", data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching test detail:", error);
        setIsLoading(false);
        toast.error("Đã xảy ra lỗi khi tải chi tiết bài thi.");
      }
    }

    fetchData();
  }, [id]);

  

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer.seconds === 0) {
        if (timer.minutes === 0) {
          clearInterval(countdown);
          alert("Hết giờ, hệ thống sẽ tự động nộp bài!");
          // Xử lý khi hết giờ
          return;
        } else {
          setTimer({
            minutes: timer.minutes - 1,
            seconds: 59,
          });
        }
      } else {
        setTimer({
          ...timer,
          seconds: timer.seconds - 1,
        });
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleSubmitTest = () => {
    if (window.confirm("Xác nhận nộp bài?")) {
      // Xử lý khi nộp bài
    }
  };

  const handleAnswerChange = (index, answer) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [index]: answer,
    }));
    setAnsweredQuestions((prevState) => [...prevState, index]);
  };

  if (isLoading) 
    return (
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
    );
  else

  return (
    <>
      <div className="body-login overflow-scroll pl-6 snap-y">
        <nav className="bg-gray-800 text-white snap-start fixed top-0 left-0 right-0 z-50 py-4 px-9">
          <div className="flex justify-between mx-9">
            <div className="left pad-left-20">
              <span className="title">
              Làm Bài Thi
                {/* Làm Bài Thi {testDetail[0].test_code} */}
              </span>
            </div>
            <span className="brand-logo right cursor" id="timer">
              {`${timer.minutes < 10 ? "0" : ""}${timer.minutes}:${
                timer.seconds < 10 ? "0" : ""
              }${timer.seconds}`}
            </span>
          </div>
        </nav>
        <div id="status" className="status"></div>
      </div>
      <div>
        <div className="test-content mt-19">
          <div className="testing-left ">
            {testDetail.map((question, index) => (
              <a
                href={`#quest-${index + 1}`}
                className="menu-link block"
                key={index}
              >
                Câu {index + 1}{" "}
                <span
                  className="tick"
                  id={`tick-${index + 1}`}
                  style={{
                    visibility: answeredQuestions.includes(index)
                      ? "visible"
                      : "hidden",
                  }}
                >
                  ✓
                </span>
              </a>
            ))}
          </div>
          <div className="testing-right ">
            {testDetail.map((question, index) => (
              <div
                key={index}
                id={`quest-${index + 1}`}
                className="item-quest mb-4"
              >
                <h2>Question {index + 1}</h2>
                <p>{question.question_content}</p>
                <ul>
                  {["A", "B", "C", "D"].map((answer, ansIndex) => (
                    <li key={ansIndex}>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`answer_${index}`}
                          value={answer}
                          checked={selectedAnswers[index] === answer}
                          onChange={() => handleAnswerChange(index, answer)}
                        />{" "}
                        <span className="ml-2">
                          {question[`answer_${answer.toLowerCase()}`]}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
                <p>Correct Answer: {question.correct_answer}</p>
              </div>
            ))}
          </div>
          <div className="clear"></div>
        </div>
        <button
          className="btn bg-blue-500 text-white py-2 px-4 rounded-lg"
          onClick={handleSubmitTest}
          style={{ width: "100px", marginLeft: "40%", marginBottom: "20px" }}
        >
          Nộp
        </button>
      </div>
    </>
  );
}

export default TestDetail;
