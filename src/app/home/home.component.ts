import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SignInController } from '../users/SignInController';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('next', [
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate('.5s')
      ]),
      transition('* => void', [
        animate('.5s', style({ transform: 'translateX(+100%)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  signInCtrl = new SignInController();
  constructor() { }

  step = 1
 
  ngOnInit(): void {
  }

  async checkIdNumber() {
    await this.signInCtrl.checkIdNumber()
    // this.step = 2
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
