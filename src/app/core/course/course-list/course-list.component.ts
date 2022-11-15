import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SignInController } from '../../../users/SignInController';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  animations: [
    trigger('next', [
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate('1s')
      ]),
      transition('* => void', [
        animate('1s', style({ transform: 'translateX(+100%)' }))
      ])
    ])
  ]
}) 
export class CourseListComponent implements OnInit {
  signInCtrl = new SignInController();
  constructor() { }

  step = 1

  ngOnInit(): void {
  }

  async sendValidationCode() {
    await this.signInCtrl.sendValidateCode()
    this.step = 2
  }

  async signInUser() {
    await this.signInCtrl.signInUser()
    this.step = 3
  }

}
