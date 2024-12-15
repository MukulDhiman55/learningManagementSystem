export interface Course {
    _id: string;            // Unique identifier for the course
    title: string;          // The title of the course
    description: string;    // A brief description of the course
    createdAt: string;      // The date the course was created (can be a string in ISO format)
    updatedAt: string; 
    duration: string;       // Duration of the course (new field)
    instructor: string;      // The date the course was last updated (also ISO format)
  }