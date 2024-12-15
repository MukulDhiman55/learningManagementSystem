"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCourseDetails, enrollCourse } from "@/app/services/api";
import { Course } from "@/app/types/course"; 

const CourseDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  // Type the state correctly: it can either be `null` or a `Course`
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string>(""); // Error handling state

  useEffect(() => {
    if (id) {
      async function fetchCourseDetails() {
        try {
          const data = await getCourseDetails(id as string);
          setCourse(data);
          setLoading(false); // Set loading to false after data is fetched
        } catch (err) {
          console.log(err);
          setError("Failed to fetch course details. Please try again.");
          setLoading(false);
        }
      }
      fetchCourseDetails();
    }
  }, [id]);

  const handleEnrollCourse = async (courseId: string) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Authentication token is missing");
      return;
    }

    try {
      const enrolledCourse = await enrollCourse(courseId, token);
      // You can redirect or show a success message here
      console.log("Successfully enrolled in the course:", enrolledCourse);
    } catch (error) {
      console.error("Error enrolling in the course:", error);
    }
  };

  if (loading) {
    return <div>Loading course details...</div>; // Loading state while waiting for data
  }

  if (error) {
    return <div>{error}</div>; // Display error message if something went wrong
  }

  if (!course) {
    return <div>Course not found.</div>; // Handle the case where no course is returned
  }

  return (
    <div className="course-details-container">
      <h1 className="text-3xl font-semibold mb-4">{course.title}</h1>
      <p className="text-lg">{course.description}</p>
      <p className="mt-4">
        <strong>Instructor: </strong>{course.instructor}
      </p>
      <p className="mt-4">
        <strong>Duration: </strong>{course.duration} hours
      </p>

      {/* Enroll button */}
      <button
        onClick={() => handleEnrollCourse(course._id)}
        className="px-6 py-3 bg-blue-600 text-white rounded-md mt-6 hover:bg-blue-700"
      >
        Enroll in this course
      </button>
    </div>
  );
};

export default CourseDetails;