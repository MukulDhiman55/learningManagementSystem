# Learning Management System (LMS)

## Overview

This project is a **Learning Management System (LMS)** built using the following technologies:

- **Frontend**: 
  - **Next.js**
  - **TypeScript**
  - **Tailwind CSS**
  
- **Backend**: 
  - **Node.js**
  - **Express.js**
  - **MongoDB Atlas**

The application has two primary views: **Admin** and **User**. Admin users can manage courses, while regular users can browse and enroll in courses.

## Features

### Admin View:
- **Add New Courses**: Admins can add new courses to the system with details like course title, description, instructor, and duration.
- **Update Existing Courses**: Admins can update the details of existing courses.
- **Delete Courses**: Admins can delete courses that are no longer required.
- **View All Courses**: Admins can view a list of all available courses in the system.

### User View:
- **Browse Available Courses**: Users can browse the available courses and filter them by title, instructor, or duration.
- **View Course Details**: Users can view detailed information about each course, including the description, duration, and instructor.
- **Enroll in a Course**: Users can enroll in a course and start learning.

## Technologies Used

### Frontend
- **Next.js**: Framework for server-side rendering and routing.
- **TypeScript**: Typed superset of JavaScript for better code quality and development experience.
- **Tailwind CSS**: Utility-first CSS framework for fast UI development.

### Backend
- **Node.js**: JavaScript runtime for building the backend server.
- **Express.js**: Web framework for Node.js to handle HTTP requests and routes.
- **MongoDB Atlas**: Cloud-hosted MongoDB database to store course data, user information, and enrollments.

### Authentication
- **JWT (JSON Web Token)**: Used for user authentication and authorization in the backend.

### Installation Guide 
Follow the steps below to get this project up and running locally.
### 1. Setup backend
The backend of this project is built with Node.js and Express.js. It uses MongoDB Atlas for the database. Follow the steps to set up the backend.
 a. Navigate to the backend directory

cd learning-management-system/backend

b. Install backend dependencies
Use npm to install the necessary dependencies:

npm install

c. Set up environment variables
Create a .env file in the backend directory. You can do this by creating a new file named .env and adding the following content:


MONGO_URI=mongodb+srv://<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=5000

**d. Add Admin user with createAdmin.js file**
add your admin details. then run the file by
node createAdmin.js

**e. Add Courses initially with seedCourses.js file by running**

node seedCourses.js

**f. Start the backend server**

To run the backend, use the following command:

node server.js
### 1. Setup the frontend named with my-lms

The frontend of this project is built with Next.js, TypeScript, and Tailwind CSS. Follow these steps to set up the frontend.

**a. Navigate to the frontend directory**
cd ../my-lms

**b. Install frontend dependencies**
Run the following command to install the necessary dependencies:

npm install

**d. Start the frontend server**
To run the frontend, use the following command:

npm run dev

**3. Testing the applicatio**n
Once both the frontend and backend are running:

Visit the frontend in your browser by navigating to http://localhost:3000 and the backend on http://localhost:5000.
You can now test both Admin and User views:

**Admin can log in, add/update/delete courses, and view all courses**

**User can browse and enroll in available courses.**


**###Admin Routes**
Add a New Course
Endpoint: POST /api/courses
Request Body:
json
{
  "title": "Course Title",
  "description": "Course Description",
  "duration": "Course Duration",
  "instructor": "Instructor Name"
}

Update a Course
Endpoint: PUT /api/courses/:id
Request Body:
json
{
  "title": "Updated Course Title",
  "description": "Updated Description",
  "duration": "Updated Duration",
  "instructor": "Updated Instructor Name"
}

Delete a Course
Endpoint: DELETE /api/courses/:id
Get All Courses
Endpoint: GET /api/courses

**User Routes**
Get Available Courses
Endpoint: GET /api/courses

Get Course Details
Endpoint: GET /api/courses/:id

Enroll in a Course
Endpoint: POST /api/courses/:id/enroll


## Contributing

Contributions are welcome! To contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with descriptive messages.
4. Push your changes to your forked repository.
5. Open a pull request.

Please ensure that your code adheres to the style guide and passes tests.



## Acknowledgements

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for hosting the database.
- [Tailwind CSS](https://tailwindcss.com/) for styling the frontend.
- [Next.js](https://nextjs.org/) for building the frontend framework.
- [Express.js](https://expressjs.com/) for the backend framework.
- [MongoDB Node.js Driver](https://www.npmjs.com/package/mongodb) for database integration.

