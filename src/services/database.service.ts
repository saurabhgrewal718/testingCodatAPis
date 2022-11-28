import { Injectable } from '@angular/core';
import { doc, Firestore } from '@angular/fire/firestore';
import { setDoc } from '@firebase/firestore';
import { from, Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore:Firestore) { }

  addUser(user:any) : Observable<any>{
      const ref = doc(this.firestore,'users',user?.uid);
      console.log('add user');
      
      return from(setDoc(ref,user));
  }
}
