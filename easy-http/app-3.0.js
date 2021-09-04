// EasyHTTP 3.0
const http = new EasyHTTP();
const john = {
  name: 'John Doe',
  username: 'johndoe',
  email: 'jdoe@gmail.com'
}

// GET
http.get('https://jsonplaceholder.typicode.com/users')
  .then(data => console.log(data))
  .catch(err => console.log(err));

// POST
http.post('https://jsonplaceholder.typicode.com/users', john)
  .then(data => console.log(data))
  .catch(err => console.log(err));

// PUT
http.put('https://jsonplaceholder.typicode.com/users/1', john)
  .then(data => console.log(data))
  .catch(err => console.log(err));

// DELETE
http.delete('https://jsonplaceholder.typicode.com/users/2')
  .then(data => console.log(data))
  .catch(err => console.log(err));