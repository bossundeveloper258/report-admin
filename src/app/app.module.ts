import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from "./core/services/auth.service";
import { SecureInnerPagesGuard } from "./core/guards/secure-inner-pages.guard";
import { AuthGuard } from "./core/guards/auth.guard";

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { environment } from '../environments/environment';

import { FirestoreService } from "./core/services/firestore/firestore.service";
import { CustomvalidationService } from "./core/services/customvalidation";
import { MessagealertComponent } from './core/components/messagealert/messagealert.component';
import { FirestorageService } from "./core/services/firestorage/firestorage.service";
import { StorageService } from "./core/services/storage.service";

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    MessagealertComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: false
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [AuthService, FirestoreService, AuthGuard, SecureInnerPagesGuard, CustomvalidationService, FirestorageService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
