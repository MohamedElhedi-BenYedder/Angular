export interface ManualAppointment {
  appointmentNumber: number;
  doctorRegistrationNumber: number;
  patientRegistrationNumber: number;
  timeSlot:{day: string,
    startTime: string,
    endTime: string
  };
  appointmentDate: any;
  dateCreated: string;

}
