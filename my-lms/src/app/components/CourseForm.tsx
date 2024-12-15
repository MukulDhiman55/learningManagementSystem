import { useState, useEffect } from "react";
import { Course } from "@/app/types/course";

interface CourseFormProps {
  course: Course | null; // The course to edit, null for a new course
  onSave: (courseData: { title: string; description: string; duration: string; instructor: string }) => void;
}

const CourseForm = ({ course, onSave }: CourseFormProps) => {
  const [title, setTitle] = useState<string>(course?.title || "");
  const [description, setDescription] = useState<string>(course?.description || "");
  const [duration, setDuration] = useState<string>(course?.duration || "");
  const [instructor, setInstructor] = useState<string>(course?.instructor || "");

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setDescription(course.description);
      setDuration(course.duration);
      setInstructor(course.instructor);
    }
  }, [course]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description, duration, instructor });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="border p-2 w-full"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
        className="border p-2 w-full"
      />
      <input
        type="text"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration"
        required
        className="border p-2 w-full"
      />
      <input
        type="text"
        value={instructor}
        onChange={(e) => setInstructor(e.target.value)}
        placeholder="Instructor"
        required
        className="border p-2 w-full"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Save Course
      </button>
    </form>
  );
};

export default CourseForm;
