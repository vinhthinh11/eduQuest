import React from 'react';

const QuizResult = () => {
    // Dữ liệu giả mạo cho kết quả và câu hỏi
    const mockScore = {
        score_number: 80,
        score_detail: 16,
        completion_time: '10:30 AM'
    };

    const mockQuestions = [
        {
            question_content: 'Đây là câu hỏi 1?',
            student_answer: 'A',
            correct_answer: 'A',
            answer_a: 'A',
            answer_b: 'B - Đáp án B',
            answer_c: 'C - Đáp án C',
            answer_d: 'D - Đáp án D'
        },
        {
            question_content: 'Đây là câu hỏi 2?',
            student_answer: 'B',
            correct_answer: 'C',
            answer_a: 'A - Đáp án A',
            answer_b: 'B',
            answer_c: 'C - Đáp án C',
            answer_d: 'D - Đáp án D'
        },
        // Thêm câu hỏi giả mạo khác ở đây nếu cần
    ];

    return (
        <div className="quiz-result bg-gray-100">
            <div className="title-content bg-gray-800 p-2">
                <span className="title text-white">Kết Quả Bài Làm</span>
            </div>
            <div className="block-content overflow-y-auto scrollbar">
                <div className="content">
                    <div id="recent_list" className="bg-gray-800 p-2" style={{ paddingBottom: '20px' }}>
                        <span className="title text-green-500">{mockScore.score_number} Điểm</span><br />
                        <span className="title text-green-500">Đúng {mockScore.score_detail} Câu</span><br />
                        <span className="title text-green-500">Hoàn Thành Lúc: {mockScore.completion_time}</span><br />
                        <span className="title text-green-500">CHI TIẾT BÀI THI</span>
                    </div>
                    <div id="recent">
                        {mockQuestions.map((question, index) => (
                            <div key={index} className="item-quest border-b-2 border-gray-200 p-2 mt-3">
                                <div className="quest-title font-bold text-lg">Câu {index + 1}:</div>
                                <div className="quest-content">
                                    <span>{question.question_content}</span>
                                </div>
                                <div className="quest-answer mt-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            checked={question.student_answer === question.answer_a}
                                            disabled
                                        />
                                        <span className={`ml-2 ${question.correct_answer === 'A' ? 'text-green-500' : question.student_answer === question.answer_a ? 'text-red-500' : 'text-black'}`}>
                                            {question.answer_a}
                                        </span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            checked={question.student_answer === question.answer_b}
                                            disabled
                                        />
                                        <span className={`ml-2 ${question.correct_answer === 'B' ? 'text-green-500' : question.student_answer === question.answer_b ? 'text-red-500' : 'text-black'}`}>
                                            {question.answer_b}
                                        </span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            checked={question.student_answer === question.answer_c}
                                            disabled
                                        />
                                        <span className={`ml-2 ${question.correct_answer === 'C' ? 'text-green-500' : question.student_answer === question.answer_c ? 'text-red-500' : 'text-black'}`}>
                                            {question.answer_c}
                                        </span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            checked={question.student_answer === question.answer_d}
                                            disabled
                                        />
                                        <span className={`ml-2 ${question.correct_answer === 'D' ? 'text-green-500' : question.student_answer === question.answer_d ? 'text-red-500' : 'text-black'}`}>
                                            {question.answer_d}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizResult;
