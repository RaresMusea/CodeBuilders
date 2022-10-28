//DOM Manipulation
const path = window.location.pathname;
const page = path.split("/").pop();
let navBarList = document.querySelector('.untoggled');
let hamburgerButton = document.getElementById('hamburgerMenu');
const navbar = document.querySelector('nav');
let navbarHeight = navbar.offsetHeight;
const initialNavbarHeight = navbarHeight;
const arr = ["Software Engineering", "Computer Programming", "Video Games Development", "Frontend Web Development", "Backend Web Development", "Cloud Computing", "Web Applications", "DevOps", "Mobile development", "Machine Learning", "Embedded Systems Industry", "Networking"];
const secondArr = ["easy", "nice", "undemanding", "challenging", "relaxed", "peaceful", "facile", "straightforward", "clear", "proper", "straight", "logical", "various", "different", "free"];
const highlight = document.querySelector('.highlightedText');
const synonym = document.getElementById('synonyms');
const links = document.querySelector('.socialButton');
const linksHeight = links.offsetHeight;
const iconsContainer = document.querySelector('.socialIcons');
const icons = document.querySelectorAll('.socialIcon');
icons[0].id='firstIcon';



//Responsive behaviour only: Appends the navbar when the hamburger button is triggered.
hamburgerButton.addEventListener('click', () => {
    if (navBarList.classList.contains('untoggled')) {
        if (page === 'courses.html') {
            document.querySelector('.insideSlideShow').style.display = 'none';
            document.querySelector('.enroll').style.display = 'none';
        }
        navbarHeight = initialNavbarHeight + 190;
        navbar.style.height = navbarHeight + `px`;
        console.log(navbar.offsetHeight);
        navBarList.classList.add('toggled');
        navBarList.classList.remove('untoggled');
        hamburgerButton.src = 'images/x.svg';

    } else {
        if (page === 'courses.html') {
            document.querySelector('.insideSlideShow').style.display = 'block';
            document.querySelector('.enroll').style.display = 'block';
        }
        navbar.style.height = initialNavbarHeight + `px`;
        navBarList.classList.add('untoggled');
        navBarList.classList.remove('toggled');
        navbar.style.paddingBottom = '4em';
        hamburgerButton.src = 'images/menu.svg';
        console.log(navbar.offsetHeight);
    }
})

//Dynamically change the IT domain from the homepage title at a time
const changeContext = () => {
    let previousRandomlyGenerated = arr[Math.floor(Math.random() * arr.length)];
    let currentRandomlyGenerated;
    highlight.innerHTML = arr[previousRandomlyGenerated];
    currentRandomlyGenerated = Math.floor(Math.random() * arr.length);

    if (currentRandomlyGenerated !== previousRandomlyGenerated) {
        highlight.innerHTML = arr[currentRandomlyGenerated];
        previousRandomlyGenerated = currentRandomlyGenerated;
    }
};

//Dynamically change the adjective found in the title of the second section from the homepage
const changeAdjective = () => {
    let previousRandomlyGenerated = arr[Math.floor(Math.random() * arr.length)];
    let currentRandomlyGenerated;
    synonym.innerHTML = secondArr[previousRandomlyGenerated];
    currentRandomlyGenerated = Math.floor(Math.random() * arr.length);

    if (currentRandomlyGenerated !== previousRandomlyGenerated) {
        synonym.innerHTML = secondArr[currentRandomlyGenerated];
        previousRandomlyGenerated = currentRandomlyGenerated;
    }
};

//The above functions will get called only on the homepage, because the index.html file is the only file in the project where we can find those DOM nodes.
if (page === 'index.html') {
    window.setInterval(changeContext, 2500);
    window.setInterval(changeAdjective, 2500);
}

//Increase the opacity of a given element giving it a fade in animation
const increaseOpacity = (element) => {
    setTimeout(() => element.style.opacity = `100`, 1000);
}

//Decrease the opacity of a given HTML element giving it a fade out animation
const decreaseOpacity = (element) => {
    setTimeout(() => element.style.opacity = `0`, 10);
}

//Handler for the social hrefs container. Dynamically increase or decrease the height of that container depending on its state
links.addEventListener('click', () => {
    if (links.classList.contains('disabled')) {
        links.classList.remove('disabled');
        links.classList.add('enable');
        iconsContainer.style.display = 'block';
        icons.forEach(elem => increaseOpacity(elem));
        links.style.height = `${links.offsetHeight + 180}px`;
        return;
    }
    if (links.classList.contains('enable')) {
        links.classList.add('disabled');
        links.classList.remove('enable');
        icons.forEach(elem => decreaseOpacity(elem));
        setTimeout(() => links.style.height = `${linksHeight}px`, 400);
    }
})

