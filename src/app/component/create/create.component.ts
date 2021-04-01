import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArticleData } from 'src/app/interfaces/articleData';
import { UserData } from 'src/app/interfaces/userData';
import { MenuService } from 'src/app/service/menu.service';
import { newBlogDialog } from '../dialog/newBlogDialog/newBlog.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  loading: boolean = false;
  user: UserData = {
    id: '',
    username: '',
    email: '',
    roles: [{
      _id: '',
      role: ''
    }],
    accessToken: ''
  };
  articleData: ArticleData = {
        _id: '',
        title: '',
        author: '',
        date: 0,
        coverPhoto: '',
        footer: '',
        rating: 5,
        comments: [],
        content: [
            {
                type: 'text',
                content: ''
            }
        ]
  }
  blogForm: FormGroup = new FormGroup({
    title: new FormControl(),
    coverPhoto: new FormControl(),
    footer: new FormControl(),
    content: new FormArray([new FormGroup({
      type: new FormControl(),
      content: new FormControl()
    })])
  });

  constructor(private menuService: MenuService, private router: Router, private formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = this.menuService.getUser();
    var roles = this.user.roles.map(role => {
      return role.role
    })
    console.log(roles)
    if(!roles.includes('admin') && !roles.includes('blogger')) {
      this.router.navigate(['/'])
    }
  }
  addInput(): void {
    this.getContent.push(
      new FormGroup({
        type: new FormControl(),
        content: new FormControl()
      })
    )
  }
  delInput(index: number): void {
    const arrayControl = this.getContent;
    arrayControl.removeAt(index);
}
  get getContent() {
    return this.blogForm.get("content") as FormArray;
  }
  getType(num: number): string {
    const strVal = <string> this.blogForm.value.content[num].type
    return strVal
  }

  openDialog(dia_status: string, dia_message: string): void {
    this.loading = false;
    const dialogRef = this.dialog.open(newBlogDialog, {
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
    this.loading = true
    this.articleData.title = this.blogForm.value.title;
    this.articleData.coverPhoto = this.blogForm.value.coverPhoto;
    this.articleData.footer = this.blogForm.value.footer;
    this.articleData.content = this.blogForm.value.content;
    this.articleData.date = Date.now();
    this.articleData.author = <string> this.user.username;
    console.log(this.articleData)
    this.menuService.postNewBlog(this.articleData).subscribe(resp => {
      this.openDialog(resp.status, resp.message)
    })
  }

}
