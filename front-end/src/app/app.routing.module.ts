import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { AuthGuard } from './core/auth/auth.guard';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    { 
        path: 'home',  
        loadChildren: './home/home.module#HomeModule'
    },
    { 
        path: 'user/:userName',  
        component: PhotoListComponent , 
        resolve: {
            photos: PhotoListResolver
        }
    },
    { 
        path: 'p/add', 
        component: PhotoFormComponent,
        canActivate: [
            AuthGuard
        ]
    },
    { 
        path: 'p/:photoId', 
        component: PhotoDetailsComponent
    },
    { 
        path: '**',  
        component: NotFoundComponent 
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
        //Usar caso o servidor não suporte o procedimento normal do Angular: RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}