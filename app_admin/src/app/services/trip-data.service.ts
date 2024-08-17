import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  baseUrl = 'http://localhost:3000/api';
  url = `${this.baseUrl}/trips`;

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  private createAuthHeaders(): HttpHeaders {
    const token = this.storage.getItem('travlr-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    const formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };
    return this.http.post<AuthResponse>(`${this.baseUrl}/${endpoint}`, formData);
  }

  getTrips(): Observable<Trip[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<Trip[]>(this.url, { headers });
  }

  addTrip(formData: Trip): Observable<Trip> {
    const headers = this.createAuthHeaders();
    return this.http.post<Trip>(this.url, formData, { headers });
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<Trip[]>(`${this.url}/${tripCode}`, { headers });
  }

  updateTrip(formData: Trip): Observable<Trip> {
    const headers = this.createAuthHeaders();
    return this.http.put<Trip>(`${this.url}/${formData.code}`, formData, { headers });
  }
}