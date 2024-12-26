# Course Zilla - MERN Project with Cloudinary

This is a MERN stack (MongoDB, Express, React, Node.js) project that allows users to upload and watch courses. It utilizes Cloudinary for file uploads (such as videos, images, etc.) and includes authentication for secure access to course content.

## Features
- **User Authentication**: Register, login, and manage user sessions.
- **Course Upload**: Users can upload course videos, images, and other files to Cloudinary.
- **Course Watching**: Users can browse and watch available courses.
- **Microservices**: The application is built with microservices for handling user and post operations.
- **Cloudinary Integration**: Secure and efficient file uploads for course media.

## Tech Stack
- **Frontend**: React, Redux, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Hosting**: Cloudinary
- **State Management**: Redux
- **Routing**: React Router

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas account)
- Cloudinary account (for file uploads)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/course-upload-watch.git
   cd course-zilla/backend
