import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import {MatDialog } from '@angular/material/dialog';
import { RegisterMessageDialog } from '../dialog/registerDialog/register.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  loading = false;
  submitted = false;
  returnUrl: string = '/';
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthService,
    public dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    });
    this.returnUrl = '/';
  }

  get f() { return this.registerForm.controls; }


  openDialog(dia_status: string, dia_message: string): void {
    const dialogRef = this.dialog.open(RegisterMessageDialog, {
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

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    } else {
      if(this.registerForm.value.password !== this.registerForm.value.password2) {
        this.openDialog('FAILURE', "Passwords do not match!")
      } else {
        
        this.authenticationService.register(
            {
              username: this.registerForm.value.username,
              email: this.registerForm.value.email,
              password: this.registerForm.value.password,
              roles: [
                { role: 'viewer' }
              ]
            }
          ).subscribe(resp => {
              this.openDialog(resp.status, resp.message)
          })

        }
    }

    console.log("YOU HAVE SUBMITTED")
  }

}
