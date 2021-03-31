import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as e from 'express';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  loading = false;

  constructor(private authenticationService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  get f() { return this.loginForm.controls; }

  submit() {
    if (this.loginForm.invalid) {
      console.log("INVALID FORM")
    } else {
      this.submitted = true;
      this.authenticationService.login({username: this.loginForm.value.username, password: this.loginForm.value.password}).subscribe(resp => {
        if(resp && resp.accessToken) {
            console.log("RESP:", resp)
            localStorage.setItem('access_token', <string> resp.accessToken)
            localStorage.setItem('id', <string> resp.id)
            this.router.navigate(['/'])
            // this.router.navigate(['/'])
            console.log("STATUS SUCCESS")
          } 
        })
      // console.log(status)
      // if(status.STATUS = 'SUCCESS') {
      //   console.log("SUCCESS")
      // }
    }
  }

}
