// GET
const http = new easyHTTP();

http.get('https://jsonplaceholder.typicode.com/posts', function(err, post) {
  if (err){
    console.log(err);
  } else {
    console.log(post);
  }
});

// POST
const data = {
  title: 'Custom Post',
  body: 'This is a custom post'
};

http.post('https://jsonplaceholder.typicode.com/posts', data, function(err, post) {
  if (err) {
    console.log(err);
  } else {
    console.log(post);
  }
});

// PUT
const newData = {
  title: 'Edited Custom Post',
  body: 'This is an edited custom post'
};

http.put('https://jsonplaceholder.typicode.com/posts/1', newData, function(err, post){
  if (err) {
    console.log(err);
  } else {
    console.log(post);
  }
});

// DELETE
http.delete('https://jsonplaceholder.typicode.com/posts/1', function(err, response) {
  if (err){
    console.log(err);
  } else {
    console.log(response);
  }
});