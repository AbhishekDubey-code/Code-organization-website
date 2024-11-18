const postList = document.getElementById("post-list");
const feed = document.getElementById("feed");
const postModal = document.getElementById("create-post-modal");
const closeModal = document.getElementById("close-modal");
const createPostBtn = document.getElementById("create-post-btn");
const createPostForm = document.getElementById("create-post-form");

// Posts Data
let posts = [];

// Show Modal
createPostBtn.addEventListener("click", () => {
    postModal.style.display = "flex";
});

// Close Modal
closeModal.addEventListener("click", () => {
    postModal.style.display = "none";
});

// Handle Post Creation
createPostForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get form data
    const title = document.getElementById("post-title-input").value;
    const code = document.getElementById("post-code-input").value;
    const description = document.getElementById("post-description-input").value;
    const imageInput = document.getElementById("post-image-input");
    let imageUrl = "";

    // Process image if uploaded
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imageUrl = e.target.result;
            addPost(title, code, description, imageUrl);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        addPost(title, code, description, imageUrl);
    }

    // Close modal
    postModal.style.display = "none";
    createPostForm.reset();
});

// Add Post to UI and Data
function addPost(title, code, description, imageUrl) {
    const postId = Date.now(); // Unique ID based on timestamp

    // Store post data
    const post = { id: postId, title, code, description, image: imageUrl };
    posts.push(post);

    // Add to left panel
    const newPostLink = document.createElement("li");
    newPostLink.textContent = title;
    newPostLink.onclick = () => scrollToPost(postId);
    postList.appendChild(newPostLink);

    // Add to feed
    renderPost(post);
}

// Render a single post
function renderPost(post) {
    const newPost = document.createElement("div");
    newPost.className = "post";
    newPost.id = `post-${post.id}`;
    newPost.innerHTML = `
        <h1>${post.title}</h1>
        <pre><code>${escapeHTML(post.code)}</code></pre>
        <p>${post.description}</p>
        ${post.image ? `<img src="${post.image}" alt="Post Image">` : ""}
    `;
    feed.appendChild(newPost);
}

// Scroll to Post in Feed
function scrollToPost(postId) {
    const postElement = document.getElementById(`post-${postId}`);
    postElement.scrollIntoView({ behavior: "smooth" });
}

// Escape HTML to prevent code injection
function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
