import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LobbyPage } from './lobby.page';
import { UserStatusComponent } from '../user-status/user-status.component';

const routes: Routes = [
  {
    path: '',
    component: LobbyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
      LobbyPage,
      UserStatusComponent
  ]
})
export class LobbyPageModule {}
