//referencing id's from html document
var userFormEl = document.querySelector('#user-form');
var languageButtonsEl = document.querySelector('#language-buttons');
var nameInputEl = document.querySelector('#username');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');



let formSubmitHandler = function(e){
  e.preventdefult();

  let username = nameIput.value.trim();

  if (username) {
    getUserRepos(username);
    repoContainerEl.textContent = '';
    nameInputEl.value = '';
    } else {
      alert('please enter a Github username');
    }
};





userFormEl.addEventListener('submit', formSubmitHandler);