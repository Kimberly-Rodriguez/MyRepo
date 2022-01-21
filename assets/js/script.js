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
   // console.log(`show me the username:`, username);
    getUserRepos(username);
    repoContainerEl.textContent = '';
    nameInputEl.value = '';
    } else {
      alert('please enter a Github username');
    }
};

let buttonClickHandler = function(e) {
  let language = e.target.getAttribute('data-language');

  if (language){
    getFeaturedRepos(language);
    
    repoContainerEl.textContent = "";
  }
};





let getFeaturedRepos = function(language){

  let apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';

  fetch(apiUrl).then(function(response){
    if(response.ok) {
      response.json().then(function(data){
        //console.log(data);
        displayRepos(data.items, language);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};





userFormEl.addEventListener('submit', formSubmitHandler);
languageButtonsEl.addEventListener('click', buttonClickHandler);