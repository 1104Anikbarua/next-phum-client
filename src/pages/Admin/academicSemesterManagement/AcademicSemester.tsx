// import React from 'react';

import { useAcademicSemesterQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data } = useAcademicSemesterQuery(undefined);

  console.log(data);
  return <div>This is Academic semester page</div>;
};

export default AcademicSemester;
