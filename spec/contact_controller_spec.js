const ContactController = require('../controllers/ContactController');
const sequelize = require('../db/models/index').sequelize;

describe('ContactController', () => {
  beforeEach((done) => {
    this.book = new ContactController();

    sequelize.sync({force: true}).then((res) => {
      done();
    })
    .catch((err) => {
      done();
    });
  });
  describe('#addContact()', () => {
    it('should add a single contact into the book', () => {
      this.book.addContact('Alice', '999-999-9999', 'alice@email.com').then((contact) => {
        expect(contact.name).toBe('Alice');
        expect(contact.phone).toBe('999-999-9999');
        expect(contact.email).toBe('alice@email.com');
        done();
      })
      .catch((err) => {
        done();
      });
    });
  });
  describe('#getContacts()', () => {
    it('should return an empty array when no contacts are available', (done) => {
      this.book.getContacts()
      .then((contacts) => {
        expect(contacts.length).toBe(0);
        done();
      });
    });
    it('should return an array of contacts when contacts are available', (done) => {
      this.book.addContact('Alice', '888-888-8888', 'alice@email.com')
      .then(() => {
        expect(contacts.length).toBe(1);
        done();
      }).catch((err) => {
        console.log(err);
        done();
      });
    });
  });
  describe('search methods', () => {
    const zelda = ['Zelda Smith', '000-100-111', 'zelda@nintendo.com'];
    const snake = ['Solid Snake', '100-100-100', 'snake@konami.com'];
    const magnus = ['Magnus Johnson', '101-010-101', 'magnus@squaresoft.com'];
    const alloy = ['Alloy Rodriguez', '111-111-1111', 'allow@guerrilla-games.com'];

  describe('#iterativeSearch()', () => {
    it('should return null when called with an empty array', () => {
      expect(this.book.iterativeSearch([], "Alloy")).toBeNull();
    });
    it('should return null when contact is not found', (done) => {
      this.book.addContact(...zelda)
        .then(() => {
          this.book.getContacts()
          .then((contacts) => {
            expect(this.book.iterativeSearch(contacts, 'Alloy Rodriguez')).toBeNull();
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
    });
    it('should return the contact if found', (done) => {
      this.book.addContact(...alloy)
        .then(() => {
          this.book.addContact(...magnus)
            .then(() => {
              this.book.getContacts()
                .then((contacts) => {
                  let contact = this.book.iterativeSearch(contacts, 'Magnus Johnson');
                  expect(contact.name).toBe('Magnus Johnson');
                  expect(contact.phone).toBe('101-010-101');
                  expect(contact.email).toBe('magnus@squaresoft.com');
                  done();
                })
                .cath((err) => {
                  console.log(err);
                  done();
                });
            });
        });
    });
  });
  describe('#binarySearch()', () => {
    function sort(contacts) {
      return contacts.sort((a, b) => {
        if(a.name > b.name) return 1;
        else if(a.name < b.name) return -1;
        else return 0;
      });
    }
    if('should return null when called with an empty array', () => {
      expect(this.book.binarySearch([], 'Alloy Rodriguez')).toBeNull();
    });
    it('should return null when contact is not found', (done) => {
      this.book.addContact(...zelda)
      .then(() => {
        this.book.getContacts()
          .then((contacts) => {
            expect(this.book.binarySearch(sort(contacts), 'Alloy Rodriguez')).toBeNull();
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
      })
    });
    it('should return the contact if found', (done) => {
      this.book.addContact(...alloy).then(() => {
        this.book.addContact(...magnus).then(() => {
          this.book.addContact(...zelda).then(() => {
            this.book.addContact(...snake).then(() => {
              this.book.getContacts().then((contacts) => {
                let contact = this.book.binarySearch(sort(contacts), 'Magnus Johnson');
                expect(contact.name).toBe('Magnus Johnson');
                expect(contact.phone).toBe('101-010-101');
                expect(contact.email).toBe('magnus@squaresoft.com');
                done();
              });
            });
          });
        });
      });
    });
  });
  describe('#search()', () => {
    it('should return null when a contact was not found', (done) => {
      this.book.addContact(...zelda)
      .then(() => {
        this.book.search('Solid Snake')
        .then((contact) => {
          expect(contact).toBeNull();
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
    it('should return the contact when found', (done) => {
      this.book.addContact(...snake)
      .then(() => {
        this.book.search('Solid Snake')
        .then((contact) => {
          expect(contact).not.toBeNull();
          expect(contact.name).toBe('Solid Snake');
          expect(contact.phone).toBe('100-100-100');
          expect(contact.email).toBe('snake@konami.com');
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
    });
  });
  describe('#delete()', () => {
    it('should not remove any contacts that do not match the ID passed', (done) => {
      this.book.addContact('Rick Deckard', '000-000-000', 'null@null.com')
      .then(() => {
        this.book.getContacts()
        .then((contacts) => {
          expect(contacts[0].name).toBe('Rick Deckard');
          expect(contacts.length).toBe(1);
          this.book.delete(99)
          .then(() => {
            this.book.getContacts()
            .then((contacts) => {
              expect(contacts.length).toBe(1);
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          });
        });
      });
    });
    it('should remove the contact that matches the ID passed', (done) => {
      this.book.addContact('Rick Deckard', '000-000-000', 'null@null.com').then((contact) => {
        this.book.getContacts()
        .then((contacts) => {
          expect(contacts[0].name).toBe('Rick Deckard');
          expect(contacts.length).toBe(1);
          this.book.delete(contact.id)
          .then(() => {
            this.book.getContacts()
            .then((contacts) => {
              expect(contacts.length).toBe(0);
              done();
            })
          .catch((err) => {
            console.log(err);
            done();
          });
          });
        });
      });
    });
  });
});
