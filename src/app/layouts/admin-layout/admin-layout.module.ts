import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { UserEditComponent } from 'app/pages/user/user-edit/user-edit.component';

import { ReportsComponent }            from '../../pages/reports/reports.component';
import { ReportEditComponent }            from '../../pages/reports/report-edit/report-edit.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { GrdFilterPipe } from 'app/core/pipe/grd-filter.pipe';

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
    UserEditComponent,
    ReportsComponent,
    ReportEditComponent,
    GrdFilterPipe
  ],providers: [
    AuthGuard
  ]
})

export class AdminLayoutModule {}
