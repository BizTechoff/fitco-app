import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { CommonUIElementsModule } from 'common-ui-elements';
import { remult } from 'remult';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataAreaDialogComponent } from './common/data-area-dialog/data-area-dialog.component';
import { TextAreaDataControlComponent } from './common/textarea-data-control/textarea-data-control.component';
import { UIToolsService } from './common/UIToolsService';
import { YesNoQuestionComponent } from './common/yes-no-question/yes-no-question.component';
import { CourseListComponent } from './core/course/course-list/course-list.component';
import { RegisterUserComponent } from './core/register/register-user/register-user.component';
import { HomeComponent } from './home/home.component';
import { AdminGuard, CustomerGuard, GuideGuard, ManagerGuard } from "./users/AuthGuard";
import { SignInController } from './users/SignInController';
import { UsersComponent } from './users/users.component';
// import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    YesNoQuestionComponent,
    DataAreaDialogComponent,
    TextAreaDataControlComponent,
    RegisterUserComponent,
    CourseListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CommonUIElementsModule//,
    // MatStepperModule
  ],
  providers: [
    UIToolsService,
    AdminGuard,
    ManagerGuard,
    GuideGuard,
    CustomerGuard,
    { provide: APP_INITIALIZER, useFactory: initApp, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [YesNoQuestionComponent, DataAreaDialogComponent]
})

export class AppModule { }

export function initApp() {
  const loadCurrentUserBeforeAppStarts = async () => {
    remult.user = await SignInController.currentUser();
  };
  return loadCurrentUserBeforeAppStarts;
}
