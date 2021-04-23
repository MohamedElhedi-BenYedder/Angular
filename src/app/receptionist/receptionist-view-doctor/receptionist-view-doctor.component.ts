import { MatSnackBar } from '@angular/material';
import { Doctor } from '../../models/doctor.model';
import { Component, OnInit } from '@angular/core';
import { ReceptionistService } from '../receptionist.service';
import { TimeSlot } from 'src/app/models/timeslot.model';

@Component({
  selector: 'app-receptionist-view-doctor',
  templateUrl: './receptionist-view-doctor.component.html',
  styleUrls: ['./receptionist-view-doctor.component.css']
})
export class ReceptionistViewDoctorComponent implements OnInit {
  constructor(public receptionistService: ReceptionistService, private snackBar: MatSnackBar) { }
  showFirst = false;
  showForm = false;
  public doctor;
  public doctorAvailability = [];


  timeSlots: TimeSlot[] = [];
  day;
  startTime;
  endTime;
  toggle = true;

  ngOnInit() {}
  searchDoctor(keyWord: string ) {
    this.showForm = false;
    if (keyWord ) {
      this.receptionistService.getDoctorByRegNumber(keyWord).subscribe(result => {
        if (result) {
          this.showForm = true;
          console.log(result);
          this.doctor = new Doctor(result);
          console.log(this.doctor);
        }
      });
    } else {

    }
  }
}
