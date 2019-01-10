import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Contact } from './contact';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: Http) { }
    // retrieving contacts

  getContacts() {

    return this.http.get('http://localhost:3000/api/contacts')
    .pipe(map(res => res.json()));
  }
  // add contacts
  addContact(newContact: Contact) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/contacts', newContact, {headers: headers})
    .pipe(map(res => res.json()));
  }

  deleteContact(id: string) {

      const url = 'http://localhost:3000/api/contacts/';
       return this.http.delete(url + id)
    .pipe(map(
      res => {
        return res.json();
      }));
  }

}
