import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';

import { UserEditComponent } from 'app/pages/user/user-edit/user-edit.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    NotificationsComponent,
    UserEditComponent
  ]
})

export class AdminLayoutModule {}
