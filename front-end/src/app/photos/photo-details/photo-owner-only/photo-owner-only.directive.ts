import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';
import { Photo } from '../../photo/photo';

@Directive({
    selector: '[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {

    @Input() ownedPhoto: Photo;

    constructor(
        private _element: ElementRef<any>,
        private _renderer: Renderer2,
        private _userService: UserService
    ) {

    }

    ngOnInit(): void {
        this._userService
        .getUser()
        .subscribe(user => {
            if (!user || (user.id !== this.ownedPhoto.userId)) {
                this._renderer.setStyle(this._element.nativeElement, 'display', 'none');
            }
        });
    }
}