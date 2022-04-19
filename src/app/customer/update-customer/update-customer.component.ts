import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailSenderService } from 'src/app/emailservice/email';
import { EmailService } from 'src/app/emailservice/email.service';
import { CustmerService } from '../custmer.service';
import { Customer } from '../customer';
@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css'],
})

export class UpdateCustomerComponent implements OnInit {
  customerId: number;
  cust: Customer;
  constructor(
    private actRouter: ActivatedRoute,
    private router: Router,
    private cService: CustmerService,
    private email: EmailService
  ) {}

  ngOnInit(): void {
    this.cust = new Customer();
    this.customerId = this.actRouter.snapshot.params['customerId'];
    this.cService.getCustomerById(this.customerId).subscribe((data) => {
      this.cust = data;
      console.log(data);
    });
  }
  updateACustomer() {
    this.cService.updateCustomer(this.cust).subscribe((res) => {
      this.router.navigate(['']);
    this.email.sendEmail(this.cust.customerId).subscribe((res) => {
      this.router.navigate(['']);
      })
    });
  }
}
