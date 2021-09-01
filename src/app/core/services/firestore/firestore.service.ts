import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'jquery';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
  ) {}

  
  public getReport(reportId: string) {
    return this.firestore.collection('Reports').doc(reportId).snapshotChanges();
  }
  
  public getReports() {
    return this.firestore.collection('Reports').snapshotChanges();
  }
  
  public updateCat(documentId: string, data: any) {
    return this.firestore.collection('Users').doc(documentId).set(data);
  }

  public getUsers() {
    return this.firestore.collection('Users').snapshotChanges();
  }

  public getUser( userId ){
    return this.firestore.collection('Users').doc(userId).snapshotChanges();
  }

  public putUser( userId , user){
    console.log( Object.assign({}, user) );
    return this.firestore.collection('Users').doc(userId).set(Object.assign({}, user));
  }

}
