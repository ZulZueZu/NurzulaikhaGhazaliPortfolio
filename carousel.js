
let progress = 50;
let beginX = 0;
let active = 0;
let isDown = false;

const speedWheel = 0.02;
const speedDrag = -0.1;

const getZindex = (array, index) => (
  array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i))
);

/*Items*/
const $items = document.querySelectorAll('.carousel-item');
const $cursors = document.querySelectorAll('.cursor');

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index];
  item.style.setProperty('--zIndex', zIndex);
  item.style.setProperty('--active', (index - active) / $items.length);
  
  // Make sure the title and num are visible
  const title = item.querySelector('.title');
  const num = item.querySelector('.num');
  if (title && num) {
    title.style.visibility = "visible";
    num.style.visibility = "visible";
  }
};

/*Animate*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100));
  active = Math.floor(progress / 100 * ($items.length - 1));
  
  $items.forEach((item, index) => displayItems(item, index, active));
};
animate();

/*Click on Items*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i / $items.length) * 100 + 10;
    animate();
  });
});

/*Handlers*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel;
  progress += wheelProgress;
  animate();
};

const handleMouseMove = e => {
  if (!isDown) return;
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  const mouseProgress = (x - beginX) * speedDrag;
  progress += mouseProgress;
  beginX = x;
  animate();
};

const handleMouseDown = e => {
  isDown = true;
  beginX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
};

const handleMouseUp = () => {
  isDown = false;
};

/*Listeners*/
document.addEventListener('wheel', handleWheel); 
document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('touchstart', handleMouseDown);
document.addEventListener('touchmove', handleMouseMove);
document.addEventListener('touchend', handleMouseUp);
