import { Component, OnInit } from '@angular/core';
import { BokingService } from '../boking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../booking';
import { Show } from 'src/app/show/show';
import { Customer } from 'src/app/customer/customer';
import { EmailService } from 'src/app/emailservice/email.service';

@Component({
  selector: 'app-detail-view-booking',
  templateUrl: './detail-view-booking.component.html',
  styleUrls: ['./detail-view-booking.component.css'],
})


export class DetailViewBookingComponent implements OnInit {
  booking: Booking;
  bookingId: number;
  show: Show;
  cust: Customer;
  constructor(
    private actRouter: ActivatedRoute,
    private router: Router,
    private bService: BokingService,
    private emailser: EmailService
  ) {}

  ngOnInit(): void {
    this.bookingId = this.actRouter.snapshot.params['bookingId'];
    this.bService.getTotalCost(this.bookingId);
    this.bService.getBookingById(this.bookingId).subscribe((data: Booking) => {
      this.booking = data;
      console.log(this.booking.show.showId);
    });
  }
  sendemail(){
    this.emailser.sendTktEmail(this.cust.customerId).subscribe((res) => {
      this.router.navigate(['']);
      });
  }
}
