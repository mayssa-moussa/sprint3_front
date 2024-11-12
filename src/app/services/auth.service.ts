import { Injectable } from '@angular/core';
import { User } from '../model/User.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { apiURL, apiURL2 } from '../config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  token!: string;
  private helper = new JwtHelperService();
  public regitredUser: User = new User();

  constructor(private router: Router, private http: HttpClient) { }

  login(user: User) {
    return this.http.post<User>(apiURL2 + '/login', user, { observe: 'response' });//pour appeler l'api login
  }
  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }
  decodeJWT() {
    if (this.token == undefined)
      return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }
  getToken(): string {
    return this.token;
  }
  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }
  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }
  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  /* SignIn(user: User): Boolean {
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      if (user.username == curUser.username && user.password == curUser.password) {
        validUser = true;
        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });
    return validUser;
  } */
  isAdmin(): Boolean {
    if (!this.roles)
      return false;
    return this.roles.indexOf('ADMIN') >= 0;
  }
  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    //this.getUserRoles(login);
  }
  registerUser(user: User) {
    return this.http.post<User>(apiURL2 + '/register', user,
      { observe: 'response' });
  }
  setRegistredUser(user: User) {
    this.regitredUser = user;
  }
  getRegistredUser() {
    return this.regitredUser;
  }
  validateEmail(code: string) {
    return this.http.get<User>(apiURL2 + '/verifyEmail/' + code);
  }
}
