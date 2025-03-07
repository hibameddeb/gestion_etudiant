import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../student.service';
import { RouterLink, RouterModule } from '@angular/router';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  currentStudent: Student = {
    id: 0,  // id as a number, set to 0 by default
    name: '',
    age: 0,
    major: ''
  };
  isEditMode = false;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  // Use the getStudents() method to fetch all students
  getStudents(): void {
    this.studentService.getStudents().subscribe(
      (students) => {
        this.students = students;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  resetForm(): void {
    this.currentStudent = {
      id: 0,  // Reset id to 0 for new student
      name: '',
      age: 0,
      major: ''
    };
    this.isEditMode = false;
  }

  createStudent(): void {
    const newStudent: Student = {
      ...this.currentStudent,
      id: Math.floor(Math.random() * 1000)  // Generate a random id as a number
    };
    
    this.studentService.createStudent(newStudent).subscribe(
      (createdStudent) => {
        this.students.push(createdStudent);
        this.resetForm();
      },
      (error) => {
        console.error('Error creating student:', error);
      }
    );
  }

  editStudent(student: Student): void {
    this.currentStudent = { ...student };
    this.isEditMode = true;
  }

  updateStudent(): void {
    this.studentService.updateStudent(this.currentStudent.id, this.currentStudent).subscribe(
      (updatedStudent) => {
        const index = this.students.findIndex(s => s.id === updatedStudent.id);
        if (index !== -1) {
          this.students[index] = updatedStudent;
        }
        this.resetForm();
      },
      (error) => {
        console.error('Error updating student:', error);
      }
    );
  }

  deleteStudent(id: number): void {  // id is now a number
    this.studentService.deleteStudent(id).subscribe(
      () => {
        this.students = this.students.filter(student => student.id !== id);
      },
      (error) => {
        console.error('Error deleting student:', error);
      }
    );
  }

  saveStudent(): void {
    if (this.isEditMode) {
      this.updateStudent();
    } else {
      this.createStudent();
    }
  }
}
