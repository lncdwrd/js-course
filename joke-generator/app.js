document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e) {
  e.preventDefault();

  const jokeCount = document.querySelector('#number').value;

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `http://api.icndb.com/jokes/random/${jokeCount}`, true);

  xhr.onload = function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);

      if (response.type === 'success') {
        response.value.forEach(joke => {
          document.querySelector('.jokes').innerHTML += `<li>${joke.joke}</li>`;
        });
      } else {
        console.log('Error');
      }
    }
  }

  xhr.send();
}