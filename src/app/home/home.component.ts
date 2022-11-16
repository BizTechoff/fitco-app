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
  errorInput =''
  constructor() { }

  step = 1
  
  ngOnInit(): void {
  }
  
  isNumber22(e: KeyboardEvent)
  {
    console.log('e',e)
    console.log('e.key',e.key)
//  if (e.key > 31 && (charCode < 48 || charCode > 57)) {
//      return false;
//  }
 return true; }

  async checkIdNumber() {
    console.log('checkIdNumber',this.errorInput)
    await this.signInCtrl.checkIdNumber()
    // this.errorInput = await this.signInCtrl.checkIdNumber()
    console.log('checkIdNumber',this.errorInput)
    // this.step = 2
  }

  async sendValidationCode() {
    this.errorInput = ''
    await this.signInCtrl.sendValidateCode()
    this.step = 2
  }

  async signIn() {
    this.errorInput = ''
    await this.signInCtrl.signInUser()
    this.step = 3
  }

}
