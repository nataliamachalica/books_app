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
  };

  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
  };

  function render(){
    for (let books of dataSource.books){
      const generatedHTML = templates.booksTemplate(books);
      const element = utils.createDOMFromHTML(generatedHTML);
      //find books container
      const booksContainer = document.querySelector(select.containerOf.booksList);
      //add element to list
      booksContainer.appendChild(element);
    }
  }
  render();

  const favoriteBooks = [];

  function initActions(){

    const booksContainer = document.querySelector(select.containerOf.booksList);
    const booksImage = booksContainer.querySelectorAll('.book__image');

    for(let image of booksImage){
      image.addEventListener('dblclick', function(event){
        event.preventDefault();
        image.classList.add('favorite');
        const id = image.getAttribute('data-id');
        favoriteBooks.push(id);
      });
    }
  }
  initActions();
}


