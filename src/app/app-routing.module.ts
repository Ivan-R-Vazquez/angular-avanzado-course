import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes: Routes = [
  // { path: '', loadChildren: () => import('./pages/pages-routing.module').then(m => m.PagesRoutingModule)},
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: '**', component: NopagefoundComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
