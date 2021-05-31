import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Header } from './Components/header/header.component';
import {MatDividerModule} from '@angular/material/divider';
import { Http } from './Services/Http.service';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import {  RouterModule, Routes } from '@angular/router';
import { Articles } from './Pages/Articles/Articles.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Article } from './Pages/Article/Article.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { Admin } from './Pages/Admin/Admin.component';
import { Auth} from './Services/Auth.service';
import { CreatePostGuard } from './Guards/CreatePostGuard.guard';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { Tools } from './Components/Tools/Tools.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ADD_PHOTO, ADD_PHOTO_VALUE, DEFAULT_SETTINGS, DEFAULT_VALUE } from './Services/Default.service';
import {ReactiveFormsModule} from '@angular/forms';
import { AdminLogin } from './Pages/AdminLogin/AdminLogin.component';
import { Topics } from './Pages/Topics/Topics.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Loading } from './Pages/Loading/Loading.component';
import { Comments } from './Components/Comments/Comments.component';
import { BasicLayoutComponent } from './layouts/basic-layout/basic-layout.component';
import { FlexLayoutComponent } from './layouts/flex-layout/flex-layout.component';
import { SectionLayoutComponent } from './layouts/section-layout/section-layout.component';
import { ButtonComponent } from './Components/button/button.component';
import { OutlineButtonComponent } from './Components/outline-button/outline-button.component';
import { BannerComponent } from './Components/banner/banner.component';
import { CardSimpleComponent } from './Components/card-simple/card-simple.component';
import {MatListModule} from '@angular/material/list';
import { JsHistoryPageComponent } from './Pages/js-history-page/js-history-page.component';
import { PostCardComponent } from './Components/post-card/post-card.component';
import { GridLayoutComponent } from './layouts/grid-layout/grid-layout.component';
import { BreadcrumbsComponent } from './Components/breadcrumbs/breadcrumbs.component';
import {MatIconModule} from '@angular/material/icon';
import { BlogAuthorComponent } from './Components/blog-author/blog-author.component';
import { PostContentListComponent } from './Components/post-content-list/post-content-list.component';
import {MatRippleModule} from '@angular/material/core';
import { NgApexchartsModule } from "ng-apexcharts";



const routes: Routes = [
  {path:"",component:HomePageComponent,pathMatch:"full"},
  {path:"posts",component:Articles},
  {path:"post/:postId",component:Article},
  {path:"loginadmin",component:AdminLogin},
  {path:"createpost",component:Admin,canActivate:[CreatePostGuard],canDeactivate:[CreatePostGuard]},
  {path:"topics",component:Topics},
  {path:"js-history",component:JsHistoryPageComponent},
  {path:"**",redirectTo:"/",pathMatch:"full"}
];

@NgModule({
  declarations: [
    AppComponent,Header,Articles,
    HomePageComponent,Article,
    Admin,Tools,AdminLogin,
    Topics,Loading,
    Comments,
    BasicLayoutComponent,
    FlexLayoutComponent,
    SectionLayoutComponent,
    ButtonComponent,
    OutlineButtonComponent,
    BannerComponent,
    CardSimpleComponent,
    JsHistoryPageComponent,
    PostCardComponent,
    GridLayoutComponent,
    BreadcrumbsComponent,
    BlogAuthorComponent,
    PostContentListComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatRippleModule,
    MatButtonToggleModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    MatPaginatorModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    NgApexchartsModule
  ],
  providers: [
    Http,
    Auth,
    CreatePostGuard,
  {
    provide:DEFAULT_SETTINGS,useValue:DEFAULT_VALUE
  },
  {
    provide:ADD_PHOTO,useValue:ADD_PHOTO_VALUE
  }
],
  bootstrap: [AppComponent],
})
export class AppModule { }
