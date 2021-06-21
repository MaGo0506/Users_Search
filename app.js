const searchInput = document.querySelector('.js-searchInput'),
      userData = document.querySelector('.js-userData'),
      matchList = document.querySelector('.js-matchList');
let   webLink,
      linkTag = document.querySelector('.js-linkTag'),
      users = [];

/**
  * We are fetching json data and catching an error, so we can manipulate it
  * Mapping users so we can search if there are users we can go to
  */
searchInput.addEventListener('keyup', async (e) => {

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?username=${formatString(searchInput.value)}`);
    users = await response.json();

  } catch (error) {
    if (error) {
        console.log(error);
    }
  }  

    users = users.map((user)=>{
      return user = `<div class="card card-body userData js-userData">
      <a class="fs-5 fw-bold js-userNameTag">${searchInput.value}</a>
      </div>`;
      });
    
    /**
      * Showing matches when we type somethin in the search bar 
      */  
    if (e.target.value.length === 0 && matchList) {
            matchList.classList.remove('active')
    } else if (matchList) {
            matchList.classList.add('active');
    }
    
    showSuggestions(users);

    /**
      * If we press enter after we time an user it sends us to its page if there is one
      */
    if (e.keyCode === 13) {
        webLink = `https://jsonplaceholder.typicode.com/users?username=${formatString(e.target.value)}`; 
        if (linkTag) {
            linkTag.setAttribute("href", webLink);
            linkTag.click(); 
        } 
    }
});   

/**
  * When some user is clicked sends us to it's webpage that has more data about him/her
  * if there isnt it sends us to a page with the url that has a string that we clicked
  */
matchList.addEventListener('click', (e) => {
  if (e.target.classList.contains('js-userNameTag') || e.target.classList.contains('js-userData')) {
      webLink = `https://jsonplaceholder.typicode.com/users?username=${formatString(e.target.innerText)}`;
      const userNameTag = document.querySelectorAll('.js-userNameTag');
      if (userNameTag) {
          userNameTag.forEach(element => {
          element.setAttribute('href', webLink);
          element.setAttribute('target', "_blank");
        });
      }
    }
  })
  
/**
  * this function capitalizes the first letter in some string and lowercase the rest
  * @param string - string we are checking
  */
 function formatString(string) {
  return string
    .replace(/(\B)[^ ]*/g, match => (match.toLowerCase()))
    .replace(/^[^ ]/g, match => (match.toUpperCase()));
}

/**
  * We are showing our auto-suggestion list
  * @param list - the array we are targeting
  */
function showSuggestions(list){
  let listData;
  if(!list.length){
      userValue = searchInput.value;
      listData = `<div class="card card-body userData js-userData">
      <a class="fs-5 fw-bold js-userNameTag">${searchInput.value}</a>
      </div>`;
  } else {
    listData = list.join('');
  }
  if (matchList) {
    matchList.innerHTML = listData;
  }
}

/**
  * Every time we type in text this event is called
  */
if (searchInput) {
    searchInput.addEventListener('input', () => searchInput.value);  
}
