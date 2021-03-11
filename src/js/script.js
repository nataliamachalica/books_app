//const { render } = require("node-sass");

{
  'use strict';

  const select = {
    templateOf: {
      booksTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      filters: '.filters',
    },
    book: {
      image: '.books-list',
      favorite: '.favorite',
    },
  };

  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
  };

  const booksContainer = document.querySelector(select.containerOf.booksList);
  const favoriteBooks = [];
  //const filters = [];

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

  const initActions = function(){

    booksContainer.addEventListener('dblclick', function(event){
      event.preventDefault();

      const bookCover = event.target.offsetParent;
      if (bookCover.classList.contains('book__image')){
        const id = bookCover.getAttribute('data-id');
        if (favoriteBooks.includes(id)){
          const indexBooks = favoriteBooks.indexOf(id);
          bookCover.classList.remove('favorite');
          favoriteBooks.splice(indexBooks, 1);
        }else{
          bookCover.classList.add('favorite');
          favoriteBooks.push(id);
        }
      }
    });
  };
  render();
  initActions();



  /*const filteredBooks = document.querySelector(select.containerOf.filters);

  filteredBooks.addEventListener('click', function(event){
    const clickedElement = event.target;
    if(clickedElement.tagName === 'input' && clickedElement.type === 'chceckbox' && clickedElement.name === 'filter'){
      console.log(clickedElement.value);
      if(clickedElement.checked){
        filters.push(clickedElement.value);
      }else{
        const id = filters.indexOf(clickedElement.value);
        filters.splice(filters.indexOf(id), 1);
      }
    }
  });*/
}
