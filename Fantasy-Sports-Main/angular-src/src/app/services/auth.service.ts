
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  league: any;
  

  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:1000/users/register', user, {headers: headers})
    .pipe(map(res => res.json()));
  }

  createLeague(league){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:1000/leagues/createleague', league, {headers: headers})
    .pipe(map(res => res.json()));
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:1000/users/authenticate', user, {headers: headers})
    .pipe(map(res => res.json()));
  }

  authenticateLeague(league){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:1000/leagues/authenticateleague', league, {headers: headers})
    .pipe(map(res => res.json()));
  }

  getLeagues(){
    let headers = new Headers();
    this.authToken.loadLeagueToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:1000/leagues/leagues', {headers: headers})
    .pipe(map(res => res.json()));
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:1000/users/profile', {headers: headers})
    .pipe(map(res => res.json()));
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  storeLeagueData(token, league){
    localStorage.setItem('id_token_league', token);
    localStorage.setItem('league', JSON.stringify(league));
    this.authToken = token;
    this.league = league;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadLeagueToken(){
    const token = localStorage.getItem('id_token_league');
    this.authToken = token;
  }

  notLoggedIn(){
    if(localStorage.id_token == undefined){
      return true;
    } else {
      const helper = new JwtHelperService();
      console.log(helper.isTokenExpired(localStorage.id_token));
      return helper.isTokenExpired(localStorage.id_token);
    }
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  
}
