import { Component } from '@angular/core';
import { Student } from '../student';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../student.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {

  students: Student[] = [];
  formGroupStudent: FormGroup;
  isEditing: boolean = false;


  ngOnInit(): void {
    this.loadStudents();
  }
  loadStudents() {
    this.service.getStudents().subscribe({
      next: data => this.students = data
    });
  }


  constructor(private formBuilder: FormBuilder,
    private service: StudentService
  ) {
    this.formGroupStudent = formBuilder.group({
      id: [''],
      name: [''],
      course: ['']
    });

  }

  save() {
    if (this.isEditing) {
      this.service.update(this.formGroupStudent.value).subscribe({
        next: () => {
          this.loadStudents();
          this.isEditing = false; 
        }
      });
    }
    else {
      this.service.save(this.formGroupStudent.value).subscribe({
        next: data => this.students.push(data)
        
      });
    }
    this.formGroupStudent.reset();
  }

  delete(student: Student) {
    this.service.delete(student).subscribe({
      next: data => this.loadStudents()
    });
  }
  edit(student: Student) {
    this.formGroupStudent.setValue(student);
    this.isEditing = true;
  }
}