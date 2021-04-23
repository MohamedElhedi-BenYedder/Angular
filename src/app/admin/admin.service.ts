import { Patient } from '../models/patient.model';
import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService} from '../app.service';
// import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AdminService {

  constructor(private http: HttpClient, private router: Router , private appService: AppService) {}

  patients: Patient[];
  private patientUpdated = new Subject<Patient[]>();

  signupUser(user: User) {
    return this.http.post('http://localhost:3000/api/user/signup', user);

  }
  getDoctorByRegNumber(regNo: number) {
    return this.appService.getDoctorByRegNumber(regNo) ;
  }

  registerEmployee(employee: any) {
    const load = {
      employee
    };

    return this.http.post('http://localhost:3000/api/employee/createEmployee', employee);

  }

  getNewEmployeeRegNo() {
    return this.http.get<{NewEmployeeRegistrationNumber: number}>('http://localhost:3000/api/employee/generateRegistrationNumber');
  }

  getAllUsers() {
    return this.http.get('http://localhost:3000/api/user/getAll');
  }

  getRoomAvailability() {
    return this.http.get<{rooms: any}>('http://localhost:3000/api/rooms');
  }

  getNewRoomNumber() {
    return this.http.get('http://localhost:3000/api/room/getNewNumber');

  }

  addRoom(room: any) {

    return this.http.post('http://localhost:3000/api/room/create', room);

  }
}
