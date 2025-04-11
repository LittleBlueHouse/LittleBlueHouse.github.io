export class BookRenderer {
    static render(book, onDelete) {
      const div = document.createElement('div');
      div.className = 'book-card';
  
      // If the book doesn't have a cover image, use the default book cover with title/author
      let coverElement;
      if (book.coverUrl) {
        coverElement = document.createElement('img');
        coverElement.src = book.coverUrl;
        coverElement.alt = 'Cover Image';
      } else {
        coverElement = document.createElement('div');
        coverElement.className = 'default-cover';
        coverElement.innerHTML = `
          <div class="title">${book.title}</div>
          <div class="author">${book.author}</div>
        `;
      }
  
      div.appendChild(coverElement);
  
      div.innerHTML += `
        <div>
          <strong>${book.title}</strong><br>
          <em>${book.author}</em><br>
          <small>Status: ${book.status}</small>
          <small>Location: ${book.location || '—'}</small>
        </div>
        <button>Delete</button>
      `;
  
      div.querySelector('button').addEventListener('click', () => onDelete(book.id));
  
      return div;
    }
  }
  