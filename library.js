// constructor function for Book object

function Book(title, author, isbn, pages, status) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
  this.pages = pages;
  this.status = status;

  this.info = function () {
    '#{this.title} by #{this.author}, #{this.pages} pages, #{this.status}.';
  };
}

// store class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBookToLibrary(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

  static editBookStatus(isbn, stat) {
    const books = Store.getBooks();
    books.forEach((book) => {
      if (book.isbn === isbn) {
        book.status = stat;
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}


// DOM manipulation

function appendBook(bookObj, booksId) {
  const books = document.querySelector(booksId);

  // creating nodes
  const book = document.createElement('tr');
  book.classList.add('book');
  book.setAttribute('id', 'book');

  // rendering node 'tr'
  books.appendChild(book);

  // creating nodes 'td'
  const title = document.createElement('td');
  title.classList.add('book-item');
  title.textContent = bookObj.title;

  const author = document.createElement('td');
  author.classList.add('book-item');
  author.textContent = bookObj.author;

  const isbn = document.createElement('td');
  isbn.classList.add('book-item');
  isbn.textContent = bookObj.isbn;

  const pages = document.createElement('td');
  pages.classList.add('book-item');
  pages.textContent = bookObj.pages;

  const status = document.createElement('td');
  status.classList.add('book-item');
  status.classList.add('read-status');
  // ----
  const toggle = document.createElement('button');
  toggle.textContent = bookObj.status;
  toggle.setAttribute('type', 'click');
  toggle.classList.add('btn');

  status.appendChild(toggle);

  // create the delete button in each book row
  const buttontd = document.createElement('td');
  buttontd.classList.add('del-book');

  const button = document.createElement('button');
  button.textContent = 'Remove';
  button.setAttribute('type', 'click');
  buttontd.classList.add('btn');

  buttontd.appendChild(button);
  // rendering nodes 'td'

  book.appendChild(title);
  book.appendChild(author);
  book.appendChild(isbn);
  book.appendChild(pages);
  book.appendChild(status);
  book.appendChild(buttontd);
}

// create book objects from form


document.querySelector('#bookform').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;
  const pages = document.querySelector('#pages').value;
  const status = document.querySelector('#status').value;

  if (title === '' || author === '' || isbn === '' || pages === '' || status === '') {
    const bookform = document.querySelector('#bookform');
    const div = document.createElement('div');
    div.className = 'alert';
    bookform.appendChild(div);
    const message = 'Fill all the fields';
    div.appendChild(document.createTextNode(message));

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  } else {
    const book = new Book(title, author, isbn, pages, status);
    Store.addBookToLibrary(book);
    appendBook(book, '#books');
  }


  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
  document.querySelector('#pages').value = '';
  document.querySelector('#status').value = '';
});


document.querySelector('#books').addEventListener('click', (e) => {
  const btn = e.target;
  if (btn.parentElement.classList.contains('del-book')) {
    const book = btn.parentElement.parentElement;
    const bookIsbn = book.childNodes[2];
    book.remove();
    Store.removeBook(bookIsbn.textContent);
  }
});

// toggle function to change the read status in the books list

document.querySelector('#books').addEventListener('click', (e) => {
  e.preventDefault();
  const btn = e.target;

  if (btn.parentElement.classList.contains('read-status')) {
    const book = btn.parentElement.parentElement;
    const bookIsbn = book.childNodes[2];

    if (btn.textContent === 'read') {
      btn.textContent = 'not-read';
      Store.editBookStatus(bookIsbn.textContent, 'not-read');
    } else {
      btn.textContent = 'read';
      Store.editBookStatus(bookIsbn.textContent, 'read');
    }
  }
});

// function to render book table list rows

function listBooks(books) {
  books.forEach((bookObj) => appendBook(bookObj, '#books'));
}

// calling listBooks function upon the myLibrary books collection

const myLibrary = Store.getBooks();
listBooks(myLibrary);