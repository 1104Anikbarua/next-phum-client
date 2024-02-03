// import React from 'react';

import { useGetAcademicSemestersQuery } from "../../../redux/features/admin/academicManagementApi";

const AcademicSemester = () => {
  const { data } = useGetAcademicSemestersQuery(undefined);

  console.log(data);
  return <div>This is Academic semester page</div>;
};

export default AcademicSemester;
