import { Injectable } from '@angular/core';
import { constant } from 'app/core/interfaces/constanst';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor( 
    private storageService: StorageService
  ) { }

  login(username , password):boolean {
    if( constant.auth.username == username  && constant.auth.password == password){
      this.storageService.setCurrentSession(username);
      return true;
    }
    return false;
  }

  logout(){
    this.storageService.logout();
  }

}
