import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private basePath = '/pruebas/';

  constructor(
    private firestore: AngularFirestore,
    private db: AngularFireDatabase, 
    private storage: AngularFireStorage
  ) { }

  public getContratos() {
    return this.firestore.collection('contratos').valueChanges();
  }

  public getImagenes() {
    return this.firestore.doc('contratos').valueChanges();
  }

  public getFiles(numberItems: any) {
    console.log(this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems)))
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }
}
