// === COUNTDOWN CLOCK ============
// set date to count down to
const targetDate = new Date("December 20, 2025 15:00:00").getTime();

// update count every second

let x = setInterval(function () {
  // get todays date from time
  let now = new Date().getTime();

  // find difference between now and targetDate
  let waitingTime = targetDate - now;

  // time calculations for days, hours, minutes and seconds
  let days = Math.floor(waitingTime / (1000 * 60 * 60 * 24));
  let hours = Math.floor(
    (waitingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let mins = Math.floor((waitingTime % (1000 * 60 * 60)) / (1000 * 60));
  let secs = Math.floor((waitingTime % (1000 * 60)) / 1000);

  // display the result in the element with id "clock"
  // declare variables for the strings in the output
  let displayDays = "days";
  let displayHours = "hours";
  let displayMins = "minutes";
  let displaySecs = "seconds";

  //change between singular and plural when displaying output
  if (days === 1) {
    displayDays = "day";
  }
  if (hours === 1) {
    displayHours = "hour";
  }
  if (mins === 1) {
    displayMins = "minute";
  }
  if (secs === 1) {
    displaySecs = "second";
  }

  // set display of clock row for larger screens, column for smaller screens
  if (window.innerWidth <= 500) {
    document.getElementById(
      "clock"
    ).innerHTML = `<div>${days} ${displayDays}</div> <div> ${hours} ${displayHours}</div> <div> ${mins} ${displayMins}</div> <div> ${secs} ${displaySecs} </div>`;
  } else {
    document.getElementById(
      "clock"
    ).innerHTML = `${days} ${displayDays}, ${hours} ${displayHours}, ${mins} ${displayMins} and ${secs} ${displaySecs}`;
  }

  // when the countdown is finished write text
  if (waitingTime < 0) {
    clearInterval(x);
    document.getElementById("clock").innerHTML = "LET THE PARTY BEGIN!";
    document.getElementsByTagName("html")[0].style.backgroundImage =
      "url('./images/fireworks.webp";
    document.getElementsByTagName("menu")[0].style.display = "none";
    document.getElementById("message").style.display = "none";
    document.getElementsByTagName("main")[0].innerHTML =
      "<h1>Welcome to the</h1><h1>Ugly Jumper</h1><h1>Christmas Party 2025!</h1>";
  }
}, 1000);

// === MAKE CHANGES BY MONTH ==========
// set current time
let currentTime = new Date();
console.log(currentTime);
// set current month
//let month = 12;
let month = currentTime.getMonth() + 1;

// declare variable for monthly music and write functions for play and pause
let monthlyMusic = document.getElementById("monthly-music");
function playAudio() {
  monthlyMusic.play();
}

function pauseAudio() {
  monthlyMusic.pause();
}

// make changes to content according to month
// declare useful variables
let wholePage = document.getElementsByTagName("html")[0];
let musicSource = document.getElementById("music-source");

if (month === 9) {
  //background image
  wholePage.style.backgroundImage = "url('./images/september.webp')";
  // play september music
  musicSource.src = "/sounds/september.mp3";
} else if (month === 10) {
  //background image
  wholePage.style.backgroundImage = "url('./images/october.webp')";
  // show santa icon
  document.getElementById("october-santa").classList.remove("show");
  // play october music
  musicSource.src = "/sounds/october.mp3";
} else if (month === 11) {
  wholePage.style.backgroundImage =
    "url('./images/background-shopping-list.webp')";
  // show santa icon
  document.getElementById("november-santa").classList.remove("show");
  // play november music
  musicSource.src = "/sounds/november.mp3";
  // media query for background photo on small screens
} else {
  wholePage.style.backgroundImage = "url('./images/menu.webp')";
  musicSource.src = "/sounds/december.mp3";
  // show santa icon
  document.getElementById("december-santa").classList.remove("show");
}

// jQuery show message when clicking the bauble or the santa icon

// message for each month
$(document).ready(function () {
  // message for september
  if (month === 9) {
    $("#message").click(function () {
      console.log("clicked");
      $("#message-sept").toggleClass("show");
    });
    // message for october
  } else if (month === 10) {
    $("#message").click(function () {
      $("#message-oct").toggleClass("show");
    });
    $("#october-santa").click(function () {
      $("#santa-oct").append("<h3>Ho Ho Ho</h3");
    });
    $("#october-santa").mouseleave(function () {
      $("#santa-oct").remove();
    });
    // message for november
  } else if (month === 11) {
    $("#message").click(function () {
      $("#message-nov").toggleClass("show");
    });
    $("#november-santa").click(function () {
      $("#santa-nov").append("<h3>Not long now!</h3");
    });
    $("#november-santa").mouseleave(function () {
      $("#santa-nov").remove();
    });
  } else if (month == 12) {
    // show message, dropdown list and passcode field
    $("#message").click(function () {
      $("#message-dec").removeClass("show");
      $("#dropdown-form").addClass("flex-full-width");
    });
    $("#december-santa").click(function () {
      $("#santa-dec").append("<h3>Ding Dong! Time to Party!</h3");
    });
    $("#december-santa").mouseleave(function () {
      $("#santa-dec").remove();
    });
  }
});

// parcels appearing in December, one each day

let adventDay = currentTime.getDate();

//let adventDay = 11;

// create array of parcels
let parcelContent = [
  [1, "candle-background", "blink"],
  [2, "canes-background", "grow"],
  [3, "snowman-background", "rotate"],
  [4, "bauble-background", "swing"],
  [5, "snowballs-background", "rotate"],
  [6, "star-background", "grow"],
  [7, "christmas-tree-background", "blink"],
  [8, "advent_2-background", "rotate"],
  [9, "glogg-background", "swing"],
  [10, "skier-background", "grow"],
  [11, "skater-background", "rotate"],
  [12, "blue-bauble-background", "swing"],
  [13, "sledging-background", "grow"],
  [14, "halmstar-background", "bounce"],
  [15, "advent_3-background", "blink"],
  [16, "tomtebloss-background", "rotate"],
];
// declare empty array to hold parcels for days that have passed
let publishedParcels = [];

// push content to array for each day that has passed
if (month === 12) {
  for (let i = 0; i < adventDay; i++) {
    publishedParcels.push(parcelContent[i][0]);
  }
}

// function to show a parcel for each day that has passed, add click event and handle what happens when you click a parcel

function showParcels(index) {
  $(document).ready(function () {
    $("#parcel-container").append(
      "<div id='" +
        index +
        "' class='parcel-background'><h2 class='number' id=p" +
        index +
        ">" +
        index +
        "</h2></div>"
    );
    $("#" + index).click(function () {
      $(this)
        .toggleClass(parcelContent[index - 1][1])
        .toggleClass(parcelContent[index - 1][2]);
      $(this).find(".number").remove();
    });
  });
}

// call function to show parcels
publishedParcels.forEach(showParcels);

//  show name of recipient when passcode is entered
// make array of givers and their passcodes
/* let givers = [
  ["cecilia", "7086", "Cecilia", "Elias!"],
  ["lisa-b", "1324", "Lisa", "Thorunn!"],
  ["daniel", "5458", "Daniel", "Lisa Bäckman!"],
  ["anna-d", "2908", "Anna", "Anna Norelius!"],
  ["hannes", "9291", "Hannes", "Maja!"],
  ["kerstin", "8977", "Kerstin", "Cecilia!"],
  ["lisa-e", "6436", "Lisa", "Eva!"],
  ["thorunn", "9865", "Thorunn", "Naomi!"],
  ["eva", "5312", "Eva", "Fredrik!"],
  ["anna-i", "1474", "Anna", "Donnie!"],
  ["fredrik", "7688", "Fredrik", "Anna Isoz!"],
  ["elias", "8689", "Elias", "Patrik!"],
  ["maja", "2353", "Maja", "Viktor!"],
  ["patrik", "8020", "Patrik", "Tom!"],
  ["donnie", "7500", "Donnie", "Lisa Ericsson!"],
  ["tom", "2710", "Tom", "Kerstin!"],
  ["naomi", "4019", "Naomi", "Anna Dadfar!"],
  ["anna-n", "5271", "Anna", "Daniel!"],
  ["viktor", "3740", "Viktor", "Therese!"],
  ["magnus", "1358", "Magnus", "Siimon!"],
  ["siimon", "5336", "Siimon", "Hannes!"],
  ["therese", "4423", "Therese", "Magnus!"],
];

function refreshPage() {
  location.reload();
}

// check that the passcode is correct and if so, reveal name, else message
let input = document.getElementById("code-id");

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("code-btn").click();
  }
});

function showRecipient() {
  $(document).ready(function () {
    $("#select-heading").addClass("show");
    $("#dropdown-form").addClass("show");
  });
  let selectedName = document.getElementById("select-secre-santa").value;
  let currentCode = document.getElementById("code-id").value;
  let announcementText = document.getElementById("announcement");
  console.log(currentCode);
  console.log(givers.length);
  for (let i = 0; i < givers.length; i++) {
    console.log(i);
    if (selectedName === givers[i][0] && currentCode === givers[i][1]) {
      announcementText.innerHTML =
        "<div><h2>Hey there " +
        givers[i][2] +
        "!</h2></div><div><h3>You are the SECRET SANTA to... drumroll please... </h3></div><h2 id='receiver' class='swing'>" +
        givers[i][3] +
        "</h2>";
      break;
    } else if (i === givers.length - 1) {
      announcementText.innerHTML =
        "<div><h3>You seem to have entered the wrong code!</h3></div><div><button type='button' onclick='refreshPage()' class='btn-select'>Try again!</button></div>";
    }
  }
}*/
