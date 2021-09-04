class EasyHTTP {
  async get(url) {
    try {
      const response = await fetch(url);
      const responseData = await response.json();

      this.checkFetch(response);
      return responseData;
    } catch(err) {
      console.log(err);
    }
  }

  async post(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();

      this.checkFetch(response);
      return responseData;
    } catch(err) {
      console.log(err);
    }
  }

  async put(url, data) {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();

      this.checkFetch(response);
      return responseData;
    } catch(err) {
      console.log(err);
    }
  }

  async delete(url) {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
      });
      const responseData = await 'Resource Deleted';

      this.checkFetch(response);
      return responseData;
    } catch(err) {
      console.log(err);
    }
  }

  checkFetch(res) {
    if (!res.ok) {
      throw Error(`${res.status}`);
    }
    return res;
  }

  processRequest(res) {
    return new Promise((resolve, reject) => {
      resolve(res);
    })
  }
}
