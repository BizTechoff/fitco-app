import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonUIElementsModule, NotAuthenticatedGuard } from 'common-ui-elements';
import { ShowDialogOnErrorErrorHandler } from './common/UIToolsService';
import { CourseListComponent } from './core/course/course-list/course-list.component';
import { HomeComponent } from './home/home.component';
import { terms } from './terms';
import { AdminGuard, CustomerGuard, GuideGuard, ManagerGuard } from "./users/AuthGuard";
import { UsersComponent } from './users/users.component';

const defaultRoute = terms.home;
const routes: Routes = [
  { path: defaultRoute, component: HomeComponent, canActivate: [NotAuthenticatedGuard], data: { name: 'ברוכים הבאים' } },
  { path: terms.userAccounts, component: UsersComponent, canActivate: [AdminGuard], data: { name: 'משתמשים' } },
  { path: 'courses', component: CourseListComponent, canActivate: [CustomerGuard], data: { name: 'סדנאות שלי' } },
  { path: '**', redirectTo: '/' + defaultRoute, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonUIElementsModule],
  providers: [AdminGuard, ManagerGuard, GuideGuard, CustomerGuard, { provide: ErrorHandler, useClass: ShowDialogOnErrorErrorHandler }],
  exports: [RouterModule]
})
export class AppRoutingModule { }
