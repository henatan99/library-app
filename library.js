function toggle() {
    var x = document.getElementById("bookform");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

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

// store class 
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }
        else {
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
            if(book.isbn === isbn) {
                books.splice(index, 1);
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
    status.textContent = bookObj.status;

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

const booksubmit = document.querySelector('#booksubmit');
document.querySelector('#bookform').addEventListener('submit', (e) => {   
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    const pages = document.querySelector('#pages').value;
    const status = document.querySelector('#status').value;
    
    if(title === '' || author === ''  || isbn === '' || pages === '' || status === '') {
        alert('Fill all the fields');
    }
    else {
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
    let parent     
    if (e.target.parentElement.classList.contains('del-book')) {
        parent = e.target.parentElement.parentElement.childNodes[2];
        parent.parentElement.remove(); 
        Store.removeBook(parent.textContent);
    } 
});

// function to render book table list rows 

function listBooks(books) {   
    books.forEach((bookObj) => appendBook(bookObj, '#books'));
}

// calling listBooks function upon the myLibrary books collection 

myLibrary = Store.getBooks();
listBooks(myLibrary);