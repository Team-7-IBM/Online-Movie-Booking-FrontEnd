import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/customer/customer';
import { EmailService } from 'src/app/emailservice/email.service';
import { Seat } from 'src/app/seat/seat';
import { SeetService } from 'src/app/seat/seet.service';
import { TktService } from '../tkt.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css'],
})
export class CreateTicketComponent implements OnInit {
  ticketForm: FormGroup;
  errorMessage: string;
  bookingId: number;
  seats: any[];
  cust: Customer;
  constructor(
    private fb: FormBuilder,
    private tikService: TktService,
    private stService: SeetService,
    private router: Router,
    private actRouter: ActivatedRoute,
    private email: EmailService
  ) {}

  ngOnInit(): void {
    this.bookingId = this.actRouter.snapshot.params['bookingId'];
    this.stService.getAllSeats().subscribe((data: Seat[]) => {
      this.seats = data;
    });
    this.ticketForm = this.fb.group({
      noOfSeats: ['', Validators.required],
      seats: ['', Validators.required],
    });
  }

  addATicket() {
    console.log(this.ticketForm.value);
    this.tikService.addTicket(this.ticketForm.value, this.bookingId).subscribe(
      (res: any) => {
        this.router.navigate(['/booking/view', this.bookingId]);
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );
    this.email.sendTktEmail(this.cust.customerId).subscribe((res) => {
      this.router.navigate(['']);
      });
  }
  sendemail(){
    this.email.sendTktEmail(this.cust.customerId).subscribe((res) => {
      this.router.navigate(['']);
      });
  }
}
