import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/interfaces/userData';
import { AuthService } from 'src/app/service/auth.service';
import { MenuService } from 'src/app/service/menu.service';

interface HeaderData {
  title: string,
  subtitle: string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})



export class HeaderComponent implements OnInit {

  showFiller = false;
  isLoggedIn: boolean = false;
  user: UserData = {
    id: '',
    username: '',
    email: '',
    roles: [{
      role: ''
    }],
    accessToken: ''
  };  
 lock: boolean = false;

  constructor(private menuService: MenuService, public authService: AuthService) { }
  
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if(this.isLoggedIn) {
      this.getUser();
      
    }
    
  }
  getUser() {
    if(this.isLoggedIn && this.user.accessToken === '' && !this.lock) {
      this.lock = true
      this.authService.getUser()
      .subscribe(resp => {
        this.lock = false;
        if(resp) {
          this.user = resp;
          console.log("IS LOGGED:", this.isLoggedIn, "USER DATA:", this.user)
        }
      });
    }
  }
  getIsLoggedIn():boolean {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getUser();
    return this.isLoggedIn
  }
  logout(): void {
    this.authService.logout();
  }

}
