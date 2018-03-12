import { Users } from './../users';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
	user: Users;
	lastname:string;
	firstname:string;
	email:string;
	password:string;
	errorMessage: String = '';
	successMessage: String = '';

	users: Array<Users>;

	constructor(
		private _authService: AuthService,
		private router: Router
	) { }

	ngOnInit() {
  	}

	public createUser() {
		const newUser = {
	  		lastname: this.lastname,
	  		firstname: this.firstname,
	  		email: this.email,
	  		password: this.password
		}
		this._authService.insertUser(newUser)
		.subscribe(resUserData => { 
			if(resUserData == 'email_existant'){
				this.errorMessage = "Adresse e-mail existant";
			}
			else if( resUserData == 'error_invalide' ){
				this.errorMessage = "Champ Obligatoire";
			}
			else{
				this.successMessage = "Utilisateur créer";
				this.users.push(resUserData); 
			}
		});
	}
}
