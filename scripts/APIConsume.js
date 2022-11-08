//APIConsume.js=>file responsible for fetching data from an API and for dynamically displaying the data received.

//IIFE (Immediately Invoked Function Expression) that will fetch all the infos about web dev courses from our hard-coded API.
//Data will be stored in browser's Local Storage. Later on, we're going to access all the infos that we need from there.
(getWebDevCourses = () => {
    fetch("https://getpantry.cloud/apiv1/pantry/92495672-299a-47d5-b068-f84823a67e39/basket/webdev")
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('CodeBuildersFetchWeb', JSON.stringify(data));
        })
        .catch(err => console.log(err));
})();

//IIFE (Immediately Invoked Function Expression) that will fetch all the infos about Java courses from our hard-coded API.
//Data will be stored in browser's Local Storage. Later on, we're going to access all the infos that we need from there.
(getJavaCourses = () => {
    fetch("https://getpantry.cloud/apiv1/pantry/92495672-299a-47d5-b068-f84823a67e39/basket/java")
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('CodeBuildersFetchJava', JSON.stringify(data))
        })
        .catch(error => console.log(error));
})();

//IIFE (Immediately Invoked Function Expression) that will fetch all the infos regarding C# courses from our hard-coded API.
//Data will be stored in browser's Local Storage. Later on, we're going to access all the infos that we need from there.
(getCSharpCourses = () => {
    fetch("https://getpantry.cloud/apiv1/pantry/92495672-299a-47d5-b068-f84823a67e39/basket/c_sharp")
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('CodeBuildersFetchCSharp', JSON.stringify(data))
        })
        .catch(error => console.log(error));
})();

//IIFE (Immediately Invoked Function Expression) that will fetch all the infos regarding C/C++ courses from our hard-coded API.
//Data will be stored in browser's Local Storage. Later on, we're going to access all the infos that we need from there.
(getCLanguagesCourses = () => {
    fetch("https://getpantry.cloud/apiv1/pantry/92495672-299a-47d5-b068-f84823a67e39/basket/c-languages")
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('CodeBuildersFetchCLanguages', JSON.stringify(data))
        })
        .catch(err => console.log(err));
})();

//Storing the data in 4 different JS objects. This will give us more flexibility when it comes to displaying our API-stored infos dynamically.
const receivedData = JSON.parse(localStorage.getItem('CodeBuildersFetchWeb'));
const receivedDataJava = JSON.parse(localStorage.getItem('CodeBuildersFetchJava'));
const receivedDataCSharp = JSON.parse(localStorage.getItem('CodeBuildersFetchCSharp'));
const receivedDataCLanguages = JSON.parse(localStorage.getItem('CodeBuildersFetchCLanguages'));

//Building a card layout that will display details about each course
const buildCard = (courseTitle, language, description, pictureURL, index) => {
    const section = document.querySelectorAll('.courseCardContainer')[index];
    const html = `
  
    <div class="courseCard rounded-3 mt-3 p-1"> 
      <img src='${pictureURL}' class="courseImage d-block m-auto mb-4  mt-1 shadow-lg" alt="Course Image"/>
      <h4 class="courseTitle fontRoboto color-lightBluePalette mb-2 text-center">${courseTitle}</h4>
      <span class="language d-flex justify-content-center align-content-center"><em class="fontRoboto mx-1">Language:</em>
      <img src="${language}" alt="Logo" class="logoLanguage"/>
      </span>
      <p class="paragraph mt-5 fs-6 lh-2 px-3 py-0 fontRoboto color-darkBluePalette">${description}</p>
      <button class="startCourse no-outline d-block color-white rounded-3 shadow-lg fontPTSans m-auto mt-4 mb-3 border-0 fw-bolder p-0 ">Start Course</button>
    </div>`

    section.innerHTML += html;
}

//Function that takes in the array of courses and its index in the section where it's going to be display and renders all the courses for a specific topic
const buildSection = (received, index) => {
    const main = document.querySelector('main');
    const html = `
  <section class="firstSection rounded-5  shadow-lg mt-5 m-auto p-2 mb-4" id=${received.id}>
    <h3 class="h3 subtitle mt-2 text-center mb-4 mx-lg-5 mx-md-3 my-sm-5 fontMonsterrat fw-bolder">${received.title}</h3>
    <img src="${received.image}" class="webDevPresentationImage h-auto mt-4 mb-2 d-block m-auto" alt="Web Dev Presentation"/>
    <p class="paragraph mt-4 fs-6 lh-2 px-3 py-0 fontRoboto color-darkBluePalette">${received.about}</p>
    <p class="paragraph mt-4 fs-6 lh-2 px-3 py-0 fontRoboto color-darkBluePalette">${received.purpose}</p>
    <section class="courseCardContainer d-flex gap-4 mt-4 overflow-scroll"></section>
  `
    main.innerHTML += html;

    received['courses'].map(course => {
        const language = course.language;
        const courseTitle = course.courseTitle;
        const description = course.description;
        const pictureURL = course.pictureURL;
        buildCard(courseTitle, language, description, pictureURL, index);
    });

}

//4 sections, one for each topic of courses will be injected dynamically into the DOM via Javascript.
buildSection(receivedData, 0);
buildSection(receivedDataJava, 1);
buildSection(receivedDataCSharp, 2);
buildSection(receivedDataCLanguages, 3);



