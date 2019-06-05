var browseMode = true;
var editMode = false;
var drawingMode = false;
// var totalHeight, totalWidth;

var bool = {};
for (let i = 0; i < 101; i++) {
  bool[i] = false;
  console.log(bool[i]);
}

// TODO: QA MEDIA QUERIES
// TODO: remove jQuery if possible
$(document).ready(function() {

 $(".number").mousedown(function(){
     $(".flash").fadeIn(80);
 }); 

$(".number").mouseup(function(){
     $(".flash").fadeOut(80);
 });  
    
  //—————————————————————CONSUME QUOTES ANCHOR————————————————————————————
  for (let i = 0; i < 101; i++) {
    $(`#C1-${i}`).click(()=>{
      $('html, body').animate({
        scrollTop: $(`#tC1-${i}`).offset().top - 30
      }, 500);
      $(`#C1-${i}`).attr('style', 'background-color: black; color:white;');
      bool[i] = true;
      console.log(bool[i]);
    });
  }
    
   for (let i = 0; i < 51; i++) {
    $(`#C2-${i}`).click(()=>{
      $('html, body').animate({
        scrollTop: $(`#fC1-${i}`).offset().top - 30
      }, 500);
      $(`#C2-${i}`).attr('style', 'background-color: black; color:white;');
      bool[i] = true;
      console.log(bool[i]);
    });
  }
    
  for (let i = 0; i < 51; i++) {
    $(`#C3-${i}`).click(()=>{
      $('html, body').animate({
        scrollTop: $(`#iC1-${i}`).offset().top - 30
      }, 500);
      $(`#C3-${i}`).attr('style', 'background-color: black; color:white;');
      bool[i] = true;
      console.log(bool[i]);
    });
  }
    
  $("#arrow").click(() => {
    enableBrowseMode();

    $("#arrow").css("border-bottom", "3px solid black");
    $("body").css("cursor", "url(assets/arrow.png), auto");
    $("#pen, #text").css("border-bottom", "0px solid black");
    $("#textContainer").css("pointer-events", "initial");
    $("#textContainer").attr('contentEditable', false);
  });
  
  $("#text").click(() => {
    enableEditMode();

    $("#text").css("border-bottom", "3px solid black");
    $("body").css("cursor", "url(assets/text.png), auto");
    $("#arrow, #pen").css("border-bottom", "0px solid black");
    $("#textContainer").css("pointer-events", "initial");
    $("#textContainer").attr('contentEditable', true);
  });

  $("#pen").click(() => {
    enableDrawingMode();

    $("#pen").css("border-bottom", "3px solid black");
    $("body").css("cursor", "url(assets/pen.png), auto");
    $("#arrow, #text").css("border-bottom", "0px solid black");
    $("#textContainer").css("pointer-events", "none");
    $("#textContainer").attr('contentEditable', false);
  });

  $("#print").click(printDoc);
});

// Site Mode Handlers
function enableBrowseMode() {
  drawingMode = false;
  browseMode = true;
  editMode = false;
  enableScroll();
  
  if (isMobileDevice()) {
    enableTouchMove();
  }
}

function enableEditMode() {
  drawingMode = false;
  browseMode = false;
  editMode = true;
  enableScroll();

  if (isMobileDevice()) {
    enableTouchMove();
  }
}

function enableDrawingMode() {
  drawingMode = true;
  browseMode = false;
  editMode = false;
  disableScroll();
  
  if (isMobileDevice()) {
    disableTouchMove();
  }
}

// Scrolling Handler Functions
var keys = {37: 1, 38: 1, 39: 1, 40: 1};
  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  // Only disable scrolling on mobile / touch device
  if (isMobileDevice()) {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    document.addEventListener('wheel', preventDefault, {passive: false}); // Disable scrolling in Chrome
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
  }
}

function enableScroll() {
  if (window.removeEventListener)
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
  document.removeEventListener('wheel', preventDefault, {passive: false}); // Enable scrolling in Chrome
  window.onmousewheel = document.onmousewheel = null; 
  window.onwheel = null; 
  window.ontouchmove = null;  
  document.onkeydown = null; 
}

// Print
function printDoc() {
  window.print();
}

// Device Detecting 
function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

// ***NOT IN USE
function isTouchDevice() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query) {
    return window.matchMedia(query).matches;
  }

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join -- https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

// iOS touchmove handling
function disableTouchMove() {
  window.addEventListener('touchmove', touchMoveHandler(event), {passive: false});
  console.log('touchmove disabled');
}

function enableTouchMove() {
  window.removeEventListener('touchmove', touchMoveHandler(event), {passive: false});
  console.log('touchmove enabled');
}

function touchMoveHandler(event) {
  event.preventDefault();
}












// window.addEventListener('touchstart', (event) => {
//   onMouseDown(event);
// });

// window.addEventListener('touchmove', (event) => {
//   onMouseDrag(event);
// });


// // Media Queries
    // var mq = window.matchMedia('(max-width: 600px)'); // 768?
    // onResize(mq);
    // mq.addListener(onResize);

    // function onResize(mq) {
    //   if (mq.matches) {
    //     if (browseMode) enableScroll(); // browseMode on mobile
    //     else disableScroll(); // editModes on mobile
    //   } else {
    //     enableScroll(); // all modes on desktop
    //   }
    // }