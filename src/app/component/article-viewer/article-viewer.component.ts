import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleData } from 'src/app/interfaces/articleData';
import { MenuService } from 'src/app/service/menu.service';

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
        date: '',
        coverPhoto: '',
        footer: '',
        content: [
            {
                type: '',
                content: ''
            }
        ]
  };
  constructor(public activatedRoute: ActivatedRoute, private menuService: MenuService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params)
      this.menuService.getArticleById(params.data).subscribe(resp => {
        this.config = resp;
        console.log(resp)
      })
    })
  }

}
