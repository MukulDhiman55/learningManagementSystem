"use client";

import { useEffect, useState } from "react";
import { getCourses } from "../services/api";
import CourseCard from "../components/CourseCard";
import { Course } from "../types/course";

const UserDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  // New states for search and filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterByDuration, setFilterByDuration] = useState<string>("");
  const [filterByInstructor, setFilterByInstructor] = useState<string>("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to load courses. Please try again.");
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Filter courses based on search and selected filters
  const filteredCourses = courses.filter((course) => {
    const matchesTitle = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDuration = filterByDuration ? course.duration.includes(filterByDuration) : true;
    const matchesInstructor = filterByInstructor ? course.instructor.toLowerCase().includes(filterByInstructor.toLowerCase()) : true;
    return matchesTitle && matchesDuration && matchesInstructor;
  });

  // Enroll user in the selected course
  const handleEnroll = async () => {
    if (!selectedCourse) return;

    console.log(`Enrolling in course: ${selectedCourse.title}`);
    try {
      // Example API call to enroll user
      // await enrollInCourse(selectedCourse._id);
      setError("Successfully enrolled in the course!");
    } catch (err) {
      console.error("Enrollment failed:", err);
      setError("Failed to enroll in the course. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center text-xl text-gray-600">Loading courses...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 min-h-screen py-8">
      <h1 className="text-4xl font-semibold text-center text-white mb-8">Available Courses</h1>

      {/* Search and Filter Section */}
      <div className="flex justify-center items-center mb-6">
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border-2 border-indigo-300 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        
        <input
          type="text"
          placeholder="Filter by instructor"
          value={filterByInstructor}
          onChange={(e) => setFilterByInstructor(e.target.value)}
          className="p-2 border-2 border-yellow-300 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <input
          type="text"
          placeholder="Filter by duration"
          value={filterByDuration}
          onChange={(e) => setFilterByDuration(e.target.value)}
          className="p-2 border-2 border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Display filtered course list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            onClick={() => setSelectedCourse(course)} // Set the selected course on card click
            className="transition-transform transform hover:scale-105"
          />
        ))}
      </div>

      {/* Display course details if selected */}
      {selectedCourse && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
          <h2 className="text-3xl font-semibold text-blue-600">{selectedCourse.title}</h2>
          <p className="mt-4 text-gray-700">{selectedCourse.description}</p>
          <p className="mt-2 text-sm text-gray-600"><strong>Duration:</strong> {selectedCourse.duration}</p>
          <p className="mt-2 text-sm text-gray-600"><strong>Instructor:</strong> {selectedCourse.instructor}</p>
          <button
            onClick={handleEnroll}
            className="px-6 py-2 bg-blue-500 text-white rounded-md mt-6 hover:bg-blue-600 transition duration-300"
          >
            Enroll in this Course
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;


