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
  employeeList: IEmployee;
  idEmployee;

  action = {
    buttonText: 'Crear Empleado',
    event: 'Registrar'
  };

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService
  ) {
  }

  ngOnInit() {
    this.buildForm();
    this.getEmployees();
  }

  buildForm() {
    this.employeeForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  get employee() {
    return this.employeeForm.controls;
  }

  actionEmployee(action) {
    const isEdit = action.event === 'Editar' ? true : false;
    if (isEdit) {
      this.crudService.updateEmployee(this.idEmployee, this.employeeForm.value);
      this.actionMessage();
    } else {
      this.createEmployee();
    }
  }

  getEmployees() {
    this.crudService.getEmployees().subscribe((response: any = []) => {
      this.employeeList = response.map(item => {
        return {
          id: item.payload.doc.id,
          nombre: item.payload.doc.data().nombre,
          edad: item.payload.doc.data().edad,
          direccion: item.payload.doc.data().direccion
        };
      });
    });
  }

  createEmployee() {
    const employee: IEmployee = this.employeeForm.value;
    this.crudService.createEmployee(employee).then(res => {
      this.actionMessage();
      this.getEmployees();
    }).catch(err => console.error(err));
  }

  editEmployee(item) {
    this.action = {
      buttonText: 'Guardar',
      event: 'Editar'
    };
    this.idEmployee = item.id;
    this.employeeForm.patchValue({
      nombre: item.nombre,
      edad: item.edad,
      direccion: item.direccion
    });
  }

  deleteEmployee(item) {

  }

  actionMessage() {
    this.message = 'Se guardó correctamente';
    this.resetForm();
    setTimeout(() => {
      this.message = '';
    }, 2000);
  }

  resetForm() {
    this.employeeForm.reset();
    this.action = {
      buttonText: 'Crear Empleado',
      event: 'Registrar'
    };
  }


}
