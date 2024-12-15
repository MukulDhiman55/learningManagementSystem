import { Course } from "../types/course";

interface LoginResponse {
  success: boolean;
  token: string;
  role: string;
}

// Helper function to handle GET requests with proper typing
const fetchAPI = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }

  return response.json(); // Return parsed JSON response
};

// Fetch all courses (GET request)
// Fetch all courses (GET request)
export const getCourses = async (): Promise<Course[]> => {
  try {
    // Update the URL to point to the correct backend server
    const response = await fetch("http://localhost:5000/api/courses");

    // Check if the response is successful (status code 200)
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Parse the response as JSON
    const courses: Course[] = await response.json();
    return courses;
  } catch (error: unknown) {
    // Handle errors gracefully
    if (error instanceof Error) {
      throw new Error(`Error fetching courses: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching courses.");
  }
};


// Fetch course details by ID (GET request)
export const getCourseDetails = async (id: string): Promise<Course> => {
  try {
    const course = await fetchAPI<Course>(`/api/courses/${id}`); // Fetch details for a specific course
    return course;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching course details: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching course details.");
  }
};

// Enroll in a course (POST request)
export const enrollCourse = async (id: string, token: string): Promise<{ message: string }> => {
  try {
    const response = await fetch(`/api/courses/enroll/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Enrollment failed.");
    }

    return response.json(); // Return success message or course data
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error enrolling in course: ${error.message}`);
    }
    throw new Error("An unknown error occurred while enrolling in the course.");
  }
};

// Add a new course (Admin only, POST request)
export const addCourse = async (
  courseData: { title: string; description: string; duration: string; instructor: string },
  token: string
): Promise<Course> => {
  try {
    const response = await fetch("http://localhost:5000/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(courseData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error creating course.");
    }

    return response.json(); // Return created course data
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error adding course: ${error.message}`);
    }
    throw new Error("An unknown error occurred while adding the course.");
  }
};

// Update an existing course (Admin only, PUT request)
export const updateCourse = async (
  id: string,
  courseData: { title: string; description: string; duration: string; instructor: string },
  token: string
): Promise<Course> => {
  try {
    const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(courseData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error updating course.");
    }

    return response.json(); // Return updated course data
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error updating course: ${error.message}`);
    }
    throw new Error("An unknown error occurred while updating the course.");
  }
};

// Delete a course (Admin only, DELETE request)
export const deleteCourse = async (id: string, token: string): Promise<{ message: string }> => {
  try {
    const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // Ensure the token is in the 'Bearer <token>' format
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error deleting course.');
    }

    return response.json(); // Return success message
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error deleting course: ${error.message}`);
    }
    throw new Error('An unknown error occurred while deleting the course.');
  }
};



// Login function
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed.");
    }

    const data = await response.json();
    return {
      success: true,
      token: data.token,
      role: data.role,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error during login: ${error.message}`);
    }
    throw new Error("An unknown error occurred while logging in.");
  }
};

// Register function
export const registerUser = async (username: string, email: string, password: string): Promise<{ message: string }> => {
  const data = { username, email, password };

  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Error response:", error);
      throw new Error(error.message || "Something went wrong during registration.");
    }

    const result = await response.json();
    return result; // Return success response
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during registration:", error.message);
      throw new Error(`Error during registration: ${error.message}`);
    }
    console.error("Unknown error occurred:", error);
    throw new Error("An unknown error occurred during registration.");
  }
};