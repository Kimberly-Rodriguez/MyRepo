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


let displayRepos = function(repos, searchTerm){
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }

  repoSearchTerm.textContent = searchTerm;

  for (let i = 0; i < repos.length; i++) {
    let repoName = repo[i].owner.login + '/' + repo[i].name;

    let repoEl = document.createElement('div');
    repoEl.classList = "list-item flex-row justify-space between align-center";

    let titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

   
  }
}




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