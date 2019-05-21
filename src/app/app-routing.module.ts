import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  // { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
