import { Course } from "../types/course";

interface CourseCardProps {
  course: Course;
  onClick: () => void; // Handler to trigger when the card is clicked
  className?: string;
}

const CourseCard = ({ course, onClick }: CourseCardProps) => {
  return (
    <div
      className="border p-4 rounded-md cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-xl font-semibold">{course.title}</h3>
      <p>{course.description}</p>
    </div>
  );
};

export default CourseCard;
