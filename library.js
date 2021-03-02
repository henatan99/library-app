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

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
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

        // rendering nodes 'td'

    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(isbn);     
}

// create book objects manually 

const book1 = new Book('Book1', 'Author1', 'isbn1');
addBookToLibrary(book1);
const book2 = new Book('Book2', 'Author1', 'isbn1');
addBookToLibrary(book2);
const book3 = new Book('Book3', 'Author1', 'isbn1');
addBookToLibrary(book3);

// function to render book table list rows 

function listBooks(books) {
    books.forEach((bookObj) => appendBook(bookObj, '#books'));
}

// calling listBooks function upon the myLibrary books collection 

listBooks(myLibrary);