/*
  1) A grid of 16x16 equally sized squares is set up to fill the screen (screen width or height is
    the maximum constraint)
  2) If the user clicks the resize button at the top right of the screen a prompt will show up
    asking for the desired number of grids, up to 100 x 100. In which case, user would type in 100
  3) After typing in the desired number of grids, the screen will change to show that number of
    grids
  4) After which the user can move the cursor around to fill the individual grids with color
*/

const resizeButton = document.querySelector(".buttons");
const gridSize = document.querySelector("#current-size");
const grid = document.querySelector("#grid-container");
let size = 16;
let i = 0;
let j = 0;
let fullWidth = document.documentElement.clientWidth;
let fullHeight = document.documentElement.clientHeight;
let baseDimensions;
let mouseIsDown;

if (fullWidth <= fullHeight) {
  baseDimensions = fullWidth;
} else {baseDimensions = fullHeight};

//console.log(`${fullWidth, fullHeight, baseDimensions}`);
grid.onmousedown = () => mouseIsDown = true;
grid.onmouseup = () => mouseIsDown = false;

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
      box.style.backgroundColor = "white";
      box.style.border = "1px solid black";
      box.addEventListener("mouseenter", () => {
      if (mouseIsDown == true) {
        box.style.backgroundColor = "black";
      }});
    }
  }
};

initialiseGrid(size);

resizeButton.addEventListener("click", (size) => {
  size = Number(prompt(`Type in new grid size -
(e.g. typing in 20 yields a grid size of 20x20 squares *Up to a limit of 100`));
  grid.innerHTML = "";
  initialiseGrid(size);
});
