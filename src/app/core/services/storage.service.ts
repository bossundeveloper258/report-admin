import {Injectable} from "@angular/core";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private localStorageService;
  private currentSession : any;
  constructor(private router: Router) { 
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }


  setCurrentSession(session): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', session);
  }

  loadSessionData(): any{
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? sessionStr : null;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }

  getCurrentSession() {
    return this.currentSession;
  }

  isAuthenticated(): boolean {
    return (this.getCurrentSession() != null) ? true : false;
  };

}
