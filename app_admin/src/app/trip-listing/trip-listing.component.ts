import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';

import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { AuthService } from '../services/authentication.service';
import{ Router } from '@angular/router';

@Component({
selector: 'app-trip-listing',
standalone: true,
imports: [CommonModule, TripCardComponent],
templateUrl: './trip-listing.component.html',
styleUrl: './trip-listing.component.css',
providers: [TripDataService]
})

export class TripListingComponent implements OnInit {

  trips!: Trip[]
  message: string = '';

  constructor(
  private tripDataService: TripDataService,
  private router: Router,
  private authservice: AuthService
) {
    console.log('trip-listing constructor');
  }
  
  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }
  public isLoggedIn(): boolean {
    return this.authservice.isLoggedIn();
  }

  private getStuff(): void {
    this.tripDataService.getTrips()
    .subscribe({
      next: (value: any) => {
        this.trips = value;
        if(value.length > 0)
        {
          this.message = 'There are ' + value.length + ' trips available.';
        }
        else{
          this.message = 'There were no trips retrieved from the database';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}