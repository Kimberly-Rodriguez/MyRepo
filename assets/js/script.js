//referencing id's from html document
var userFormEl = document.querySelector('#user-form');
var languageButtonsEl = document.querySelector('#language-buttons');
var nameInputEl = document.querySelector('#username');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');


let formSubmitHandler = function(e){
  e.preventDefault();

  let username = nameInputEl.value.trim();

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

let getUserRepos = function(user) {
  let apiUrl = 'https://api.github.com/users/' + user + '/repos';

  fetch(apiUrl)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data, user);
      });
    } else {
      alert ('Error:' + response.statusText);
    }
  })
  .catch(function (error) {
    alert('Unable to connect to GitHub')
  });
};


var getFeaturedRepos = function (language) {
  var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data.items, language);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};


let displayRepos = function(repos, searchTerm){
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }

  repoSearchTerm.textContent = searchTerm;

  for (let i = 0; i < repos.length; i++) {
    let repoName = repos[i].owner.login + '/' + repos[i].name;

    let repoEl = document.createElement('div');
    repoEl.classList = "list-item flex-row justify-space between align-center";

    let titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    let statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =  "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    repoEl.appendChild(statusEl);

    repoContainerEl.appendChild(repoEl);

  }
}

userFormEl.addEventListener('submit', formSubmitHandler);
languageButtonsEl.addEventListener('click', buttonClickHandler);