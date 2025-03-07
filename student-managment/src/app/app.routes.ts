import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
export const routes: Routes = [
    { path: 'students', component: StudentsComponent },
    { path: '', redirectTo: 'students', pathMatch: 'full' } ,
    { path: 'students/new', component: StudentsComponent },
    { path: 'students/:id', component: StudentsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }