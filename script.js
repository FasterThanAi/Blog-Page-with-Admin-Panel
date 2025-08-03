// Shared storage using localStorage
const getPosts = () => JSON.parse(localStorage.getItem('posts') || '[]');
const setPosts = (posts) => localStorage.setItem('posts', JSON.stringify(posts));

function renderBlog() {
  const posts = getPosts();
  const container = document.getElementById('blog-posts');
  if (container) {
    container.innerHTML = '';
    posts.forEach((post, index) => {
      container.innerHTML += `
        <div class="blog-post">
          <h2>${post.title}</h2>
          <p>${post.content}</p>
        </div>`;
    });
  }
}

function renderAdmin() {
  const posts = getPosts();
  const container = document.getElementById('admin-posts');
  if (container) {
    container.innerHTML = '';
    posts.forEach((post, index) => {
      container.innerHTML += `
        <div class="blog-post">
          <h2>${post.title}</h2>
          <p>${post.content}</p>
          <button class="delete-btn" onclick="deletePost(${index})">Delete</button>
        </div>`;
    });
  }
}

function deletePost(index) {
  const posts = getPosts();
  posts.splice(index, 1);
  setPosts(posts);
  renderAdmin();
}

// Add post
document.getElementById('post-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  if (title && content) {
    const posts = getPosts();
    posts.unshift({ title, content });
    setPosts(posts);
    e.target.reset();
    renderAdmin();
  }
});

// Run appropriate renderer
window.onload = () => {
  renderBlog();
  renderAdmin();
};
