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

}
