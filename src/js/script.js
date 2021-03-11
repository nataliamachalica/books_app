//const { render } = require("node-sass");

{
  'use strict';

  const select = {
    templateOf: {
      booksTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
    class: {
      favoriteBooks: 'favorite',
    },
    book: {
      bookImage: '',
    },
  };

  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
  };

  const render = function(){
    for (let books of dataSource.books){
      const generatedHTML = templates.booksTemplate(books);
      const element = utils.createDOMFromHTML(generatedHTML);
      //find books container
      const booksContainer = document.querySelector(select.containerOf.booksList);
      //add element to list
      booksContainer.appendChild(element);
    }
  };
  render();

  const favoriteBooks = [];

  const initActions = function(){

    const booksContainer = document.querySelector(select.containerOf.booksList); //referencja do listy książek

    booksContainer.addEventListener('dblclick', function(event){ //nasłuchiwacz
      event.preventDefault(); // zatrzymanie domyślnych
      const bookCover = event.target.offsetParent; //najbliższy kliknięty
      const id = bookCover.getAttribute('data-id'); // pobieranie atrybutu

      if(!bookCover.classList.contains('favorite')){
        favoriteBooks.push(id); //dodanie identyfikatora do favbooks
        bookCover.classList.add('favorite');
      }else{
        favoriteBooks.splice(favoriteBooks.indexOf(id), 1); //usunięcie id z tablicy
        bookCover.classList.remove('favorite');
      }
    });
  };
  initActions();
}
