import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ToastrService } from 'ngx-toastr';

/** Error handler for input - dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  usersList: any = [{
    name: "test",
    pass: "test@123"
  },
  {
    name: "mcb",
    pass: "mcb@123"
  },
  {
    name: "nick",
    pass: "nick@777"
  }];

  @ViewChild("userName") user: ElementRef;

  constructor(
    private route: Router,
    private appComp: AppComponent,
    public formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {

    this.loginForm = this.formBuilder.group({
      userFormControl: ['', Validators.required],
      passwordFormControl: ['', Validators.required]
    })

    setTimeout(() => {
      this.user.nativeElement.focus();
    }, 300);
  }

  ngOnInit(): void {}

  /**
   * Method to submit login form
   * 
   */
  submitForm() {
    let enteredName = this.loginForm.controls['userFormControl'].value;
    let enteredPass = this.loginForm.controls['passwordFormControl'].value;

    let names: any = this.usersList.map(s => s.name);
    let userObj: any = this.usersList.filter(obj => obj.name === enteredName);

    if (this.loginForm.valid) {
      if (names.includes(enteredName) && enteredPass === userObj[0].pass) {
        this.appComp.authorized = true;
        localStorage.setItem("authorized", "true");
        this.route.navigateByUrl("home");
      } else {
        this.toastr.error("Invalid user name or password");
        this.loginForm.reset();
        setTimeout(() => {
          this.user.nativeElement.focus();
        }, 300);
      }
    }
  }
}
