"use client";

import { useEffect, useState } from "react";
import { getCourses, deleteCourse, updateCourse, addCourse } from "@/app/services/api";
import CourseForm from "@/app/components/CourseForm";
import { Course } from "@/app/types/course"; // Import Course type

const AdminCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]); // Typed state for courses
  const [editingCourse, setEditingCourse] = useState<Course | null>(null); // Typed state for editing a course
  const [loading, setLoading] = useState<boolean>(true); // Loading state to handle initial fetch
  const [error, setError] = useState<string | null>(null); // Error state to handle error messages

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Reset error state
        const data = await getCourses();
        setCourses(data); // Set courses state
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };
    fetchCourses();
  }, []);

  // Save or update course
  const handleSaveCourse = async (courseData: { title: string; description: string; duration: string; instructor: string }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle the case where the token is missing
      console.error('Authentication token is missing');
      setError('Authentication token is missing');
      return;
    }

    try {
      setLoading(true); // Start loading

      if (editingCourse) {
        // Update existing course logic
        await updateCourse(editingCourse._id, courseData, token);
      } else {
        // Add new course logic
        await addCourse(courseData, token);
      }

      // After saving, refetch the course list
      const updatedCourses = await getCourses();
      setCourses(updatedCourses);
      setEditingCourse(null); // Reset editing state after saving
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error saving course:', error);
      setError('Failed to save the course. Please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Delete course
  const handleDeleteCourse = async (id: string) => {
    // Ensure that we only try to access localStorage on the client side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token); // Log the token for debugging
  
      // Check if token exists
      if (!token) {
        console.error("Authentication token is missing");
        setError("Authentication token is missing");
        return;
      }
  
      try {
        setLoading(true); // Start loading
  
        // Call deleteCourse with both id and token
        await deleteCourse(id, token); // Now token is guaranteed to be a string
  
        // After deleting, refetch the course list
        const updatedCourses = await getCourses();
        setCourses(updatedCourses);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error deleting course:", error);
        setError("Failed to delete the course. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  if (loading) {
    return <div>Loading courses...</div>; // Show a loading state while fetching courses
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Manage Courses</h1>

      {/* Show error message if there's any */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Course form for adding/updating courses */}
      <CourseForm 
        course={editingCourse} // Pass the course to the form (will be null for new course)
        onSave={handleSaveCourse} 
      />

      <div className="mt-8">
        {/* List of all courses */}
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="border p-4 rounded-md mb-4">
              <h2 className="text-xl font-bold">{course.title}</h2>
              <p>{course.description}</p>
              <div className="mt-4">
                <button
                  onClick={() => setEditingCourse(course)} // Set editingCourse when "Edit" is clicked
                  className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCourse(course._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminCourses;
