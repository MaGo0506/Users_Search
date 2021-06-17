const searchInput = document.querySelector('.js-searchInput'),
      userData = document.querySelector('.js-userData'),
      matchList = document.querySelector('.js-matchList');
let   webLink,
      linkTag = document.querySelector('.js-linkTag'),
      users = [];


/**
  * Here we are filtering our users even if we type in lowercase
  */
searchInput.addEventListener('keyup', (e) => {
    const targetValue = e.target.value.toLowerCase(),
          filteredUsers =  users.filter((user) => {
            return user.username.toLowerCase().startsWith(targetValue);
          });
    
    if (e.target.value.length === 0 && matchList) {
            matchList.classList.remove('active')
    } else if (matchList) {
            matchList.classList.add('active');
    }
    
    if (filteredUsers == 0 && users) {
        showNoResult(users); 
    }  else if (filteredUsers) {
        displayUsers(filteredUsers);
    }

    /**
      * this function capitalizes the first letter in some string
      * @param string - string we are checking
      */
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
      * If we press enter after we time an user it sends us to its page if there is one
      */
    if (e.keyCode === 13) {
        webLink = `https://jsonplaceholder.typicode.com/users?username=${capitalizeFirstLetter(e.target.value)}`; 
        if (linkTag) {
            linkTag.setAttribute("href", webLink);
            linkTag.click(); 
        } 
    }
});

/**
  * We are fetching users.json and if we don't fetch them catching an error
  * @param searchText - The text wich we are filtering when we enter some users
  */
const searchUsers = async searchText => {
try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    users = await response.json();

} catch (error) {
    console.log(error);
}  
};

/**
  * Creating Html and appending it for the users
  * @param users - we can change this so we can call diferent users
  */
const displayUsers = users => {
    if (users.length !== 0) {
        const usersHtml = users.map(user => `
        <div class="card card-body userData js-userData">
            <a class="fs-5 fw-bold js-userNameTag">${user.username}</a>
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
            element.setAttribute('target', "_blank");
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

/**
  * We are creating an HTML that is called when there is no users
  * @param array - the array we are checking for matches
  */
function showNoResult(array) {
    let listData;
    if (array.length) {
        userValue = searchInput.value;
        listData = `<div class="card card-body userData js-userData">
        <a class="fs-5 fw-bold js-userNameTag">There is no results</a>
        </div>`;
    } else {
      listData = array.join('');
    }
    matchList.innerHTML = listData;
}
