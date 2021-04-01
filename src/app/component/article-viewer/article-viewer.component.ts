import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ArticleData } from 'src/app/interfaces/articleData';
import { CommentData } from 'src/app/interfaces/comment';
import { AuthService } from 'src/app/service/auth.service';
import { MenuService } from 'src/app/service/menu.service';
import { SignInDialog } from '../dialog/signInDialog/signInDialog.component';

@Component({
  selector: 'app-article-viewer',
  templateUrl: './article-viewer.component.html',
  styleUrls: ['./article-viewer.component.scss']
})
export class ArticleViewerComponent implements OnInit {
  config: ArticleData = {
        _id: '',
        title: '',
        author: '',
        date: 0,
        coverPhoto: '',
        footer: '',
        rating: 0,
        comments: [
            {
                comment: '',
                datetime: 0,
                commenter: '',
                link: ''
            }
        ],
        content: [
            {
                type: '',
                content: ''
            }
        ]
  };
  comments : CommentData[] = [];
  comment: string = ''
  constructor(public activatedRoute: ActivatedRoute, private menuService: MenuService, private authService: AuthService, public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.menuService.getArticleById(params.data).subscribe(resp => {
        this.config = resp;
        this.comments = this.config.comments.map(x => x);
        this.comments.reverse()
      })
    })
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(SignInDialog, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    
  }

  convertDate(date: number) {
    return new Date(date);
  }

  postComment(): void {
    if(this.authService.isLoggedIn()) {
      this.authService.getUser().subscribe(resp => {
        const newComment: CommentData = {
          comment: this.comment,
          datetime: Date.now(),
          commenter: resp.username,
          link: 'profile/' + resp.username
        }
        this.menuService.postComment(this.config._id, newComment).subscribe(resp => {
          if(resp.status === 'SUCCESS') {
            this.config.comments.push(newComment)
            this.comments = this.config.comments.map(x => x);
            this.comments.reverse()
          }
        })
      })
    } else {
      this.openDialog()
    }
  }

}
