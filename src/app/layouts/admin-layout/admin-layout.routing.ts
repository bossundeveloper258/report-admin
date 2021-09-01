import { Routes } from '@angular/router';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UserEditComponent } from 'app/pages/user/user-edit/user-edit.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'reports',      component: DashboardComponent },
    
    { path: 'user',           component: UserComponent },
    { path: 'user/add',      component: UserEditComponent },
    { path: 'user/:id',      component: UserEditComponent },
    { path: 'notifications',  component: NotificationsComponent },
];
