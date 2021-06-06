import { Directive, ElementRef, Renderer2, Input, OnInit } from "@angular/core";
import { UserService } from "src/app/core/user/user.service";

@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

    currentDisplay: string;

    constructor(
        private _element: ElementRef<any>,
        private _renderer: Renderer2,
        private _userService: UserService
    ) {

    }

    ngOnInit(): void {

        this.currentDisplay = this.getCurrentDisplay();
        this._userService
            .getUser()
            .subscribe(user => {
                if (user) {
                    this._renderer.setStyle(this._element.nativeElement, 'display', this.currentDisplay);
                } else {
                    this.currentDisplay = this.getCurrentDisplay();
                    this._renderer.setStyle(this._element.nativeElement, 'display', 'none');
                }
            });
    }

    private getCurrentDisplay(): string {
        return getComputedStyle(this._element.nativeElement).display;
    }
}