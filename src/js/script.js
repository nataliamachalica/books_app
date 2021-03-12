//const { render } = require("node-sass");

{
  'use strict';

  const select = {
    templateOf: {
      booksTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      form: '.filters',
    },
    book: {
      image: '.books-list .book__image' ,
      favorite: '.books-list .favorite',
    },
  };

  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
  };

  const booksContainer = document.querySelector(select.containerOf.booksList);
  const filteredBooks = document.querySelector(select.containerOf.form);
  const favoriteBooks = [];
  const filters = [];

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

  filteredBooks.addEventListener('change', function(event){
    event.preventDefault();
    const clickedElem = event.target;
    if(clickedElem.type === 'checkbox'){
      if(clickedElem.checked){
        filters.push(clickedElem.value);
        console.log(filters);
      }else{
        const filterIndex = filters.indexOf(clickedElem.value);
        filters.splice(filterIndex, 1);
        console.log(filters);
      }
    }
    filterBooks();
  });


  const filterBooks = function(){
    for(let elem of dataSource.books){
      let shouldBeHidden = false;
      for (let filter of filters){
        if(!elem.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      if(shouldBeHidden){
        const bookCover = document.querySelector('.book__image[data-id="' + elem.id + '"]');
        console.log('bookCover:', bookCover);
        bookCover.classList.add('hidden');
      }else{
        const bookCover = document.querySelector('.book__image[data-id="' + elem.id + '"]');
        bookCover.classList.remove('hidden');
      }
    }
  };


  render();
  initActions();
}
