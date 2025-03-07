from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Create FastAPI app
app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Adjust if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define Student model using Pydantic
class Student(BaseModel):
    id: int
    name: str
    age: int
    major: str

# Sample database (in-memory list of students)
students_db = [
    Student(id=1, name="Alice", age=20, major="Computer Science"),
    Student(id=2, name="Bob", age=22, major="Mathematics"),
    Student(id=3, name="Charlie", age=21, major="Physics")
]

@app.get("/")
def root():
    return {"message": "Welcome to the Student API!"}

@app.get("/favicon.ico")
def favicon():
    return {}

@app.get("/students", response_model=List[Student])
def get_students():
    """Fetch all students."""
    return students_db

@app.get("/students/{student_id}", response_model=Student)
def get_student(student_id: int):
    """Fetch a student by ID."""
    student = next((s for s in students_db if s.id == student_id), None)
    if student is None:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@app.post("/students", response_model=Student)
def create_student(student: Student):
    """Add a new student."""
    if any(s.id == student.id for s in students_db):
        raise HTTPException(status_code=400, detail="Student ID already exists")
    students_db.append(student)
    return student

@app.put("/students/{student_id}", response_model=Student)
def update_student(student_id: int, updated_student: Student):
    """Update an existing student's details."""
    index = next((i for i, s in enumerate(students_db) if s.id == student_id), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Student not found")
    
    students_db[index].name = updated_student.name
    students_db[index].age = updated_student.age
    students_db[index].major = updated_student.major
    return students_db[index]

@app.delete("/students/{student_id}", response_model=Student)
def delete_student(student_id: int):
    """Delete a student by ID."""
    index = next((i for i, s in enumerate(students_db) if s.id == student_id), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Student not found")
    return students_db.pop(index)
