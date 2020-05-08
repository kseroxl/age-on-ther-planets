const planetPeriod = new Map();
planetPeriod.set("mercury", 0.2408467);
planetPeriod.set("venus", 0.61519726);
planetPeriod.set("earth", 1.0); //365.25 Earth days, or 31,557,600 seconds
planetPeriod.set("mars", 1.8808158);
planetPeriod.set("jupiter", 11.862615);
planetPeriod.set("saturn", 29.447498);
planetPeriod.set("uranus", 84.016846);
planetPeriod.set("neptune", 164.79132);

const input = document.querySelector("input");
const button = document.querySelector("button");
const smallCircles = document.querySelectorAll(".planet");
let radius = document.querySelector(".container").offsetWidth / 2;
let smallRadius = smallCircles[0].offsetWidth / 2;
const mainPlanet = document.querySelector("#main-planet");
const resultHeader = document.querySelector("#result");

const SECONDS_IN_YEAR = 31557600;
let result;

window.addEventListener(
  "resize",
  function (event) {
    if (window.innerWidth < 600 || window.innerWidth < 400) {
      radius = document.querySelector(".container").offsetWidth / 2;
      smallRadius = smallCircles[0].offsetWidth / 2;
    }
  },
  false
);

function setSize() {
  const angle = [
    0,
    Math.PI / 4,
    Math.PI / 2,
    3 * (Math.PI / 4),
    Math.PI,
    5 * (Math.PI / 4),
    3 * (Math.PI / 2),
    7 * (Math.PI / 4),
    2 * Math.PI,
  ];
  smallCircles.forEach((circle, i) => {
    circle.style.left =
      radius + Math.round(radius * Math.cos(angle[i])) - smallRadius + "px";
    circle.style.top =
      radius + Math.round(radius * Math.sin(angle[i])) - smallRadius + "px";
  });
}

const getAge = () => {
  const planet = mainPlanet.textContent;
  const age = input.value;
  if (!planet || !age) return;
  result = countAge(planet.toLowerCase(), parseInt(age));

  var res = { resultZero: 0.0 };

  anime({
    targets: res,
    resultZero: result,
    easing: "linear",
    round: 2,
    update: function () {
      resultHeader.innerText = `${res.resultZero} years`;
    },
  });
};

input.addEventListener("change", (e) => {
  getAge();
});

setSize();

smallCircles.forEach((circle, i) => {
  circle.style.backgroundImage = `url(icons/planets/${circle.id}.svg)`;

  circle.addEventListener("mouseenter", (e) => {
    mainPlanet.innerText =
      e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1);
    getAge();
  });
});

const countAge = (planet, ageInYears) => {
  return (
    Math.round((ageInYears / planetPeriod.get(planet) + Number.EPSILON) * 100) /
    100
  );
};
