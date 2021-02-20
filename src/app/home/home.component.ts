import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router, private appComp: AppComponent) {
    let auth = localStorage.getItem("authorized");
    if (!auth) {
      this.route.navigateByUrl("login");
    }
  }

  ngOnInit(): void {
  }

  /**
   * Method to go to bank transaction
   * 
   */
  goToBankTransaction() {
    this.route.navigateByUrl("create-transaction");
  }

  /**
   * Method to go to submitted transaction
   * 
   */
  goToSubmittedTransaction() {
    this.route.navigateByUrl("submitted-transactions");
  }

  /**
   * Method to logout user
   * 
   */
  logout() {
    this.route.navigateByUrl("login");
    localStorage.clear()
  }
}
