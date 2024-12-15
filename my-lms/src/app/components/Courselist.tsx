"use client";  // Ensure the component is client-side

import React, { useEffect, useState } from "react";
import { Course } from "../types/course";
import Link from "next/link";
import { getCourses } from "../services/api";   // Assuming you have a function to fetch courses

interface CourseListProps {
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
}

const CourseList: React.FC<CourseListProps> = ({ onEdit, onDelete }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getCourses();
      setCourses(data);
      setLoading(false);
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        courses.map((course) => (
          <div
            key={course._id}
            className="flex justify-between items-center p-4 border rounded-lg shadow-sm"
          >
            <div>
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p>{course.description}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => onEdit(course)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(course._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
              <Link
                href={`/courses/${course._id}`}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                View Details
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseList;