var browseMode = true;
var editMode = false;
var drawingMode = false;

var bool = {};
for (let i = 0; i < 101; i++) {
  bool[i] = false;
  console.log(bool[i]);
}

var digestIndexx = false;
var consumeIndexx = false;
var produceIndexx = false;

// TODO: QA MEDIA QUERIES
$(document).ready(() => {

  // Flashing graphic
  $(".number").mousedown(() => {
    $(".flash").fadeIn(80);
  }); 

  $(".number").mouseup(() => {
    $(".flash").fadeOut(80);
  });

  // Index
  if(digestIndexx == true && consumeIndexx == true && produceIndexx == true){
    console.log("yes");
  }

  $(`#digestIndex`).click(()=>{
    $(`#digestIndex`).attr('style', 'background-color: black; color:white; text-shadow: 0px 0px 10px white;');
    digestIndexx = true;
  });

  $(`#consumeIndex`).click(()=>{
    $(`#consumeIndex`).attr('style', 'background-color: black; color:white; text-shadow: 0px 0px 10px white;');
    consumeIndexx=true;
  });

  $(`#produceIndex`).click(()=>{
    $(`#produceIndex`).attr('style', 'background-color: black; color:white; text-shadow: 0px 0px 10px white;');
    produceIndexx=true;
  });
    
  // CDP Anchor links
  for (let i = 0; i < 101; i++) {
    $(`#C1-${i}`).click(()=>{
      $('html, body').animate({
        scrollTop: $(`#tC1-${i}`).offset().top - 30
      }, 500);
      $(`#C1-${i}`).attr('style', 'background-color: black; color: white; text-shadow: 0px 0px 10px white;');
      bool[i] = true;
    });
  }
    
  for (let i = 0; i < 51; i++) {
    $(`#C2-${i}`).click(()=>{
      $('html, body').animate({
        scrollTop: $(`#fC1-${i}`).offset().top - 30
      }, 500);
      $(`#C2-${i}`).attr('style', 'background-color: black; color: white; text-shadow: 0px 0px 10px white;');
      bool[i] = true;
    });
  }
    
  for (let i = 0; i < 51; i++) {
    $(`#C3-${i}`).click(()=>{
      $('html, body').animate({
        scrollTop: $(`#iC1-${i}`).offset().top - 30
      }, 500);
      $(`#C3-${i}`).attr('style', 'background-color: black; color: white; text-shadow: 0px 0px 10px white;');
      bool[i] = true;
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

// Printing function 
function printDoc() {
  window.print();
}

// Scrolling handler functions
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

// Device detecting
function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
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