import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hospital-Management-System';
  constructor(private router: Router) {}
  ngOnInit() {

  }
  login() { this.router.navigate(['/login']);
    console.log('login');

  }
  appointment() { this.router.navigate(['/appointment']);
    console.log('appointment');

  }
}
