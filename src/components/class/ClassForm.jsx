import React, { useState, useEffect } from "react";
import FormComponent from "../FormComponent";

const ClassForm = ({ handleSubmit }) => {
  const [teacherOptions, setTeacherOptions] = useState([]);

  const grades = [10, 11, 12];

  const gradeOptions = grades.map(grade => ({
    value: grade.toString(),
    label: `Khối ${grade}`
  }));

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await fetch("/teacher/get");
        const data = await response.json();
        setTeacherOptions(data);
      } catch (error) {
        console.log('««««« error »»»»»', error);
      }
    };
    fetchTeacher();
  }, []);

  const defaultGradeOption = { value: "", label: "Hãy chọn khối" };

  const fields = [
    { label: "Tên lớp", name: "name", type: "text", value: "", required: true },
    { label: "Khối", name: "grade", type: "select", value: "", options: [defaultGradeOption, ...gradeOptions] }, 
    { label: "Giáo viên", name: "teacher", type: "select", value: "", options: teacherOptions },
  ];

  return (
    <FormComponent handleSubmit={handleSubmit} fields={fields} />
  );
};

export default ClassForm;
