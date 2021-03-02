function toggle() {
    var x = document.getElementById("book-form");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
}

let myLibrary = [];

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

// DOM manipulation 

// function listBooks(myLibrary) {
    const books = document.querySelector('#books');
    // myLibrary.forEach
    
        // creating nodes 
        const book = document.createElement('tr');
        book.classList.add('book');

        // rendering node 'tr'
        books.appendChild(book);

        // creating nodes 'td'
        const title = document.createElement('td');
        title.classList.add('book-item');
        title.textContent = 'Book Title';

        const author = document.createElement('td');
        author.classList.add('book-item');
        author.textContent = 'Book Author';

        const isbn = document.createElement('td');
        isbn.classList.add('book-item');
        isbn.textContent = 'Book isbn';

        // rendering nodes 'td'

        book.appendChild(title);
        book.appendChild(author);
        book.appendChild(isbn);     
// }
