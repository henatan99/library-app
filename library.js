function toggle() {
    var x = document.getElementById("book-form");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
}

// Book list table 

// array variable to hold book objects 
let myLibrary = [];

// constructor function for Book object

function Book(title, author, isbn, pages, status) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
  this.pages = pages;
  this.status = status;

  this.info = function() {
      "#{this.title} by #{this.author}, #{this.pages} pages, #{this.status}."
  }
}

// adding book to myLibrary collection
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// DOM manipulation 

function appendBook(bookObj, booksId) {
    const books = document.querySelector(booksId);
    
    // creating nodes 
    const book = document.createElement('tr');
    book.classList.add('book');

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
    status.textContent = bookObj.status;

    // create the delete button in each book row
    const buttontd = document.createElement('td');
    buttontd.classList.add('del-book');  

    const button = document.createElement('button');
    button.textContent = 'Remove';

    buttontd.appendChild(button);
    // rendering nodes 'td'

    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(isbn);
    book.appendChild(pages);
    book.appendChild(status); 
    book.appendChild(buttontd);
}

// create book objects manually 

const book1 = new Book('Book1', 'Author1', 'isbn1', 250, 'read');
addBookToLibrary(book1);
const book2 = new Book('Book2', 'Author1', 'isbn1', 420, 'not read');
addBookToLibrary(book2);
const book3 = new Book('Book3', 'Author1', 'isbn1', 720, 'not read');
addBookToLibrary(book3);

// function to render book table list rows 

function listBooks(books) {
    books.forEach((bookObj) => appendBook(bookObj, '#books'));
}

// calling listBooks function upon the myLibrary books collection 

listBooks(myLibrary);