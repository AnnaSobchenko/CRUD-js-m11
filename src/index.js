import './sass/main.scss';

const baseUrl = 'http://localhost:3000';

function reqServer(url) {
  return fetch(baseUrl + url).then(res => res.json());
}
reqServer('/posts').then(data => console.log(data));

const refs = {
  listNode: document.querySelector('.post-list'),
};
console.log(refs.listNode);
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
