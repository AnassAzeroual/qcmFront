import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanDeactivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {BaseComponentCanDeactivate} from '../base-candeactivate.component';
import {UserInputService} from "./user-input.service";


@Injectable({
    providedIn: 'root'
})
export class CanDeactivateGuard<T extends BaseComponentCanDeactivate> implements CanDeactivate<T> {

    constructor(private userInputService: UserInputService) {
    }

    async canDeactivate(component: T): Promise<boolean> {


        // console.log('CanDeactivateGuard', component, component.hasUnsavedData());

        if (component.hasUnsavedData()) {
            try {
                await this.userInputService
                    .confirm('Confirmation', 'Voulez vous vraiment quitter cette page ? Car vous avez effectué des changements que vous risqueriez de perdre.');
                return true;
            } catch (err) {
                return false;
            }
        }
        return true;
    }
}
