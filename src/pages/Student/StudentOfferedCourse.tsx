// import React from "react";
import { Button, Col, Row, Tag } from "antd";
import {
  useAddEnrollCourseMutation,
  useGetMyOfferedCourseQuery,
} from "../../redux/features/student/studentCourseApi";
import Title from "antd/es/typography/Title";
import { toast } from "sonner";
import { IError } from "../../types";

type ICourse = {
  courseTitle: string;
  sections: {
    _id: string;
    section: string;
    startTime: string;
    endTime: string;
    days: string[];
    capacity: number;
  }[];
}[];
//
interface IReducer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any;
}
//

const StudentOfferedCourse = () => {
  const { data: offeredCourses } = useGetMyOfferedCourseQuery(undefined);

  const courseWithSections = offeredCourses?.resposne?.reduce(
    (previous: IReducer, current) => {
      const key = current.course.title;

      // previous
      previous[key] = previous[key] || { courseTitle: key, sections: [] };
      //previous[key] || telling if previous have any object with courestitle and sections property donot replace {coursetitle:key,sections:[]} them with new object keep them and in other array index and store new object
      //
      previous[key].sections.push({
        _id: current._id,
        section: current.section,
        startTime: current.startTime,
        endTime: current.endTime,
        capacity: current.maxCapacity,
        days: current.days,
      });
      //
      return previous;
    },
    {}
  );

  const courses: ICourse = Object.values(
    courseWithSections ? courseWithSections : {}
  );

  const [addEnrollCourse, { isLoading }] = useAddEnrollCourseMutation();
  const handleSubmit = async (courseId: string) => {
    const id = toast.loading("Creating Course", {
      position: "top-center",
    });
    const offeredCourse = {
      offeredCourse: courseId,
    };
    try {
      const res = await addEnrollCourse(offeredCourse).unwrap();
      console.log(res);
      if (res.success) {
        toast.success(res.message, {
          id,
          position: "top-center",
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error((error as IError).data?.message, {
        id,
        position: "top-center",
        duration: 2000,
      });
    }
  };
  return (
    <Row gutter={[0, 20]}>
      {courses.map((course, index) => {
        return (
          <Col
            key={index}
            span={24}
            style={{
              border: "1px solid",
              borderRadius: "5px",
              padding: "12px",
            }}
          >
            <Title level={5}>Title : {course.courseTitle}</Title>

            {course.sections.map((section) => {
              return (
                <Row
                  justify={"space-between"}
                  key={section._id}
                  //   gutter={[20, 10]}
                  style={{
                    padding: "10px",
                  }}
                >
                  <Col span={4}>
                    <Title level={5}>Section : {section.section}</Title>
                  </Col>
                  <Col span={4}>
                    {section.days.map((day, index) => {
                      return (
                        <Tag
                          color="blue"
                          key={index}
                          style={{ marginRight: "5px" }}
                        >
                          {day}
                        </Tag>
                      );
                    })}
                  </Col>

                  <Col span={4}>
                    <Title level={5}>Start Time : {section.startTime}</Title>
                  </Col>
                  <Col span={4}>
                    <Title level={5}>End Time : {section.endTime}</Title>
                  </Col>
                  <Col span={4}>
                    <Title level={5}>Capacity : {section.capacity}</Title>
                  </Col>
                  {/* * */}
                  <Button
                    type="primary"
                    onClick={() => handleSubmit(section._id)}
                    loading={isLoading}
                  >
                    Enroll
                  </Button>
                </Row>
              );
            })}
          </Col>
        );
      })}
    </Row>
  );
};
export default StudentOfferedCourse;
