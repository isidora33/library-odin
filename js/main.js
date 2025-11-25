let myLibrary = [];
const libraryDiv = document.getElementById('library');
const newBookBtn = document.getElementById('newBook');
const dialog = document.getElementById('dialog');
const confirmBtn = document.getElementById('confirmBtn');

function Book(title, author, pages, read, notes){
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.notes = notes;
}

function addBookToLibrary(bookObj) {
  myLibrary.push(bookObj);
}

function displayBooks() {
  libraryDiv.innerHTML = "";

  const emptyMsg = document.getElementById('emptyMsg');
  if(myLibrary.length === 0){
    emptyMsg.style.display = 'block';
    return;
  } else {
    emptyMsg.style.display = 'none';
  }

  myLibrary.forEach(book => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('bookCard');
    bookDiv.dataset.id = book.id;

    bookDiv.innerHTML = `
      <p>${book.title} — ${book.author} (${book.pages}p)</p>
      <p>Read: ${book.read ? 'Yes' : 'No'}</p>
      <button class="toggleReadBtn">Toggle Read</button>
      <button class="removeBtn">Remove</button>
    `;

    libraryDiv.appendChild(bookDiv);

    // Toggle read dugme
    bookDiv.querySelector('.toggleReadBtn').addEventListener('click', () => {
      book.toggleRead();
      displayBooks(); // osvežavamo prikaz da se vidi promena
    });

    // Dugme za brisanje
    bookDiv.querySelector('.removeBtn').addEventListener('click', () => {
      removeBook(book.id);
    });
  });
}



displayBooks();

newBookBtn.addEventListener('click', () => {
  newBookForm.reset();          
  document.getElementById('errorMsg').style.display = 'none'; 
  dialog.showModal();
});

confirmBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const title = document.getElementById('bookTitle').value.trim();
  const author = document.getElementById('bookAuthor').value.trim();
  const pages = document.getElementById('bookPages').value.trim();

  const errorMsg = document.getElementById('errorMsg');

  if (title === "" || author === "" || pages === "" || pages <= 0) {
    errorMsg.style.display = "block";
    return;
  }

  errorMsg.style.display = "none";

  const newBook = new Book(
    title,
    author,
    pages,
    document.getElementById('bookRead').checked,
    document.getElementById('bookNotes').value
  );

  addBookToLibrary(newBook);
  displayBooks();
  dialog.close();
});

const cancelBtn = document.getElementById('cancelBtn');

cancelBtn.addEventListener('click', () => {
  dialog.close();
});


dialog.addEventListener('click', (e) => {
  const dialogRect = dialog.getBoundingClientRect();

  // ako je klik izvan granica modala
  if (
    e.clientX < dialogRect.left ||
    e.clientX > dialogRect.right ||
    e.clientY < dialogRect.top ||
    e.clientY > dialogRect.bottom
  ) {
    dialog.close();
  }
});

function removeBook(bookId) {
  // filtriramo myLibrary da izbacimo book sa datim id-jem
  myLibrary = myLibrary.filter(book => book.id !== bookId);
  displayBooks(); // osvežimo prikaz
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};


