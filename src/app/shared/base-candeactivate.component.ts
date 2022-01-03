import { HostListener, Directive } from "@angular/core";

@Directive()
export abstract class BaseComponentCanDeactivate  {
 

    abstract hasUnsavedData(): boolean;


    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        if (this.hasUnsavedData()) {
            $event.returnValue = true;
        }
    }
}
