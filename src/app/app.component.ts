import { Component, OnInit } from '@angular/core';
import { CrudService } from './service/crud.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEmployee } from './models/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  employeeForm: FormGroup;
  title = 'crud-firebase';
  message;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService
  ) {
  }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  get employee() {
    return this.employeeForm.controls;
  }

  createEmployee() {
    const employee: IEmployee = this.employeeForm.value;
    this.crudService.createEmployee(employee).then(res => {
      console.log(res);
      this.message = 'Se guardó correctamente';
    }).catch(err => console.error(err));
    this.employeeForm.reset();
  }


}
