
function createUniverse()
{
  var can = document.getElementsByTagName("canvas")[0];
  can.height=document.documentElement.clientHeight;
  can.width=document.documentElement.clientWidth;
  // drawCloud(can);
  drawStars(can);
}

function createStar(cData, width, rand)
{
  let index = (rand)*4;
  for(let i = 0; i < 3; i++)
   cData.data[index++] = Math.floor(Math.random()*55)+200;
  let ra = Math.floor(Math.random()*155)+100;
  cData.data[index]= ra;
  return cData;
}

function drawStars(can)
{
  var ctx = can.getContext("2d");
  var cData = ctx.getImageData(0,0,can.width,can.height);
  var nStars = Math.floor(Math.random()*can.width*can.height/5000)+50;
  for (let i = 0; i < nStars; i++)
  {
    let rand = Math.floor(Math.random()*can.width*can.height);
    cData = createStar(cData, can.width, rand);
  }
  ctx.putImageData(cData,0,0);

}


// cData: image Data of context
// width: width of image Data
// x: x-coord of point
// y: y-coord of point
// k: maximum value to change color
function drawCloudPoint(cData, width, x, y, k){
  k = (k) ? k : 10;
  let index = (x+y*width)*4;
  let parentT = ( y-1 < 0 ) ? false : cData.data[(x+(y-1)*width)*4];
  let parentL = ( x-1 < 0 ) ? false : cData.data[(x-1+y*width)*4];

  if (x-1 < 0) col = .5 * (y-1 < 0) ? Math.floor(Math.random()*255) : parentT;
  else col = .5*parentL;
  col = (y-1 < 0) ? 2*col : col + .5*parentT;

  let rand = (Math.random()-.5)*2*k; // rand value -k<x<k
  // let rand = Math.round(Math.random()*255); // rand value -k<x<k
  // let fCol = Math.round(Math.min( Math.max( .1*rand + .9*col, 0), 255));
  let fCol = Math.round(Math.min( Math.max( rand + col, 0), 255));

  cData.data[index++]=cData.data[index++]=cData.data[index++]=fCol;
  cData.data[index]=255;
  // cData.data.splice(index,4,a,a,a,1);
  return cData;
}

// can: canvas DOM-Element
function drawCloud(can)
{
  var ctx = can.getContext("2d");
  var cData = ctx.getImageData(0,0,can.width,can.height);

  for (let i = 0; i < can.height; i++)
  {
    for(let j = 0; j < can.width; j++) cData = drawCloudPoint(cData,can.width,j,i);
  }
  ctx.putImageData(cData,0,0);
}

window.addEventListener("load", createUniverse);
window.addEventListener("resize", createUniverse);

// max coordinates
// overflow on maxout
//
