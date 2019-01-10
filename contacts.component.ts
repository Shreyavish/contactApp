import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {

  constructor(private contactService: ContactService) { }

    contacts: Contact[]; // array in which each contact is stored
    contact: Contact; // each individual contact as keyvalue pair in Contact[]
    first_name: string;
    last_name: string;
    phone: string;

  addContact() {
      const newContact = {
        first_name: this.first_name,
        last_name: this.last_name,
        phone: this.phone
      };
      this.contactService.addContact(newContact)
      .subscribe(contact => {
          this.contacts.push(newContact);
        });
        this.ngOnInit(); // after adding reload automatically;
  }



   deleteContact(id: string) {
     // console.log(id);
      const contacts = this.contacts;
      // console.log(id);
      this.contactService.deleteContact(id)
      .subscribe(data => {
        if (data.n === 1) {
          for (let i = 0; i < contacts.length ; i++) {
            if (contacts[i]._id === id) {
              console.log('found it');
                contacts.splice(i, 1);
                this.ngOnInit();
          }
        }
      }
    });
    }


  ngOnInit() { // EVERYTIME APP IS INTIALIZED CONTACTS ARE fetched and displayed
    this.contactService.getContacts()
    .subscribe(
      contacts => this.contacts = contacts
    );
  }

}
