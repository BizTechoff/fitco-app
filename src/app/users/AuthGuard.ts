import { Injectable } from '@angular/core';
import { AuthenticatedGuard } from 'common-ui-elements';
import { Roles } from './roles';


@Injectable()
export class AdminGuard extends AuthenticatedGuard {

    override isAllowed() {
        return Roles.admin;
    }
}


@Injectable()
export class ManagerGuard extends AuthenticatedGuard {

    override isAllowed() {
        return Roles.manager;
    }
}


@Injectable()
export class GuideGuard extends AuthenticatedGuard {

    override isAllowed() {
        return Roles.guide;
    }
}


@Injectable()
export class CustomerGuard extends AuthenticatedGuard {

    override isAllowed() {
        return Roles.customer;
    }
}
