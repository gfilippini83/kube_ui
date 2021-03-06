import { Component, OnInit } from '@angular/core';
import { TileCoordinator } from '@angular/material/grid-list/tile-coordinator';
import { ArticleData } from 'src/app/interfaces/articleData';
import { MenuService } from 'src/app/service/menu.service';

export interface JumboData {
  title: string,
  subtitle: string
}
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  data: ArticleData;
}
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  hotArticles: boolean = true;
  breakpoint: number = 3;
  jumbo: JumboData = {
    title: '',
    subtitle: ''
  };
  firstTile: Tile = {
    data: {
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
    }, cols: 3, rows: 1, color: 'lightblue'
  }
  tiles: Tile[] = [
    // {text: 'two', cols: 3, rows: 1, color: 'lightblue'},
    // {text: 'three', cols: 3, rows: 1, color: 'lightpink'},
    // {text: 'four', cols: 3, rows: 1, color: '#DDBDF1'},
    // {text: 'five', cols: 3, rows: 1, color: 'lightblue'},
    // {text: 'six', cols: 3, rows: 1, color: 'lightpink'},
    // {text: 'seven', cols: 3, rows: 1, color: '#DDBDF1'}
  ];
  articles: ArticleData[] = [];
  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.getPage('header').subscribe(resp => {
      this.jumbo = <JumboData> resp.config.textElements;
      this.menuService.getArticles().subscribe(resp => {
        if(resp) {
          this.articles = resp.map(x => x);
          this.articles.reverse()
          for (var i = 0; i < this.articles.length; i++){
            if( i == 0 ) {
              this.firstTile.data = this.articles[i]
            } else {
              this.tiles.push(<Tile> {
                data: this.articles[i],
                cols: 3,
                rows: 1,
                color: 'lightpink'
              })
            }
          }
          this.onResize();
        }
      })
    })
    
  }

  shorten(bio:String){
    return bio.length <= 100 ? bio : bio.slice(0,96) + '...';
  }
  
  convertDate(date: number) {
    return new Date(date);
  }
  // @ts-ignore
  onResize(): void {
    
    if(typeof window !== undefined && window.innerWidth <= 1000) {
      this.hotArticles = false;
      this.breakpoint = 3
    } else {
      this.breakpoint = 4
      this.hotArticles = true
    }
  }
}
