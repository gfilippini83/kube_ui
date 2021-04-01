import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './component/landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './component/header/header.component';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list'
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { TestComponent } from './component/test/test.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ArticleViewerComponent } from './component/article-viewer/article-viewer.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { SignInDialog } from './component/dialog/signInDialog/signInDialog.component';
import { RegisterMessageDialog } from './component/dialog/registerDialog/register.component';
import { LoginDialog } from './component/dialog/loginDialog/login.component';
import { CreateComponent } from './component/create/create.component';
import { newBlogDialog } from './component/dialog/newBlogDialog/newBlog.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
    DashboardComponent,
    TestComponent,
    ArticleViewerComponent,
    RegisterMessageDialog,
    LoginDialog,
    LoginComponent,
    newBlogDialog,
    RegisterComponent,
    SignInDialog,
    UserProfileComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    // MatIconModule,
    // MatToolbarModule,
    // MatButtonModule,
    // MatMenuModule,
    // MatSidenavModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
