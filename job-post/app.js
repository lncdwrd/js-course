/**
 * To-do:
 * Display job alert on load
 */
class Storage {
  constructor(storage) {
    this.storage = storage;
  }

  getItem() {
    let itemList = this.storage;

    if (localStorage.getItem(this.storage) === null) {
      itemList = [];
    } else {
      itemList = JSON.parse(localStorage.getItem(this.storage));
    }

    return itemList;
  }

  addItem(newItem) {
    const items = this.getItem();
    const itemId = newItem.name;

    if (itemId === undefined) {
      if (!items.some(e => e === newItem)) {
        items.push(newItem);
        localStorage.setItem(this.storage, JSON.stringify(items));
      }
    } else {
      if (!items.some(e => e.name === itemId)) {
        items.push(newItem);
        localStorage.setItem(this.storage, JSON.stringify(items));
      }
    }
  }

  removeItem(itemKeyName) {
    const items = this.getItem(this.storage);
    const itemId = itemKeyName.name;

    items.forEach((index) => {
      if (item => item.name === itemId) {
        items.splice(index, 1);
        localStorage.setItem(this.storage, JSON.stringify(items));
      }
    });
  }

  static getStorageItem(itemList) {
    if (localStorage.getItem(itemList) === null) {
      itemList = [];
    } else {
      itemList = JSON.parse(localStorage.getItem(itemList));
    }

    return itemList;
  }
}

class SubscribeManager {
  constructor() {
    this.observers = new Storage('Job Seeker');
  }

  subscribe(user) {
    this.notify('subscribe');
    this.observers.addItem(user);
  }

  unsubscribe(user) {
    this.notify('unsubscribe');
    this.observers.removeItem(user);
  }

  notify(updateStatus) {
    User.update(updateStatus);
  }
}

class JobManager {
  constructor() {
    this.jobs = new Storage('Jobs');
  }

  addJob(newJob) {
    this.notify('new job', newJob);
    this.jobs.addItem(newJob);
  }

  notify(updateStatus, newJob) {
    User.update(updateStatus, newJob);
  }

  static renderJob(newJob) {
    const jobList = document.querySelector('.js-job-list');
    
    jobList.innerHTML += `
      <li class="list-group-item js-job">${newJob}</li>
    `;
  }
}

class User {
  constructor(name, job) {
    this.name = name;
    this.job = job;
  }

  static update(updateStatus, newJob) {
    if (updateStatus === 'subscribe') {
      const subscribeLog = Array.from(document.querySelectorAll('.js-subscribe-log'));

      if (subscribeLog[0]) {
        subscribeLog[0].remove();
        this.renderMessage(updateStatus);
      } else {
        this.renderMessage(updateStatus);
      }
    } else if (updateStatus === 'unsubscribe') {
      const unsubscribeLog = Array.from(document.querySelectorAll('.js-unsubscribe-log'));
      
      if (unsubscribeLog[0]) {
        unsubscribeLog[0].remove();
        this.renderMessage(updateStatus);
      } else {
        this.renderMessage(updateStatus);
      }
    } else if (updateStatus === 'new job') {
      const user = currentUser();
      
      if (newJob === user.job) {
        this.renderMessage('new job', newJob);
      }
    }
  }

  static renderMessage(updateStatus, job) {
    const messageLog = document.querySelector('.js-message-log');
    if (updateStatus === 'subscribe') {
      messageLog.innerHTML += `
        <li class="list-group-item list-group-item-action mb-2 js-subscribe-log">You subscribed!</li>
      `;
    } else if (updateStatus === 'unsubscribe') {
      messageLog.innerHTML += `
        <li class="list-group-item list-group-item-warning mb-2 js-unsubscribe-log">You unsubscribed.</li>
      `;
    } else if (updateStatus === 'new job') {
      messageLog.innerHTML += `
        <li class="list-group-item list-group-item-action list-group-item-primary mb-2">New ${job} job alert!</li>
      `;
    }
  }

  static renderProfile(name, job) {
    const userList = document.querySelector('.js-user-profile');
    const user = document.createElement('li');

    user.className = 'list-group-item';
    user.innerHTML = `
      <div class="ms-2 me-auto">
        <p class="fw-bold js-name">${name}</p>
        <p class="fw-bold js-job">${job}</p>
        <p class="fw-bold">Messages:</p>

        <ul class="list-group js-message-log"></ul>

        <a class="btn btn-outline-primary mb-4 js-subscribe">Subscribe</a>
        <a class="btn btn-outline-secondary mb-4 js-unsubscribe">Unsubscribe</a>
      </div>
    `;
    userList.appendChild(user);
  }
}

// Instance
const userStorage = new Storage('User');
const jobStorage = new Storage('Jobs');
const subscribeManager = new SubscribeManager();
const jobManager = new JobManager();

// Helpers
const createUser = function(name, job) { 
  return new User(name, job) 
};

const currentUser = () => {
  const user = userStorage.getItem();

  return {
    name: user[0].name,
    job: user[0].job
  }
};

// Events
const profile = document.querySelector('.js-user-profile');
const signup = document.querySelector('.js-signup');
const newJobBtn = document.querySelector('.js-new-job');

profile.addEventListener('click', (e) => {
  const user = currentUser();
  const newUser = createUser(user.name, user.job);

  if (e.target.classList.contains('js-subscribe')) {
    subscribeManager.subscribe(newUser);
  } else if (e.target.classList.contains('js-unsubscribe')) {
    subscribeManager.unsubscribe(newUser);
  }
});

signup.addEventListener('click', (e) => {
  e.preventDefault();

  const name = document.querySelector('#name').value;
  const job = document.querySelector('#job').value;
  const userList = userStorage.getItem();

  if (!userList.some(e => e.name === name)) {
    const newUser = createUser(name, job);
    
    User.renderProfile(name, job);
    userStorage.addItem(newUser);
  }
});

newJobBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  const newJob = document.querySelector('#job').value;
  const existingJobs = jobStorage.getItem();

  if (newJob !== '') {
    if(!existingJobs.includes(newJob)) {
      jobManager.addJob(newJob);
      JobManager.renderJob(newJob);
    }
  }
});

window.addEventListener('load', () => {
  const userList = userStorage.getItem();
  const jobList = jobStorage.getItem();

  jobList.forEach(job => {
    JobManager.renderJob(job);
  });

  userList.forEach(user => {
    User.renderProfile(user.name, user.job);
  });
});