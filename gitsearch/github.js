class GitHub {
  constructor() {
    this.client_id = '1420457754d04f4b6c89';
    this.client_secret = 'd76cf4a05f66144b7e144b4261a12b7bfffd91d2';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  async getUser(user) {
    try {
      const [ profile, repos ] = await Promise.all([
        fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`).then(response => response.json()),
        fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`).then(response => response.json())
      ]);

      return { profile, repos }
    } catch(err) {
      console.log(err);
    }
  }
}