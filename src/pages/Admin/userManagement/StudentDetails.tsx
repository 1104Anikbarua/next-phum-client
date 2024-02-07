// import React from "react";
import { useParams } from "react-router-dom";
import { useGetStudentQuery } from "../../../redux/features/admin/userManagementApi";

const StudentDetails = () => {
  const { studentId } = useParams();

  const { data, isFetching } = useGetStudentQuery(studentId);
  console.log({ data, isFetching });
  return (
    <div>
      <p>Student id is {studentId}</p>
    </div>
  );
};

export default StudentDetails;
