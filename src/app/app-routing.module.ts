import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleViewerComponent } from './component/article-viewer/article-viewer.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LandingComponent } from './component/landing/landing.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { TestComponent } from './component/test/test.component';

const routes: Routes = [
  {
    path: '', component: LandingComponent
  },
  {
    path: 'test', component: TestComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'article/:data', component: ArticleViewerComponent, pathMatch: 'full'
  },
  {
    path: 'signup', component: RegisterComponent, pathMatch: 'full'
  },
  {
    path: 'signin', component: LoginComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
