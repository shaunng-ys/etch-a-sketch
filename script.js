/*
  1) A grid of 16x16 equally sized squares is set up to fill the screen (screen width or height is
    the maximum constraint)
  2) If the user clicks the resize button at the top right of the screen a prompt will show up
    asking for the desired number of grids, up to 100 x 100. In which case, user would type in 100
  3) After typing in the desired number of grids, the screen will change to show that number of
    grids
  4) After which the user can move the cursor around to fill the individual grids with color
*/

const resizeButton = document.querySelector("#grid-button");
const clearButton = document.querySelector("#clear-button");
const gridSize = document.querySelector("#current-size");
const grid = document.querySelector("#grid-container");
let size = 16;
let i = 0;
let j = 0;
let fullWidth = document.documentElement.clientWidth;
let fullHeight = document.documentElement.clientHeight;
let baseDimensions;
let mouseIsDown;

//List of some catppuccin colors
const colorsList = [`rgb(245, 224, 220)`, `rgb(242, 205, 205)`, `rgb(245, 194, 231)`,
`rgb(203, 166, 247)`, `rgb(243, 139, 168)`, `rgb(235, 160, 172)`, `rgb(250, 179, 135)`,
`rgb(249, 226, 175)`, `rgb(166, 227, 161)`, `rgb(148, 226, 213)`, `rgb(137, 220, 235)`,
`rgb(116, 199, 236)`, `rgb(137, 180, 250)`, `rgb(180, 190, 254)`];

if (fullWidth <= fullHeight) {
  baseDimensions = fullWidth;
} else {baseDimensions = fullHeight};

grid.onmousedown = () => mouseIsDown = true;
grid.onmouseup = () => mouseIsDown = false;
//document.body.style.cursor = "pointer";
function getCatppuccin() {
  const randomColor = colorsList[Math.floor(Math.random() * colorsList.length)];
  return (randomColor);
}

function getRgb () {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return (`rgb(${r}, ${g}, ${b})`);
}

function initialiseGrid (num) {
  gridSize.textContent = `${num} x ${num}`;
  //This for loop is for creating a single line each iteration
  for (i = 0; i < num; i++) {
    const row = document.createElement("div");
    row.style.display = "flex";
    //row.style.height = row.offsetWidth;
    grid.appendChild(row);
    for (j = 0; j < num; j++) {
      const box = document.createElement("div");
      row.appendChild(box);
      box.style.width = `${baseDimensions / num}px`;
      box.style.height = `${baseDimensions / num}px`;
      box.style.backgroundColor = `white`;
      box.style.border = "1px solid black";
      box.addEventListener("mouseenter", () => {
      if (mouseIsDown == true) {
        if (box.style.backgroundColor == `white`) {
          box.style.backgroundColor = getCatppuccin();
          //box.style.backgroundColor = getRgb();
          box.style.opacity = "0.1";
        } else if (box.style.opacity < 1.0) {
          box.style.opacity = `${parseFloat(box.style.opacity) + 0.1}`;
        };
      }});
      box.addEventListener("click", () => {
        if (box.style.backgroundColor == `white`) {
          box.style.backgroundColor = getCatppuccin();
          //box.style.backgroundColor = getRgb();
          box.style.opacity = "0.1";
        } else if (box.style.opacity < 1.0) {
          box.style.opacity = `${parseFloat(box.style.opacity) + 0.1}`;
        };
      });
    }
  }
};

initialiseGrid(size);

resizeButton.addEventListener("click", () => {
  size = Number(prompt(`Type in new grid size -
(e.g. typing in 20 yields a grid size of 20x20 squares *Up to a limit of 100`));
  if (size > 100 || size < 1) {
    alert(`Grid size can only be between 1 and 100`);
  } else {
    grid.innerHTML = "";
    initialiseGrid(size);
  };
});

clearButton.addEventListener("click", () => {
  grid.innerHTML = "";
  initialiseGrid(size);
});
