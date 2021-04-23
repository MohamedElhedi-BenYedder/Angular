export class User {
  username: string;
  role: string;
  registrationNumber: number;
  password: string;
  constructor(username: string, role: string, password: string, registrationNumber : number) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.registrationNumber = registrationNumber ;
  }
}
