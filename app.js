const searchInput = document.querySelector('.js-searchInput'),
      matchList = document.querySelector('.js-matchList');
let   webLink;

/**
  * We are fetching users.json and filtering them
  * @param searchText - The text wich we are filtering when we enter some users
  */
const searchUsers = async searchText => {
const response = await fetch('https://jsonplaceholder.typicode.com/users'),
      users = await response.json();

    /**
     *  Get matches to current text input
     */
    let matches = users.filter(user => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return user.username.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }
    outputHtml(matches);
};

/**
  * Shows results in HTML
  * @param matches - the users that match out current text input
  */
const outputHtml = matches => {
    if (matches.length > 0) {
        const usersHtml = matches.map(match => `
        <div class="card card-body userData js-userData">
            <a class="fs-5 fw-bold js-userNameTag">${match.username}</a>
        </div>
        `).join('');
    if (matchList) {
        matchList.innerHTML = usersHtml;

    /**
      * When some user is clicked sends us to it's webpage that has more data about him/her
      */
    matchList.addEventListener('click', (e) => {
        if (e.target.classList.contains('js-userNameTag') || e.target.classList.contains('js-userData')) {
        webLink = `https://jsonplaceholder.typicode.com/users?username=${e.target.innerText}`;
        const userNameTag = document.querySelectorAll('.js-userNameTag');
        if (userNameTag) {
            userNameTag.forEach(element => {
            element.setAttribute('href', webLink);
        });
        }
    }
    })
    } 
    }
};

/**
  * Every time we type in text this event is called
  */
if (searchInput) {
    searchInput.addEventListener('input', () => searchUsers (searchInput.value));  
}


