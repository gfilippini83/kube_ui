import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
export interface DialogData {
    status: 'SUCCESS' | 'FAILURE',
    message: string
}
@Component({
    selector: 'register-dialog',
    templateUrl: './register.component.html',
  })
  export class RegisterMessageDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    

  }
  