import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { openDialog, RouteHelperService } from 'common-ui-elements';
import { remult } from 'remult';
import { DataAreaDialogComponent } from './common/data-area-dialog/data-area-dialog.component';
import { UIToolsService } from './common/UIToolsService';
import { terms } from './terms';
import { SignInController } from './users/SignInController';
import { UpdatePasswordController } from './users/UpdatePasswordController';
import { User } from './users/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    private routeHelper: RouteHelperService,
    public uiService: UIToolsService) {
  }
  terms = terms;
  remult = remult;


  showRemultUser() {
    try { alert(JSON.stringify(this.remult.user) + '||{"authenticated":' + remult.authenticated() + '}') }
    catch (err) { console.log(err) }
  }

  async signIn(e: MouseEvent) {
    if (e.ctrlKey) {
      this.showRemultUser()
      return
    }
    const signIn = new SignInController();
    openDialog(DataAreaDialogComponent, i => i.args = {
      title: terms.signIn,
      object: signIn,
      ok: async () => {
        remult.user = await signIn.signIn();
      }
    });
  }

  ngOnInit(): void {

  }

  signOut() {
    SignInController.signOut();
    remult.user = undefined;
    this.router.navigate(['/']);
  }

  async updateInfo() {
    let user = await remult.repo(User).findId(remult.user!.id);
    openDialog(DataAreaDialogComponent, i => i.args = {
      title: terms.updateInfo,
      fields: [
        user.$.name
      ],
      ok: async () => {
        await user._.save();
      }
    });
  }
  // async changePassword() {
  //   const updatePassword = new UpdatePasswordController();
  //   openDialog(DataAreaDialogComponent, i => i.args = {
  //     title: terms.signIn,
  //     object: updatePassword,
  //     ok: async () => {
  //       await updatePassword.updatePassword();
  //     }
  //   });

  // }

  routeName(route: Route) {
    let name = route.path;
    if (route.data && route.data['name'])
      name = route.data['name'];
    return name;
  }

  currentTitle() {
    if (this.activeRoute!.snapshot && this.activeRoute!.firstChild)
      if (this.activeRoute.snapshot.firstChild!.data!['name']) {
        return this.activeRoute.snapshot.firstChild!.data['name'];
      }
      else {
        if (this.activeRoute.firstChild.routeConfig)
          return this.activeRoute.firstChild.routeConfig.path;
      }
    return 'fitco-app';
  }

  shouldDisplayRoute(route: Route) {
    if (!(route.path && route.path.indexOf(':') < 0 && route.path.indexOf('**') < 0))
      return false;
    return this.routeHelper.canNavigateToRoute(route);
  }
  //@ts-ignore ignoring this to match angular 7 and 8
  @ViewChild('sidenav') sidenav: MatSidenav;
  routeClicked() {
    if (this.uiService.isScreenSmall())
      this.sidenav.close();
  }
}
