import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MyErrorStateMatcher } from '../login/login.component';
import { HttpService } from '../http.service';
import { ToastrService } from 'ngx-toastr';

/** Error handler for input - dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }


@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss']
})
export class NewTransactionComponent implements OnInit {
  public transactionForm: FormGroup;

  currencyOptions: string[] = ['AED', 'EUR', 'CHF', 'MUR', 'USD'];
  notFound: boolean = true;

  @ViewChild('customerNo') customerNo: ElementRef;
  @ViewChild('transferAmt') transferAmt: ElementRef;
  @ViewChild('customerName') customerName: ElementRef;

  matcher = new MyErrorStateMatcher();
  customerDetails: any = [];
  newCustomer: boolean;

  constructor(public formBuilder: FormBuilder, private service: HttpService, private toastr: ToastrService) {

    this.transactionForm = this.formBuilder.group({
      referenceFormControl: ['', Validators.required],
      customerNoFormControl: ['', Validators.required],
      nameFormControl: ['', Validators.required],
      addressFormControl: ['', Validators.required],
      phoneFormControl: ['', [Validators.required, Validators.pattern(/^[^*|\":<>[\]{}`\\()';@&$/-]+$/)]],
      transferAmountFormControl: ['', [Validators.required, Validators.pattern(/^[^*|\":<>[\]{}`\\()';@&$/-]+$/)]],
      transferCurrencyFormControl: ['', Validators.required],
      benificiaryBankFormControl: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
      benificiaryNoFormControl: ['', Validators.required],
      paymentDetailsFormControl: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
    })

    setTimeout(() => {
      this.customerNo.nativeElement.focus();
    }, 300);
  }

  ngOnInit(): void { }

  /**
   * Method to generate random sequence for reference
   * 
   */
  generateRandomSequence() {
    let four = Math.floor(1000 + Math.random() * 9000);
    var d = new Date(), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return 'CUS' + [year, month, day].join('') + four;
  }

  /**
   * Method to clear form
   * 
   */
  clearingForm() {
    this.transactionForm.reset();
    console.log(this.customerNo);
    setTimeout(() => {
      this.customerNo.nativeElement.focus();
    }, 300);
  }

  /**
   * Method to get customer details
   * 
   */
  getCustomerDetails() {
    let customerNo = this.transactionForm.controls['customerNoFormControl'].value;

    this.service.ajaxCall(this.service.baseUrl + this.service.customerRecords + '?number=' + customerNo, 'get', '').subscribe(resp => {
      if (resp) {
        this.notFound = false;
        this.customerDetails = resp[0];
        this.transactionForm.controls['referenceFormControl'].setValue(this.generateRandomSequence());
        if (this.customerDetails) {
          this.transactionForm.controls['nameFormControl'].setValue(this.customerDetails['name']);
          this.transactionForm.controls['addressFormControl'].setValue(this.customerDetails['address']);
          this.transactionForm.controls['phoneFormControl'].setValue(Number(this.customerDetails['mobile']));
          setTimeout(() => {
            this.transferAmt.nativeElement.focus();
          }, 300);
        } else {
          this.newCustomer = true;
          this.transactionForm.controls['nameFormControl'].reset();
          this.transactionForm.controls['addressFormControl'].reset();
          this.transactionForm.controls['phoneFormControl'].reset();
          this.transactionForm.controls['referenceFormControl'].setValue(this.generateRandomSequence());
          this.toastr.warning("Customer not found, proceed as new customer");
          setTimeout(() => {
            this.customerName.nativeElement.focus();
          }, 300);
        }
      }
    }, (err: any) => {
      this.toastr.error("Error occured, kindly try again");
    });
  }

  /**
   * Method to submit transaction
   * 
   */
  submitTransaction() {
    let json = {
      "id": Math.floor(1000 + Math.random() * 9000),
      "reference": this.transactionForm.controls['referenceFormControl'].value,
      "transferAmount": this.transactionForm.controls['transferAmountFormControl'].value,
      "currency": this.transactionForm.controls['transferCurrencyFormControl'].value,
      "benificiaryBank": this.transactionForm.controls['benificiaryBankFormControl'].value,
      "benificiaryAccNo": this.transactionForm.controls['benificiaryNoFormControl'].value,
      "paymentDetails": this.transactionForm.controls['paymentDetailsFormControl'].value,
      "customerName": this.transactionForm.controls['nameFormControl'].value,
    }

    this.service.ajaxCall(this.service.baseUrl + this.service.records, 'post', JSON.stringify(json)).subscribe(resp => {
      if (resp) {
        this.toastr.success("Your transaction is successfully processed");
        if (this.newCustomer) {
          this.addNewCustomer();
        }
        this.transactionForm.reset();
        setTimeout(() => {
          this.customerNo.nativeElement.focus();
        }, 300);
      }
    }, (err: any) => {
      if (err['status'] == 500 && err['error'].includes("Insert failed")) {
        this.toastr.error("Error occured, kindly try again");
      }
    });
  }

  /**
   * Method to add a new customer
   * 
   */
  addNewCustomer() {
    let json = {
      "name": this.transactionForm.controls['nameFormControl'].value,
      "number": this.transactionForm.controls['customerNoFormControl'].value,
      "address": this.transactionForm.controls['addressFormControl'].value,
      "mobile": this.transactionForm.controls['phoneFormControl'].value,
      "id": Math.floor(1000 + Math.random() * 9000)
    }

    this.service.ajaxCall(this.service.baseUrl + this.service.customerRecords, 'post', JSON.stringify(json)).subscribe(resp => {
      if (resp) {
        this.newCustomer = false;
        this.toastr.success("You were added successfully");
      }
    }, (err: any) => {
      if (err['status'] == 500 && err['error'].includes("Insert failed")) {
        this.toastr.error("Error occured, kindly try again");
      }
    });
  }
}
