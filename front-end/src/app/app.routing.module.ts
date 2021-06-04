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
        },
        data: {
            title: 'Timeline'    
        }
    },
    { 
        path: 'p/add', 
        component: PhotoFormComponent,
        canActivate: [
            AuthGuard
        ],
        data: {
            title: 'Upload Photo'    
        }
    },
    { 
        path: 'p/:photoId', 
        component: PhotoDetailsComponent,
        data: {
            title: 'Photo Detail'    
        }
    },
    { 
        path: 'not-found',  
        component: NotFoundComponent,
        data: {
            title: 'Not Found'    
        }
    },
    { 
        path: '**',  
        redirectTo: 'not-found' 
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