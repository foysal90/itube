//fetch , load and show category
//create load categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error.message));
};

const loadSelectedCategory = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // Remove "active" class from all buttons
      const allActiveBtns = document.querySelectorAll(".active");
      allActiveBtns.forEach((btn) => {
        btn.classList.remove("active");
      });
      // Add "active" class to the selected button
      const activeBtn = document.getElementById(`btn-${id}`);

      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

//create videos category
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

//time format
const timeFormat = (time) => {
  const hour = parseInt(time / 3600);
  let remainingSec = time % 3600;
  const minute = parseInt(remainingSec / 60);
  remainingSec %= 60;
  return `${hour} hours ${minute} minutes ${remainingSec} seconds ago`;
};
// const timeFormat = (time) => {
//     const years = Math.floor(time / (3600 * 24 * 365));
//     let remainingTime = time % (3600 * 24 * 365);

//     const months = Math.floor(remainingTime / (3600 * 24 * 30));
//     remainingTime %= (3600 * 24 * 30);

//     const days = Math.floor(remainingTime / (3600 * 24));
//     remainingTime %= (3600 * 24);

//     const hours = Math.floor(remainingTime / 3600);
//     remainingTime %= 3600;

//     const minutes = Math.floor(remainingTime / 60);
//     const seconds = remainingTime % 60;

//     return `${years} year ${months} month ${days} day ${hours} hour ${minutes} minute ${seconds} second ago`;
//   };

//display video
const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos");
  videosContainer.innerHTML = "";
  if (videos.length == 0) {
    videosContainer.classList.remove("grid");
    videosContainer.innerHTML = `
     <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
     <img  src="./assets/Icon.png" alt="data">
     <h2 class="text-5xl font-bold italic text-red-500">No Content Found</h2>
    
     </div>
    `;
    return;
  } else {
    videosContainer.classList.add("grid");
  }

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
      ${
        video.others.posted_date?.length == 0
          ? ""
          : `
         <span class='absolute text-xs  bg-black rounded p-1 m-1 text-white bottom-2 right-2'>${timeFormat(
           video.others.posted_date
         )}</span> 
        `
      }
      
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
    button.classList = "btn category-btn";
    button.innerText = item.category;
    button.id = `btn-${item.category_id}`;
    button.onclick = () => {
      loadSelectedCategory(item.category_id);
    };
    //add button to category container
    categoryContainer.append(button);
    // button.style.backgroundColor = "#451a03";
    // button.style.color = "white";
  });
};

loadCategories();
loadVideos();
