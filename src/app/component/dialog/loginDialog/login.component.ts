import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
export interface DialogData {
    status: 'SUCCESS' | 'FAILURE',
    message: string
}
@Component({
    selector: 'login-dialog',
    templateUrl: './login.component.html',
  })
  export class LoginDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    

  }
  