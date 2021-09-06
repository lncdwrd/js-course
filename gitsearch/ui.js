class UI {
  constructor() {
    this.profile = document.querySelector('#profile');
    this.repos = document.querySelector('#repos');
  }

  showProfile(user) {
    this.profile.innerHTML = `
      <div class="card card-body my-4">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${user.avatar_url}">
            <div class="d-grid gap-2">
              <a href="${user.html_url}" class="btn btn-primary btn-block" target="_blank">View Profile</a>
            </div>
          </div>

          <div class="col-md-9">
            <span class="badge bg-primary">Public Repos: ${user.public_repos}</span>
            <span class="badge bg-secondary">Public Gists: ${user.public_gists}</span>
            <span class="badge bg-success">Followers: ${user.public_followers}</span>
            <span class="badge bg-warning">Following: ${user.public_following}</span>

            <ul class="list-group mt-4">
              <li class="list-group-item">Company: ${user.company}</li>
              <li class="list-group-item">Website: ${user.blog}</li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member Since: ${user.created_at}</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  showRepos(repos) {
    repos.forEach((repo) => {
      document.querySelector('#repos').innerHTML += `
      <div class="card card-body mb-2">
      <div class="row">
        <div class="col-md-6">
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        </div>
        <div class="col-md-6">
          <span class="badge bg-primary">Stars: ${repo.stargazers_count}</span>
          <span class="badge bg-secondary">Watchers: ${repo.watchers_count}</span>
          <span class="badge bg-success">Forks: ${repo.forks_count}</span>
        </div>
    </div>
  </div>
      `;
    });
  }

  showAlert(message, alertType) {
    const div = document.createElement('div');
    const container = document.querySelector('.searchContainer');
    const search = document.querySelector('.search');
    const alert = document.querySelector('.alert');

    div.appendChild(document.createTextNode(message));
    
    if (alertType === 'danger') {
      div.className = `alert alert-danger`;
    }

    if (!alert) {
      container.insertBefore(div, search);
    } else {
      setTimeout(() => {
        alert.remove();
      }, 3000)
    }
  }

  clearElement(element) {
    const alert = document.querySelector('.alert');

    if (element === 'searchResult') {
      this.profile.innerHTML = ``;
      this.repos.innerHTML = ``;
    } else if (element === 'alert') {
      alert.remove();
    }
  }
}