//Slideshow.js->Contains functions and callbacks that will assure the functionality of the carousel/slideshow which can be found on the Courses tab of the webpage.
//DOM Manipulation
const slide1 = document.querySelector('.manual1');
const slide2 = document.querySelector('.manual2');
const slide3 = document.querySelector('.manual3');
const slide4 = document.querySelector('.manual4');
const manuals = document.querySelectorAll('.manual');
const radioButtons = document.querySelectorAll('.radio');
const slides = document.querySelectorAll('.slide');
const subtitle1 = document.querySelector('.subtitle1');
const enroll = document.querySelector('.enroll');
const prompts = ["Your career in <span> web development</span> starts here.", "Mastering <span>Java</span> programming", ".NET Ecosystem with <span>C#</span>", "<span>C/C++</span> in Embedded Systems"];
subtitle1.innerHTML = prompts[0];
let counter = 1;
let prevCounter = counter;
const locations = ["#web", "#java", "#csharp", "#c/c++"];
const navigator = document.querySelector('.navigator');
const mainSections = document.querySelectorAll('.firstSection');

navigator.href=locations[0];

//Progressively increase the opacity of an HTML element with a given durations (milliseconds)
const increaseTheOpacity = (element, duration) => {
    let opArray = ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7"];
    let x = 0;
    (next = () => {
        element.style.opacity = opArray[x];
        if (x++ < opArray.length) {
            setTimeout(next, duration);
        }
    })();
}

//Function used to apply the scale animation effect on the slideshow's headings
const animateSubtitle = () => {
    increaseTheOpacity(subtitle1, 50);
    subtitle1.style.transform = `scale(0.8)`;
}

animateSubtitle();

//Styling the current slide indicator when the user clicks/taps on it.
radioButtons.forEach((button, index) => {
    button.addEventListener('focus', () => {
        slides[index].style.backgroundColor = '#2b4967';
    })
});

//Erase all backgrounds for the slideshow indicators
const eraseAll = () => {
    for (let i = 0; i < 4; i++) {
        manuals[i].style.backgroundColor = 'transparent';
    }
}

//Styles only one tile indicator for the slideshow
const styleSpecificTile = (index) => {
    manuals[index].style.backgroundColor = '#2b4967';
}

//Automatic slide handler
setInterval(() => {
    eraseAll();
    setTimeout(() => {
    }, 200);
    navigator.href = locations[counter - 1];
    slides[0].style.marginLeft = `${(counter - 1) * (-20)}% `;
    subtitle1.innerHTML = prompts[counter - 1];
    styleSpecificTile(counter - 1);
    counter++;

    if (counter === 5) {
        counter = 1;
        eraseAll();
    }
}, 5000);

//Manual slide handlers, one for each slide
slide1.addEventListener('click', () => {
    animateSubtitle();
    slides[0].style.marginLeft = '0';
    eraseAll();
    styleSpecificTile(0);
    subtitle1.innerHTML = prompts[0];
    counter = 1;
  navigator.href=locations[counter-1];
})

slide2.addEventListener('click', () => {
    animateSubtitle();
    slides[0].style.marginLeft = '-20%';
    eraseAll();
    styleSpecificTile(1);
    subtitle1.innerHTML = prompts[1];
    counter = 2;
  navigator.href=locations[counter-1];
});

slide3.addEventListener('click', () => {
    animateSubtitle();
    slides[0].style.marginLeft = '-40%';
    eraseAll();
    styleSpecificTile(2);
    subtitle1.innerHTML = prompts[2];
    counter = 3;
  navigator.href=locations[counter-1];
});

slide4.addEventListener('click', () => {
    animateSubtitle();
    slides[0].style.marginLeft = '-60%';
    eraseAll();
    styleSpecificTile(3);
    subtitle1.innerHTML = prompts[3];
    counter = 4;
    navigator.href=locations[counter-1];
})


