import { TimeSlot } from './timeslot.model';

export class Doctor {
  doctorRegistrationNumber:number;
  name: {
    firstName: string;
    lastName: string;
  };
  gender: string;
  dob: any;
  address: string;
  city: string;
  district: string;
  nic: string;
  maritalStatus: string;
  contactNumber: number;
  email: string;
  doctorType: string;
  SLMCRegNo: number;
  primaryQualification: {
    degree: string;
    year: number;
    university: string;
    country: string;
  };
  postGradQualification: {
    degree: string;
    specialization: string;
    year: number;
    university: string;
    country: string;
  };
  doctorAvailability: TimeSlot[];
  constructor(result) {
    this.doctorRegistrationNumber = result.doctorRegistrationNumber;
    this.name = result.name;
    this.gender = result.gender;
    this.dob = result.dob;
    this.address = result.address;
    this.city  = result.city;
    this.district = result.district;
    this.nic = result.nic;
    this.maritalStatus = result.maritalStatus;
    this.contactNumber = result.contactNumber;
    this.email = result.email;
    this.doctorType = result.doctorType;
    this.SLMCRegNo = result.SLMCRegNo;
    this.postGradQualification = result.postGradQualification;
    this.primaryQualification = result.primaryQualification;
    this.doctorAvailability = null;
  }

}
