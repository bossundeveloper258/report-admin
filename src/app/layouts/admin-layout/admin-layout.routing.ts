import { Routes } from '@angular/router';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UserEditComponent } from 'app/pages/user/user-edit/user-edit.component';
import { ReportsComponent }            from '../../pages/reports/reports.component';
import { ReportEditComponent }            from '../../pages/reports/report-edit/report-edit.component';
import { AuthGuard } from 'app/core/guards/auth.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'reports',      component: ReportsComponent , canActivate: [AuthGuard]},
    { path: 'reports/:id',      component: ReportEditComponent , canActivate: [AuthGuard]},
    { path: 'user',           component: UserComponent , canActivate: [AuthGuard]},
    { path: 'user/add',      component: UserEditComponent , canActivate: [AuthGuard]},
    { path: 'user/:id',      component: UserEditComponent , canActivate: [AuthGuard]},
    { path: 'notifications',  component: NotificationsComponent , canActivate: [AuthGuard]},
];
