import { VideoCenterComponent } from './video-center/video-center.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{path: '', redirectTo:'/home', pathMatch:'full'},
	{path: 'login', component: LoginComponent},
	{path: 'home', component: HomeComponent},
	{path: 'videos', component: VideoCenterComponent},
	{path: 'register', component: RegisterComponent},
	{path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
