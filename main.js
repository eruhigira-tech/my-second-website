
let currentStep = 0;
const steps = document.querySelectorAll(".step");
const progress = document.getElementById("progress");

document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("greetModal");
    if (modal) modal.style.display = "block";

    loadProfileData();
    setupAccordion();
});

function nextStep() {
    if (!steps.length) return;

   
    const currentInputs = steps[currentStep].querySelectorAll("input, textarea");
    let allValid = true;

    currentInputs.forEach(input => {
        if (!input.checkValidity() || input.value.trim() === "") {
            allValid = false;
        }
    });

    if (!allValid) {
        alert("Please fill in all required fields correctly before continuing!");
        const firstInvalid = steps[currentStep].querySelector(":invalid");
        if (firstInvalid) firstInvalid.focus();
        return; 
    }

 
    steps[currentStep].classList.remove("active");
    currentStep++;

    if (currentStep >= steps.length) currentStep = steps.length - 1;

    steps[currentStep].classList.add("active");
    updateProgress();
}

function updateProgress() {
    if (!progress) return;
    const percent = ((currentStep + 1) / steps.length) * 100;
    progress.style.width = percent + "%";
}

function submitModalName() {
    const name = document.getElementById("modalName").value.trim();
    if (name === "") {
        alert("Please enter your name!");
        return;
    }

    document.getElementById("helloName").innerText = "Hello, " + name + "!";

    let hidden = document.getElementById("name");
    if (!hidden) {
        hidden = document.createElement("input");
        hidden.type = "hidden";
        hidden.id = "name";
        document.getElementById("multiStepForm").prepend(hidden);
    }
    hidden.value = name;

    document.getElementById("greetModal").style.display = "none";
}


function addMovie() {
    const container = document.getElementById("moviesContainer");
    const input = document.createElement("input");
    input.type = "text";
    input.className = "movieInput";
    input.placeholder = "Favorite Movie";
    container.appendChild(input);
}

function addSite() {
    const container = document.getElementById("sitesContainer");
    const input = document.createElement("input");
    input.type = "url";
    input.className = "siteInput";
    input.placeholder = "https://example.com";
    container.appendChild(input);
}

function showReview() {
    const review = document.getElementById("reviewContent");
    review.innerHTML = "";

    const name = document.getElementById("name")?.value || "";
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;
    const hobby = document.getElementById("hobby").value;
    const team = document.getElementById("team").value;

    const movies = [...document.querySelectorAll(".movieInput")]
        .map(i => i.value)
        .filter(v => v !== "");

    const sites = [...document.querySelectorAll(".siteInput")]
        .map(i => i.value)
        .filter(v => v !== "");

    review.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Bio:</strong> ${bio}</p>
        <p><strong>Hobby:</strong> ${hobby}</p>
        <p><strong>Team:</strong> ${team}</p>
        <p><strong>Movies:</strong> ${movies.join(", ")}</p>
        <p><strong>Websites:</strong> ${sites.join(", ")}</p>
    `;

    nextStep();
}

function saveUser() {
    const user = {
        name: document.getElementById("name")?.value || "",
        email: document.getElementById("email").value,
        bio: document.getElementById("bio").value,
        hobby: document.getElementById("hobby").value,
        team: document.getElementById("team").value,
        movies: [...document.querySelectorAll(".movieInput")]
            .map(i => i.value)
            .filter(v => v !== ""),
        sites: [...document.querySelectorAll(".siteInput")]
            .map(i => i.value)
            .filter(v => v !== "")
    };

    localStorage.setItem("userProfile", JSON.stringify(user));
    window.location.href = "profile.html";
}

function loadProfileData() {
    const data = localStorage.getItem("userProfile");
    if (!data) return;

    const user = JSON.parse(data);

    const greeting = document.getElementById("greeting");
    if (greeting) greeting.innerText = "Welcome, " + user.name + "!";

    if (document.getElementById("emailDisplay"))
        document.getElementById("emailDisplay").innerText = user.email;

    if (document.getElementById("bioDisplay"))
        document.getElementById("bioDisplay").innerText = user.bio;

    if (document.getElementById("hobbyDisplay"))
        document.getElementById("hobbyDisplay").innerText = user.hobby;

    if (document.getElementById("teamDisplay"))
        document.getElementById("teamDisplay").innerText = user.team;

    const moviesList = document.getElementById("moviesList");
    if (moviesList) {
        moviesList.innerHTML = "";
        user.movies.forEach(movie => {
            const li = document.createElement("li");
            li.innerText = movie;
            moviesList.appendChild(li);
        });
    }

    const sitesList = document.getElementById("sitesList");
    if (sitesList) {
        sitesList.innerHTML = "";
        user.sites.forEach(site => {
            const li = document.createElement("li");
            li.innerText = site;
            sitesList.appendChild(li);
        });
    }
}

function setupAccordion() {
    const buttons = document.querySelectorAll(".accordion-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", function () {
            const content = this.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

function logout() {
    localStorage.removeItem("userProfile");
    window.location.href = "index.html";
}

function refreshPage() {
    location.reload();
}
const themeToggle = document.getElementById("themeToggle");


if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    themeToggle.checked = true;
}


themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
        document.body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark-theme");
        localStorage.setItem("theme", "light");
    }
});