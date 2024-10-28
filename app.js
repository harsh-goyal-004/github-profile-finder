const form = document.querySelector("form");
let username;
const info = document.querySelector(".info");
const imgContainer = document.querySelector(".img-container");
const result = document.querySelector(".result");

result.style.display = "none";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    username = await event.target[0].value.toLowerCase();
    let response = await fetch(`https://api.github.com/users/${username}`);
    let data = await response.json();
    if (!response.ok) {
      result.style.display = "block";
      imgContainer.innerHTML = `<img src="download.png" loading="lazy"/>`;
      info.innerHTML = `<h2 style="text-align:center">User Not Found</h2>`;
    } else {
      result.style.display = "block";
      let name = data.name;
      let imageSrc = data.avatar_url;
      let bio = data.bio;
      let followers = data.followers;
      let following = data.following;
      let repo = data.public_repos;
      let url = data.html_url;
      imgContainer.innerHTML = `<img src=${imageSrc} loading="lazy" alt="user" />`;
      info.innerHTML = `<p>Name: ${name.toUpperCase() ?? "Not available"}</p>
          <p>Bio: ${bio ?? "Not availale"}</p>
          <p>Followers : ${followers ?? "Not available"}</p>
          <p>Following : ${following ?? "Not available"}</p>
          <p>Public Repositories: ${repo ?? "Not available"}</p>
           <a href="${url}" target="_blank" rel="noopener noreferrer">View profile</a>`;
    }
  } catch (error) {
    result.style.display = "block";
    imgContainer.innerHTML = `<img src="download.png"loading="lazy"/>`;
    info.innerHTML = `<h4 style="text-align:center; color: red;">An error occurred. Please try again later.</h4>`;
  }
});
