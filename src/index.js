import './sass/main.scss';

const baseUrl = 'http://localhost:3000';

function reqServer(url, method = 'GET', data = {}) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };

  if (method !== 'GET' && method !== 'DELETE') {
    options.body = JSON.stringify(data);
  }
  return fetch(baseUrl + url, options).then(res => res.json());
}
reqServer('/posts').then(data => console.log(data));

const refs = {
  listNode: document.querySelector('.post-list'),
  form: document.querySelector('#create-post'),
};

function renderPostList() {
  reqServer('/posts').then(data => {
    const markup = data
      .map(
        post => `<li data-id="${post.id}">
        <h3>${post.title}</h3>
        <p>${post.text}</p>
        <small>${post.author}</small></p></li>`,
      )
      .join('');
    refs.listNode.innerHTML = markup;
  });
}

renderPostList();

refs.form.addEventListener('keydown', e => {
  if (e.code === 'Enter' && e.shiftKey) {
    refs.form.elements;
    const data = {
      text: refs.form.elements.text.value,
      author: refs.form.elements.author.value,
      title: refs.form.elements.title.value,
    };
    reqServer('/posts', 'POST', data).then(data => {
      refs.form.reset();
      renderPostList();
    });
  }
});
