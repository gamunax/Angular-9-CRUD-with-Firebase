import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IEmployee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private collectionName = 'Employee';
  constructor(private fireServices: AngularFirestore) { }

  createEmployee(employee: IEmployee) {
    return this.fireServices.collection(this.collectionName).add(employee);
  }

  getEmployees() {
    return this.fireServices.collection(this.collectionName).snapshotChanges();
  }

  updateEmployee(id, employee) {
    return this.fireServices.doc(`Employee/${id}`).update(employee);
  }
}
