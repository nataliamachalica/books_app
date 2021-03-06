{
  'use strict';

  const select = {
    booksTemplate: '#template-book',
    booksList: '.books-list',
    form: '.filters',
    image: '.book__image',
    favorite: '.favorite',
    hidden: 'hidden',
  };

  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.booksTemplate).innerHTML),
  };

  class BooksList{

    constructor(){
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
    }

    initData(){
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
    }

    getElements(){
      const thisBooksList = this;

      thisBooksList.booksContainer = document.querySelector(select.booksList);
      thisBooksList.filteredBooks = document.querySelector(select.form);

      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    render(){
      const thisBooksList = this;

      for (let books of thisBooksList.data){

        books.ratingBgc = thisBooksList.determineRatingBgc(books.rating);
        books.ratingWidth = books.rating * 10;

        const generatedHTML = templates.booksTemplate(books);
        const element = utils.createDOMFromHTML(generatedHTML);
        const booksContainer = document.querySelector(select.booksList);
        booksContainer.appendChild(element);
      }
    }

    initActions(){
      const thisBooksList = this;

      thisBooksList.booksContainer.addEventListener('dblclick', function(event){
        event.preventDefault();

        const bookCover = event.target.offsetParent;

        if (bookCover.classList.contains('book__image')){
          const id = bookCover.getAttribute('data-id');

          if (bookCover.includes(id)){
            const indexBooks = bookCover.indexOf(id);
            bookCover.classList.remove('favorite');
            thisBooksList.favoriteBooks.splice(indexBooks, 1);
          }else{
            bookCover.classList.add('favorite');
            bookCover.push(id);
          }
        }
      });

      thisBooksList.filteredBooks.addEventListener('change', function(event){
        event.preventDefault();

        const clickedElem = event.target;

        if(clickedElem.type === 'checkbox'){
          if(clickedElem.checked){
            thisBooksList.filters.push(clickedElem.value);
          }else{
            const filterIndex = thisBooksList.filters.indexOf(clickedElem.value);
            thisBooksList.filters.splice(filterIndex, 1);
          }
        }
      });
    }

    filterBooks(){
      const thisBooksList = this;

      for(let elem of thisBooksList.data){
        let shouldBeHidden = false;
        for (let filter of thisBooksList.filters){
          if(!elem.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }
        if(shouldBeHidden){
          const bookCover = document.querySelector('.book__image[data-id="' + elem.id + '"]');
          bookCover.classList.add('hidden');
        }else{
          const bookCover = document.querySelector('.book__image[data-id="' + elem.id + '"]');
          bookCover.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating){
      let background = '';

      if(rating<6){
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      }else if(rating >6 && rating<=8){
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      }else if(rating>8 && rating<=9){
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      }else if(rating>9){
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
      return background;
    }
  }

  const app = new BooksList();
  app();
}
