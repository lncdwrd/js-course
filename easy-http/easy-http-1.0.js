function easyHTTP() {
  this.http = new XMLHttpRequest();
}

easyHTTP.prototype.get = function(url, callback) {
  let self = this;

  this.http.open('GET', url, true);
  this.http.onload = function() {
    if (self.http.status === 200) {
      callback(null, self.http.responseText);
    } else {
      callback(`Error: ${self.http.status}`);
    }
  }
  this.http.send();
}

easyHTTP.prototype.post = function(url, data, callback) {
  let self = this;

  this.http.open('POST', url, true);
  this.http.setRequestHeader('Content-type', 'application/json');
  this.http.onload = function() {
    callback(null, self.http.responseText);
  };
  this.http.send(JSON.stringify(data));
}

easyHTTP.prototype.put = function(url, data, callback) {
  let self = this;

  this.http.open('PUT', url, true);
  this.http.setRequestHeader('Content-type', 'application/json');
  this.http.onload = function() {
    callback(null, self.http.responseText);
  };
  this.http.send(JSON.stringify(data));
}

easyHTTP.prototype.delete = function(url, callback) {
  let self = this;

  this.http.open('DELETE', url, true);
  this.http.onload = function() {
    if (self.http.status === 200) {
      callback(null, 'Post Deleted');
    } else {
      callback(`Error: ${self.http.status}`);
    }
  }
  this.http.send();
}