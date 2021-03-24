import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  data: string = '';

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.getTest().subscribe(resp => {
      if(resp) {
        this.data = resp.message
      }
    })
  }

}
