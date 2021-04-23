export interface Patient{
  patientRegistrationNumber:  string;
  name:{
  firstName:string;
  lastName:string;
  },
  gender:string;
  dob:any;
  address:string;
  city:string;
  district:string;
  nic:string;
  maritalStatus:string;
  contactNumber:number;
  email:string;
  guardian:{
    guardianType:string;
    firstName:string;
    lastName:string;
    gender:string;
    NIC:string;
    contactNumber: number;
  }
}
