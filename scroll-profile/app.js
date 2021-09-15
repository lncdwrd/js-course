let users = [
  {
    name: "John",
    picture: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    name: "Miller",
    picture: "https://randomuser.me/api/portraits/women/63.jpg"
  },
  {
    name: "Smith",
    picture: "https://randomuser.me/api/portraits/men/15.jpg"
  }
];




// Generator
function* generator(arr) {
  let index = 0;
  while (index < arr.length) {
    yield arr[index++];
  }
};



// Profile Scroller UI
const profile = generator(users);
const nextBtn = document.querySelector('.js-next-btn');

nextBtn.addEventListener('click', renderProfile);

function renderProfile() {
  const currentProfile = profile.next().value;
  const imageDisplay = document.querySelector('#imageDisplay');
  const profileDisplay = document.querySelector('#profileDisplay');

  if (currentProfile !== undefined) {
    imageDisplay.src = `${currentProfile.picture}`;
    profileDisplay.innerHTML = `
      <h1>${currentProfile.name}</h1>
    `;
  } else {
    window.location.reload();
  }
}

window.addEventListener('DOMContentLoaded', renderProfile);