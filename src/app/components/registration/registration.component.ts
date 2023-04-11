import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import notify from 'devextreme/ui/notify';
import { Student } from '../student';
import DataSource from 'devextreme/data/data_source';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  // declare property
  registerForm!: FormGroup;
  student!: Student;
  students: Student[] = [];
  passwordMode!: string;
  isPopupVisible!: boolean;
  isDatagridVisible!: boolean;
  namePattern: any = /^[^0-9]+$/;
  lastNamePattern: any = /^[^0-9]+$/;
  mobilePattern: any = /^(([+])355)?(([1-6][0-9]))(\d{7})$/;

  constructor(private formbuilder: FormBuilder) {}
  ngOnInit(): void {
    this.createRegisterForm();
    this.isPopupVisible = false;
    this.isDatagridVisible = false;
    this.student = new Student('', '', '', '', 0, '');
  }
  createRegisterForm() {
    this.registerForm = this.formbuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      mobile: [null, Validators.required],
      course: ['', Validators.required],
    });
  }

  // submit the form and send the data to a pop up
  userRegister(e: any) {
    
    this.isPopupVisible = true;
    this.student = new Student(
      this.registerForm.value.name,
      this.registerForm.value.lastname,
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.mobile,
      this.registerForm.value.course
    );
  }

  // send the data from pop up to data grid
  register(e: any) {
    console.log('ne gride ', this.student);
    this.isPopupVisible = false;
    this.students.push(this.student);
    this.isDatagridVisible = true;

    console.log(this.students);
  }
}
