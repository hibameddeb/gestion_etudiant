import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8000/students'; // URL correcte

  constructor(private http: HttpClient) { }

  // New method to get all students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl); 
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  createStudent(student: Student): Observable<Student> {
    console.log('Sending student:', student); // 🔍 Vérifier les données envoyées
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<Student> {
    return this.http.delete<Student>(`${this.apiUrl}/${id}`);
  }
}
