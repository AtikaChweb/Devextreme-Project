import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import notify from 'devextreme/ui/notify';
import { Student } from '../student';
import DataSource from 'devextreme/data/data_source';
import { Component, OnInit } from '@angular/core';

import { exportDataGrid, exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
// import { exportDataGrid } from 'devextreme/pdf_exporter';
// import { Workbook } from 'exceljs';
// import { saveAs } from 'file-saver';

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

  expanded: Boolean = true;
  passwordButton !: { icon: string; type: string; onClick: () => void; };

  constructor(private formbuilder: FormBuilder) {}
  ngOnInit(): void {

    this.passwordMode = 'password';
    this.passwordButton = {
      icon: './assets/images/eye.jpg',
      type: 'default',
      onClick: () => {
        this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
      },
    };
    
    
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
    
    // this.isPopupVisible = true;
    this.student = new Student(
      this.registerForm.value.name,
      this.registerForm.value.lastname,
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.mobile,
      this.registerForm.value.course

    );

    console.log(this.student)
  }

  // send the data from pop up to data grid
  // register(e: any) {
  //   console.log('ne gride ', this.student);
  //   this.isPopupVisible = false;
  //   // this.students.push(this.student);
  //   // this.isDatagridVisible = true;

  //   console.log(this.students);
  // }
  
  
  details(){
    this.isPopupVisible = true;
    this.students.push(this.student);
    this.isDatagridVisible = true;
  }
  
  onExporting(e:any) {
    const doc = new jsPDF();
    exportDataGrid({
      jsPDFDocument: doc,
      component: e.component,
      indent: 5,
    }).then(() => {
      doc.save('Students.pdf');
    });
  }
  // onExporting(e:any) {
  //   const workbook = new Workbook();    
  //       const worksheet = workbook.addWorksheet('Main sheet');
  //       exportDataGrid({
  //           component: e.component,
  //           worksheet: worksheet
  //       }).then(function() {
  //           workbook.xlsx.writeBuffer()
  //               .then(function(buffer: BlobPart) {
  //                   saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
  //               });
  //       });
  //       e.cancel = true; 
  //   }
    
}


