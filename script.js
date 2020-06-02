var dotMax,dotMin,dotPos
var dot=document.getElementsByClassName("dot")[0];
var dotTrans = window.getComputedStyle(dot).transform;

// sets dot to specific y-coordination
function setDot(yCoord)
{
  let setTop =  Math.min(Math.max(yCoord, dotMin), dotMax);
  dotPos = setTop/dotMax;
  console.log(dotPos);
  dot.style.top = setTop + "px";
}

// moves dot relative to position
function moveDot(move)
{
  let top = parseInt(window.getComputedStyle(dot).top);
  let newTop = top - move;
  setDot(newTop);
}

function resizeDot(pos)
{
  dot.style.transform = dotTrans + " scale("+ pos +")";
}

function dotEvent(e){
  let move = e.deltaY;
  moveDot(move);
  resizeDot(dotPos);
}

// (re-)initializes maximas on start and resize
function initMove()
{
  dotMax = document.documentElement.clientHeight;
  dotMin = document.documentElement.clientHeight*0.32;
  dotPos ? setDot(dotMax*dotPos) : moveDot(0);
}

window.addEventListener('resize', initMove);
window.addEventListener('wheel', dotEvent );

initMove();
