//fetch , load and show category
//create load categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error.message));
};

//create videos category
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

// const cardDemo =

//display video
const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos");
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
    <figure class="h-[200px] relative ">
    <img
      class="w-full h-full object-cover"
      src=${video.thumbnail}
      alt="thumbnail" />
      <p class='absolute text-2xl bg-black rounded p-1 m-1 text-white bottom-2 right-2'>${video.others.posted_date}</p>
  </figure>
  <div class="px-0 py-2 flex gap-2">
       <div>
        <img
      class="w-10 h-10 object-cover rounded-full"
      src=${video.authors[0].profile_picture}
      alt="thumbnail" />
       </div>

       <div>
       <h2 class='font-extrabold text-2xl'>${video.title}</h2>
       <div class="flex gap-2">
        <p class="text-gray-400 italic font-bold">${
          video.authors[0].profile_name
        } </p>
        ${
          video.authors[0].verified === true
            ? `<img class="h-6  w-5 object-cover items-center" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"  />`
            : ""
        }
        
       </div>
       
       <p>${video.others.views} views</p>

       </div>
  </div>
    `;
    videosContainer.append(card);
  });
};

//create display category
const displayCategories = (data) => {
  const categoryContainer = document.getElementById("categories");
  data.forEach((item) => {
    // create a button for each item
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;
    //add button to category container
    categoryContainer.append(button);
    button.style.backgroundColor = "purple";
    button.style.color = "white";
  });
};

loadCategories();
loadVideos();
