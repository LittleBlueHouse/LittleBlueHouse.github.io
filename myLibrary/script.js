import { Library } from './data/Library.js';
import { LibraryUI } from './ui/LibraryUI.js';

const myLibrary = new Library();
new LibraryUI(myLibrary, 'bookList', 'bookForm');
