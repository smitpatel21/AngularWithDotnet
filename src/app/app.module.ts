import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddBookComponent } from './add-book/add-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { TokenInterceptor } from './token.interceptor';
import { ErrorPageComponent } from './error-page/error-page.component';
import { UsersComponent } from './users/users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { LoaderComponent } from './loader/loader.component';
import { CardComponent } from './card/card.component';
import { FilterHeaderComponent } from './filter-header/filter-header.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AddMissionComponent } from './add-mission/add-mission.component';
import { StoriesComponent } from './stories/stories.component';
import { StoryCardComponent } from './story-card/story-card.component';
import { StoryPageComponent } from './story-page/story-page.component';
import { SidebarNavigationComponent } from './sidebar-navigation/sidebar-navigation.component';
import { MissionComponent } from './mission/mission.component';
import { UpdateMissionComponent } from './update-mission/update-mission.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { StoryDashboardComponent } from './story-dashboard/story-dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddSkillsComponent } from './add-skills/add-skills.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    AddBookComponent,
    UpdateBookComponent,
    ErrorPageComponent,
    UsersComponent,
    UpdateUserComponent,
    LoaderComponent,
    CardComponent,
    FilterHeaderComponent,
    ProfilePageComponent,
    AddMissionComponent,
    StoriesComponent,
    StoryCardComponent,
    StoryPageComponent,
    SidebarNavigationComponent,
    MissionComponent,
    UpdateMissionComponent,
    DashboardLayoutComponent,
    StoryDashboardComponent,
    ChangePasswordComponent,
    AddSkillsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
