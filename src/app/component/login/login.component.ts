import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as e from 'express';
import { AuthService } from 'src/app/service/auth.service';
import { LoginDialog } from '../dialog/loginDialog/login.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  loading = false;

  constructor(private authenticationService: AuthService, private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  get f() { return this.loginForm.controls; }

  openDialog(dia_status: string, dia_message: string): void {
    const dialogRef = this.dialog.open(LoginDialog, {
      width: '300px',
      data: {status: dia_status, message: dia_message}
    });
    if(dia_status === 'SUCCESS'){
      dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['/'])
      });
    } else {
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  }
  submit() {
    if (this.loginForm.invalid) {
      console.log("INVALID FORM")
    } else {
      this.submitted = true;
      this.authenticationService.login({username: this.loginForm.value.username, password: this.loginForm.value.password}).subscribe(resp => {
        if(resp && resp.accessToken) {
            localStorage.setItem('access_token', <string> resp.accessToken)
            localStorage.setItem('id', <string> resp.id)
            this.router.navigate(['/'])
          } else {
            this.openDialog('FAILURE', 'Please check you username and password, we cannot find this account in our database.')
          }
        })
    }
  }

}
