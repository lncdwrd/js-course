class EasyHTTP {
  checkFetch(res) {
    if (!res.ok) {
      throw Error(`${res.status}`);
    }
    return res;
  }

  get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
      .then(this.checkFetch)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
    });
  }

  post(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(this.checkFetch)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
    });
  }

  put(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(this.checkFetch)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
    });
  }

  delete(url) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
      })
      .then(this.checkFetch)
      .then(res => res.json())
      .then(() => resolve('Resource Deleted'))
      .catch(err => reject(err));
    });
  }
}
