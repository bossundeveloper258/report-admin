import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  public getFiles(id){
    return this.storage.ref(id).listAll()
  }

  public getFileUrl(fullPath){
    return this.storage.ref(fullPath).getDownloadURL();
  }
}
