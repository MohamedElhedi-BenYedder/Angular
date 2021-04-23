import { MatSnackBar } from '@angular/material';
import { Admission } from '../../models/admission.model';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ReceptionistService } from '../receptionist.service';

@Component({
  selector: 'app-receptionist-admit-patient',
  templateUrl: './receptionist-admit-patient.component.html',
  styleUrls: ['./receptionist-admit-patient.component.css']
})
export class ReceptionistAdmitPatientComponent implements OnInit {
  rooms = [];
  vacantRooms = [];
  admissionNum: any = null;
  public currentAdmissions = [];
// Start - Search Admission()
  public searchedAdmission = {};
  admissionNum_Discharge;
  roomNumber_Discharge;
// End - Search Admission()
  name: string;
  admissionHistory = [];
  searchedDate_admissionHistory;
  showTable = false;
  constructor(public receptionistService: ReceptionistService, private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.getRoomAvailability();
    this.getVacantRooms();
    this.getNewAdmissionNumber();
  }
}
