import { Injectable } from '@angular/core';
import { constant } from 'app/core/interfaces/constanst';
import { StorageService } from './storage.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor( 
    private storageService: StorageService,
    private firestore: AngularFirestore
  ) { }

  public login(username , password): Promise <any> {
    return this.firestore.collection('Admin').ref.where("user", "==" , username).where("password", "==" , password).get();
    
  }

  logout(){
    this.storageService.logout();
  }

}
