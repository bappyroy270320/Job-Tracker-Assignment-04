let interViews = [];
let rejected = [];
let currentStatus = "all-btn"; 

const allCardContainer = document.getElementById("allCard-container");
const allFilterSection = document.getElementById("allFilter");
const total = document.getElementById("totalCount");
const interViewCrads = document.getElementById("interviewCount");
const rejectedCards = document.getElementById("rejectCount");
const availableJobsCount = document.getElementById("availableJobsCount");

const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");

// Calculation Function
function culculateCards() {
  const totalJobs = allCardContainer.children.length;


  total.innerText = totalJobs;
  interViewCrads.innerText = interViews.length;
  rejectedCards.innerText = rejected.length;

  let currentDisplayCount = totalJobs;
  if (currentStatus === "interview-btn") {
    currentDisplayCount = interViews.length;
  } else if (currentStatus === "rejected-btn") {
    currentDisplayCount = rejected.length;
  }

  availableJobsCount.innerHTML = `<span id="count" class="font-bold">${currentDisplayCount}</span> of ${totalJobs} jobs`;
}

//  Toggle Button Function
function toggleBtn(id) {
  currentStatus = id;

  // button styles
  allBtn.classList.remove("bg-blue-500", "text-white");
  interviewBtn.classList.remove("bg-blue-500", "text-white");
  rejectedBtn.classList.remove("bg-blue-500", "text-white");
  allBtn.classList.add("bg-white", "text-black");
  interviewBtn.classList.add("bg-white", "text-black");
  rejectedBtn.classList.add("bg-white", "text-black");

  const clickbtn = document.getElementById(id);
  clickbtn.classList.add("bg-blue-500", "text-white");
  clickbtn.classList.remove("bg-white", "text-black");

  if (id === "all-btn") {
    allCardContainer.classList.remove("hidden");
    allFilterSection.classList.add("hidden");
  } else if (id === "interview-btn") {
    allCardContainer.classList.add("hidden");
    allFilterSection.classList.remove("hidden");
    renderInterview();
  } else if (id === "rejected-btn") {
    allCardContainer.classList.add("hidden");
    allFilterSection.classList.remove("hidden");
    renderRejected();
  }

  culculateCards();
}

//  Main Container Click Listener
const mainContainer = document.querySelector("main");
mainContainer.addEventListener("click", function (event) {
  // Delete Button
  if (event.target.classList.contains("btn-delete")) {
    const card = event.target.closest(".card");
    const jobName = card.querySelector(".jobName").innerText;

    card.remove();

    // Remove from filtered arrays
    interViews = interViews.filter((item) => item.jobName !== jobName);
    rejected = rejected.filter((item) => item.jobName !== jobName);

    if (currentStatus === "interview-btn") renderInterview();
    if (currentStatus === "rejected-btn") renderRejected();

    culculateCards();
  }

  // Interview Button
  if (event.target.classList.contains("btn-interview")) {
    const clickedElement = event.target.closest(".card");
    const jobName = clickedElement.querySelector(".jobName").innerText;

    const cardInfo = {
      jobName: jobName,
      jobtitle: clickedElement.querySelector(".jobTitle").innerText,
      time: clickedElement.querySelector(".jobmean").innerText,
      jobThing: clickedElement.querySelector(".jobThing").innerText,
      statusBtn: "Interview",
    };

    const jobExists = interViews.find(
      (item) => item.jobName === cardInfo.jobName,
    );
    if (!jobExists) {
      interViews.push(cardInfo);
    }

    // Remove from rejected
    rejected = rejected.filter((item) => item.jobName !== cardInfo.jobName);
    clickedElement.querySelector(".status").innerText = "Interview";

    if (currentStatus === "interview-btn") renderInterview();
    if (currentStatus === "rejected-btn") renderRejected();

    culculateCards();
  }

  // Rejected Button
  else if (event.target.classList.contains("btn-rejected")) {
    const clickedElement = event.target.closest(".card");
    const jobName = clickedElement.querySelector(".jobName").innerText;

    const cardInfo = {
      jobName: jobName,
      jobtitle: clickedElement.querySelector(".jobTitle").innerText,
      time: clickedElement.querySelector(".jobmean").innerText,
      jobThing: clickedElement.querySelector(".jobThing").innerText,
      statusBtn: "Rejected",
    };

    const jobExists = rejected.find(
      (item) => item.jobName === cardInfo.jobName,
    );
    if (!jobExists) {
      rejected.push(cardInfo);
    }

    // Remove from interview
    interViews = interViews.filter((item) => item.jobName !== cardInfo.jobName);
    clickedElement.querySelector(".status").innerText = "Rejected";

    if (currentStatus === "interview-btn") renderInterview();
    if (currentStatus === "rejected-btn") renderRejected();

    culculateCards();
  }
});

//  Rendering Functions
function renderInterview() {
  allFilterSection.innerHTML = "";
  if (interViews.length === 0) {
    allFilterSection.innerHTML = `
      <div class="bg-white p-5  rounded-lg shadow-md space-y-3 mt-10 card">
      <img class="mx-auto" src="./jobs.png" alt="">
      <h2 class="text-center text-3xl font-bold text-gray-800">No jobs available</h2>
      <p class="text-center text-xl text-gray-600">Check back soon for new job opportunities</p>
    </div>

      `;
    return;
  }

  interViews.forEach((inter) => {
    allFilterSection.appendChild(createCardHTML(inter));
  });
}
//  Render Rejected Function

function renderRejected() {
  allFilterSection.innerHTML = "";
  if (rejected.length === 0) {
    allFilterSection.innerHTML = `
    <div class="bg-white p-5  rounded-lg shadow-md space-y-3 mt-10 card">
      <img class="mx-auto" src="./jobs.png" alt="">
      <h2 class="text-center text-3xl font-bold text-gray-800">No jobs available</h2>
      <p class="text-center text-xl text-gray-600">Check back soon for new job opportunities</p>
    </div>
      `;
    return;
  }

  rejected.forEach((reject) => {
    allFilterSection.appendChild(createCardHTML(reject));
  });
}

function createCardHTML(data) {
  const div = document.createElement("div");
  div.className = "bg-white p-5 rounded-lg shadow-md space-y-3 mt-10 card";
  div.innerHTML = `
    <div class="flex justify-between">
        <div>
            <h3 class="jobName">${data.jobName}</h3>
            <p class="jobTitle text-gray-600">${data.jobtitle}</p>
        </div>
        <div>
            <img class="btn-delete cursor-pointer" src="Trash.png" alt="Delete">
        </div>
    </div>
    <p class=" jobmean text-gray-600">${data.time}</p>
    <button class="status px-6 py-3 bg-gray-200">${data.statusBtn}</button>
    <p class="jobThing">${data.jobThing}</p>
    <div class="flex gap-3">
        <button class="btn-interview px-6 py-2 border border-green-500 text-green-500 font-bold rounded hover:bg-green-50 hover:cursor-pointer">INTERVIEW</button>
        <button class="btn-rejected px-6 py-2 border border-red-500 text-red-500 font-bold rounded hover:bg-red-50 hover:cursor-pointer">REJECTED</button>
    </div>
  `;
  return div;
}
culculateCards();
