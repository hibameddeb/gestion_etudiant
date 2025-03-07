# Student Management System

This project is a **Student Management System** that allows users to **add, update, and delete student information**. It is built using **FastAPI** for the backend (API server) and **Angular** for the frontend (web interface). This system provides basic **CRUD (Create, Read, Update, Delete)** operations for managing student data.

## Features

- **Add Student**: Allows you to add new student records.
- **Update Student**: Allows you to update existing student records.
- **Delete Student**: Allows you to delete a student’s record.
- **View Students**: Displays a list of all students in the system.

## Tech Stack

### Backend (API)
- **FastAPI**: Python web framework for building the API (RESTful).

### Frontend
- **Angular**: Frontend framework for building the user interface.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- **Python** (v3.7 or later)
- **Node.js** (v14 or later)
- **npm** (v6 or later)
- **Git** (optional, for version control)

---

## Setup Instructions

Create and activate a virtual environment:

On Windows:

python -m venv venv
venv\Scripts\activate


Start the FastAPI server:

uvicorn app.main:app --reload


