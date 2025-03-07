import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Add this import
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './src/app/app.component';
import { StudentsComponent } from './src/app/students/students.component';
import { AppRoutingModule } from './src/app/app.routes';
import { ActivatedRoute } from '@angular/router';


@NgModule({
  declarations: [
     // Declare component here, not in imports
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule // Add FormsModule to imports
  ],
  providers: [],
  
})
export class AppModule { 
    constructor(private route: ActivatedRoute) {}
}