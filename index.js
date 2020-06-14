var dotMax,dotMin,tBase;
var dot=document.getElementsByClassName("dot")[0];

// moves dot relative to position
function moveDot(move)
{
  let oldTop = parseInt(window.getComputedStyle(dot).top);
  let newTop =  Math.min(Math.max(oldTop - move, dotMin), dotMax);
  let dotRel = newTop/dotMax;
  dot.style.setProperty("top",dotRel*100 + "%");
  if(newTop <= dotMin)
  {
    window.removeEventListener('wheel', dotEvent);
    window.removeEventListener('touchStart', tStart);
    // window.removeEventListener('touchEnd', tEnd);
    let img = document.createElement("img");
    img.src = "splash.svg";
    img.classList.add("splash");

    let p = dot.parentNode;
    p.appendChild(img);
    p.removeChild(document.getElementsByClassName("welcome")[0]);
    dot.style.setProperty("width", "1px");
    dot.style.setProperty("height", "1px");
    dot.style.setProperty("transition-timing-function", "ease-in");
    dot.style.setProperty("transition-duration", "2s");
    dot.style.setProperty("transition-delay", ".5s");
    dot.style.setProperty("transition-property", "width, height");
    dot.style.setProperty("width", "200vmax");
    dot.style.setProperty("height", "200vmax");
    dotRel = 1;
  }
  dot.style.setProperty("transform", "translate(-50%, -40%) scale("+ Math.pow(dotRel,2) +")");
}

function dotEvent(e)
{
  moveDot(e.deltaY);
}
// (re-)initializes maximas on start and resize
function initMove()
{
  dotMax = document.documentElement.clientHeight;
  dotMin = dotMax*0.32;
}

function tStart(e)
{
  tBase = e.changedTouches[0].pageY;
  window.addEventListener('touchmove', tMove );
}

function tMove(e)
{
  moveDot(tBase - e.changedTouches[0].pageY);
}

window.addEventListener('resize', initMove );
window.addEventListener('wheel', dotEvent );
window.addEventListener('touchstart', tStart );
window.addEventListener('touchend', () => window.removeEventListener('touchmove', tMove ));

initMove();
