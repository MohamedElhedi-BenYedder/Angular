import { Patient } from '../../models/patient.model';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {ReceptionistService} from '../../receptionist/receptionist.service';

@Component({
  selector: 'app-doctor-view-patient',
  templateUrl: './doctor-view-patient.component.html',
  styleUrls: ['./doctor-view-patient.component.css']
})
export class DoctorViewPatientComponent implements OnInit {

  constructor(public receptionistService: ReceptionistService,private snackBar: MatSnackBar) { }

  displayedColumns: string[] = ['patientRegistrationNumber', 'patientFirstName', 'patientLastName', 'patientGender', 'patientAddress', 'patientCity', 'patientDistrict', 'patientNIC', 'patientDOB', 'patientmaritalStatus', 'patientContact', 'patientemail', 'guardianName', 'guardianGender', 'guardianNIC', 'guardianContact'];
  dataSource = null;
  private patientsSub: Subscription;
  apps = [{}, {}];
  showTable = true;
  showForm = false;
  private newPatients: Patient[] = [];

  clickedPatientOnlineAppointments = [];
  clickedPatientNormalAppointments = [];
  clickedPatient;

  ngOnInit() {
    this.dataSource = this.receptionistService.getAllPatients();
  }

  searchPatient(keyupevent: KeyboardEvent) {
    let keyWord = String((keyupevent.target as HTMLInputElement).value);
    this.dataSource = this.receptionistService.searchPatients(keyWord);

  }
  viewPatient(patient: any) {
    this.clickedPatient = patient;

    if (this.clickedPatient.guardian.guardianType == 'Self') {
      this.clickedPatient.guardian.firstName = 'N/A';
      this.clickedPatient.guardian.lastName = 'N/A';
      this.clickedPatient.guardian.NIC = 'N/A';
      this.clickedPatient.guardian.gender = 'N/A';
      this.clickedPatient.guardian.contactNumber = 'N/A';
    }
    this.showForm = true;
    this.showTable = false;
    this.clickedPatientNormalAppointments = [];
    this.clickedPatientOnlineAppointments = [];
    this.receptionistService.getPreviousAppointments_ViewPatient(patient.patientRegistrationNumber).subscribe(response => {
      response.normal_appointments.map(normalApp => {
        normalApp.appointmentDate = new Date(normalApp.appointmentDate).toDateString();
        normalApp.disease = (normalApp.disease == null) ? 'N/A' : normalApp.disease;
        normalApp.symptoms = (normalApp.symptoms == null) ? 'N/A' : normalApp.symptoms;
        normalApp.prescription = (normalApp.prescription == null) ? 'N/A' : normalApp.prescription;
        this.clickedPatientNormalAppointments.push(normalApp);
      });
      response.online_appointments.map(onlineApp => {
        onlineApp.appointmentDate = new Date(onlineApp.appointmentDate).toDateString();
        onlineApp.disease = (onlineApp.disease == null) ? 'N/A' : onlineApp.disease;
        onlineApp.symptoms = (onlineApp.symptoms == null) ? 'N/A' : onlineApp.symptoms;
        onlineApp.prescription = (onlineApp.prescription == null) ? 'N/A' : onlineApp.prescription;
        this.clickedPatientOnlineAppointments.push(onlineApp);
      });
      console.log(this.clickedPatientNormalAppointments);
      console.log(this.clickedPatientOnlineAppointments);
    });
  }

  back() {
    this.showForm = false;
    this.showTable = true;
  }
}
