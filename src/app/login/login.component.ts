import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { UtilityService } from './../utility.service';

import { Message } from 'primeng/primeng'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService,UtilityService]
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
  private msgs: Message[] = [];
  successMessage: String = '';

  constructor(
    private _authService: AuthService,
    private utility: UtilityService,
    private router: Router
  ) { }

  ngOnInit() {
      this.utility.isLogged().then((result: boolean) => {
          if(result){
            this.router.navigate(['videos']);
          }
      });
  }

  onLoginSubmit(e){
      e.preventDefault();
      const user = {
        email: this.email,
        password: this.password
      }
      this._authService.authenticateUser(user)
      .subscribe(data => { 
        if(data == 'success'){
          if(typeof (Storage) !== 'undefined') {
            sessionStorage.setItem('User',  JSON.stringify(user.email))
          }
          this.router.navigate(['videos']);
        }
        else{
          this.successMessage = "Adresse ou mot de passe invalide";
          console.log('log '+this.successMessage);
          this.router.navigate(['login']);
        }
      });
  }

}
