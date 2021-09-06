const github = new GitHub();
const ui = new UI();
const searchUser = document.querySelector('#searchUser');

searchUser.addEventListener('keyup', debounce((e) => {
  const userText = e.target.value;

  if (userText !== '') {
    github.getUser(userText)
      .then(data => {
        if (data.profile.message === 'Not Found') {
          ui.showAlert('User not found', 'danger');
          ui.clearElement('searchResult');
        } else {
          console.log(data);
          ui.showProfile(data.profile);
          ui.showRepos(data.repos);
          ui.clearElement('alert');
        }
      })
      .catch(error => {
        console.log(error);
      })
  } else {
    ui.clearElement('searchResult');
  }
}, 1000));

function debounce(callback, wait) {
  let timeout;
  return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(function () { callback.apply(this, args); }, wait);
  };
}