const nav = document.querySelector(".navigation-section");
const openBtn = document.querySelector(".profile-icon");
const closeBtn = document.querySelector(".close-btn");

openBtn.addEventListener("click", () => {
  nav.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  nav.classList.remove("active");
});


const tweetText = document.getElementById("tweetText");
const postBtn = document.getElementById("postTweetBtn");
const feed = document.getElementById("postsFeed");

//default posts
const defaultPosts = [
  {
    text: "Coffee in hand, bugs beware. Time to crush some code. #DeveloperLife",
    image: "./assets/images/post1.jpg",
  }
];


defaultPosts.forEach((p) => {
  feed.append(createPost(p.text, p.image, true));
});

//create post
function createPost(text, image,isDefault) {
  const post = document.createElement("article");
  post.className = "post-card";

  let likeCount = isDefault ? Math.floor(Math.random() * 100) : 0;
  let commentCount = isDefault ? Math.floor(Math.random() * 20) : 0;
  let retweetCount = isDefault ? Math.floor(Math.random() * 50) : 0;

  post.innerHTML = `
    <div class="post-header">
      <div class="tweet-avatar">N</div>

      <div class="post-body">
        <h4>
          Nitesh Gupta <span>@nit_hck · now</span>
        </h4>

        <p>${text}</p>



  
        <!--  Footer Icons (SVG) -->
        <div class="post-footer">

          <!-- Comment -->
          <button class="comment-btn">
            <img src="./assets/icons/comment.svg" />
            <span class="comment-count">${commentCount}</span>
          </button>

          <!-- Retweet -->
          <button class="retweet-btn">
            <img src="./assets/icons/retweet.svg" />
            <span class="retweet-count">${retweetCount}</span>
          </button>

          <!-- Like -->
          <button class="like-btn">
            <img src="./assets/icons/like.svg" class="like-icon" />
            <span class="like-count">${likeCount}</span>
          </button>
        </div>

        <!-- Comment Section -->
        <div class="comment-section">
          <input type="text" placeholder="Write a comment..." />
          <button class="add-comment">Add</button>
          <div class="comment-list"></div>
        </div>
      </div>
    </div>
  `;

  return post;
}
//post new tweet
postBtn.addEventListener("click", () => {
  const text = tweetText.value.trim();
  if (!text) return;

  feed.prepend(createPost(text, "", "", false));
  tweetText.value = "";
});
//footer interactions
feed.addEventListener("click", (e) => {
  const post = e.target.closest(".post-card");
  if (!post) return;
//like
  if (e.target.closest(".like-btn")) {
    const btn = post.querySelector(".like-btn");
    const countEl = post.querySelector(".like-count");
    const icon = post.querySelector(".like-icon");

    let val = parseInt(countEl.textContent);

    if (btn.classList.contains("active")) {
      countEl.textContent = val - 1;
      btn.classList.remove("active");
      icon.src = "./assets/icons/like.svg";
    } else {
      countEl.textContent = val + 1;
      btn.classList.add("active");
      icon.src = "./assets/icons/like-pink.svg";
    }
  }

//retweet
  if (e.target.closest(".retweet-btn")) {
    const btn = post.querySelector(".retweet-btn");
    const countEl = post.querySelector(".retweet-count");

    let val = parseInt(countEl.textContent);

    if (btn.classList.contains("active")) {
      countEl.textContent = val - 1;
      btn.classList.remove("active");
    } else {
      countEl.textContent = val + 1;
      btn.classList.add("active");
    }
  }

 //adding comment
  if (e.target.closest(".add-comment")) {
    const input = post.querySelector(".comment-section input");
    const list = post.querySelector(".comment-list");
    const countEl = post.querySelector(".comment-count");

    if (input.value.trim() === "") return;

    const newComment = document.createElement("p");
    newComment.textContent = input.value;
    list.append(newComment);

    countEl.textContent = parseInt(countEl.textContent) + 1;
    input.value = "";
  }
});



