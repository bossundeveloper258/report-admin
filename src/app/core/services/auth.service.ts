import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,  
    public ngZone: NgZone
  ) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  login(email, password):Promise<any>{
    return this.afAuth.signInWithEmailAndPassword(email, password);
    // .then(() => this.router.navigate(['dashboard']));
  }

  SignUp( user: User ) {
    

    return this.afAuth.createUserWithEmailAndPassword(user.username, user.password)
      .then((result) => {

        // this.SendVerificationMail();
        console.log(result);
        this.SetUserData(user, result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SetUserData(userModel, userRes) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`Users/${userRes.uid}`);
    const userData: User = {
      uid: userRes.uid,
      date: userModel.date,
      username: userRes.email,
      password: userModel.password,
      name: userModel.name,
      lastname: userModel.lastname,
      dni: userModel.dni,
      phone: userModel.phone,
      category: userModel.category,
      photoURL: userRes.photoURL,
      emailVerified: userRes.emailVerified,
      categoryName : userModel.categoryName
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  
}
