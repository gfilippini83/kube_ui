import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
export interface DialogData {
    status: 'SUCCESS' | 'FAILURE',
    message: string
}
@Component({
    selector: 'new-blog-dialog',
    templateUrl: './newBlog.component.html',
  })
  export class newBlogDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    

  }
  