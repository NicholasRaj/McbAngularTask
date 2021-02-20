import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-submitted-transaction',
  templateUrl: './submitted-transaction.component.html',
  styleUrls: ['./submitted-transaction.component.scss']
})
export class SubmittedTransactionComponent implements OnInit {

  displayedColumns: string[] = ['index', 'customerName', 'transferAmount', 'transferCurrency', 'reference'];
  dataSource: any = [];
  noData: boolean;

  constructor(private service: HttpService, private toastr: ToastrService) {
    this.getSubmittedTransactions();
  }

  ngOnInit(): void {
  }

  /**
   * Method to get submitted transactions
   * 
   */
  getSubmittedTransactions() {
    this.service.ajaxCall(this.service.baseUrl + this.service.records, 'get', '').subscribe(resp => {
      if (resp) {
        this.dataSource = resp;
        if (this.dataSource.length > 0) {
          document.querySelector('table').classList.add('mat-elevation-z8');
          this.noData = false;
        } else {
          document.querySelector('table').classList.remove('mat-elevation-z8');
          this.noData = true;
        }
      }
    }, (err: any) => {
      this.toastr.error("Error occured while fetching records");
    });
  }

}
