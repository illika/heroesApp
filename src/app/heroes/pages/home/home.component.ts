import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/interfaces/usuario.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
    .container {
      margin: 10px;
    }
    `
  ]
})
export class HomeComponent {

  constructor(private router: Router, private authService: AuthService) { }

  get usuario() {
    return this.authService.user;
  };

  logout() {
    this.router.navigate(["/auth"]);
  }

}
