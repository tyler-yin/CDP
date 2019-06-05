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