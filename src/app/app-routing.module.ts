import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { AddMissionComponent } from './add-mission/add-mission.component';
import { AuthGuard } from './auth.guard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MissionComponent } from './mission/mission.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SignupGuard } from './signup.guard';
import { SignupComponent } from './signup/signup.component';
import { StoriesComponent } from './stories/stories.component';
import { StoryDashboardComponent } from './story-dashboard/story-dashboard.component';
import { StoryPageComponent } from './story-page/story-page.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { UpdateMissionComponent } from './update-mission/update-mission.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard ] },
  { path: 'login', component: LoginComponent, canActivate: [SignupGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [SignupGuard] },
  {
    path: 'share-story',
    component: AddBookComponent,
    canActivate: [AuthGuard],
  },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: 'update-user/:id',
    component: UpdateUserComponent,
    canActivate: [AuthGuard],
  },
  { path: 'update-mission/:id', component: UpdateMissionComponent },
  { path: 'profile/:id', component: ProfilePageComponent },
  { path: 'stories', component: StoriesComponent },
  { path: 'story-detail/:id', component: StoryPageComponent },
  { path: 'story-dashboard', component: StoryDashboardComponent },
  { path: 'add-mission', component: AddMissionComponent },
  { path: 'missions', component: MissionComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
