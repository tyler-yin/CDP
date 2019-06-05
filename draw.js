var path;

function onMouseDown(event) {
  if (drawingMode)
    path = new Path();
}

function onMouseDrag(event) {
  if (drawingMode) {
    path.add(event.point);
    path.strokeColor = 'black';
    path.strokeWidth = 1;
    path.strokeCap = 'round';
  }
}

// window.addEventListener('touchstart', (event) => {
//   console.log('touchstart')
//   onMouseDown(event);
// });

// window.addEventListener('touchmove', (event) => {
//   console.log('touchmove')
//   onMouseDrag(event);
// });

// function onMouseUp(event) {

// }

// function touchStarted(event) {
//   if (drawingMode)
//     path = new Path();
// }

// function touchMoved(event) {
//   if (drawingMode) {
//     path.add(event.point);
//     path.strokeColor = 'red';
//     path.strokeWidth = 6;
//     path.strokeCap = 'round';
//   }
// }