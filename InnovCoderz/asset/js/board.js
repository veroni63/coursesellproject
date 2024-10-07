document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("penas");
    const context = canvas.getContext("2d");
    const color = document.getElementById("colorchangelink");
    const border = document.getElementById("borderthick");
    const lineWidthLabel = document.querySelector(".range-value");
    const textlinelabel = document.querySelector(".range-value1");
    const eraserClose = document.getElementById('eraser');
    const drawline = document.getElementById('drawline');
    const addtext1=document.getElementById('addtext1');
    const circleradius=document.getElementById('radius');
    const undoBtn = document.getElementById('undo');
    const redoBtn = document.getElementById('redo');
   const newPageBtn = document.getElementById('newPage');
    const plusBtn=document.getElementById('plus');
    const minusBtn= document.getElementById('minus');
    const drawButton=document.getElementById('square');
    const circlebtn=document.getElementById('circle');
    const addtext= document.getElementById('addtext');
    const savedPagesContainer=document.getElementById('pageSelector');
    const prevPageBtn=document.getElementById('previouspage');
    const nextPageBtn=document.getElementById('nextpage');
    const rectwidth=document.getElementById('squarewidth')
    const rectheight=document.getElementById('squareheight');
    let isEraser = false;
    let isDrawing = false;
    let isrectangle=false;
    let iscircle=false;
    let istext=false;
let isTextActive = false;
let isSquareActive = false;
let isDrawActive = false;
let isDrawcircle = false;
let textElement = [];
let erasers=false;


        undoBtn.addEventListener('click', undo);
    redoBtn.addEventListener('click', redo);


        const state = {
          canvasStates: [],      
          currentCanvasIndex: -1 
      };
      
      const paintCanvas = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
      
          if (state.currentCanvasIndex >= 0) {
              const currentCanvasState = state.canvasStates[state.currentCanvasIndex];
              const img = new Image();
              img.onload = function () {
                  context.drawImage(img, 0, 0);
              };
              img.src = currentCanvasState;
          }
      };
      
      function saveCanvasState() {
          const dataURL = canvas.toDataURL();
          state.canvasStates.length = state.currentCanvasIndex + 1;
          state.canvasStates.push(dataURL);
          state.currentCanvasIndex++;
          paintCanvas();
      }
      
      undoBtn.addEventListener('click', undo);
      redoBtn.addEventListener('click', redo);
      
      function undo() {
          if (state.currentCanvasIndex > 0) {
              state.currentCanvasIndex--;
              paintCanvas();
          }
      }
      
      function redo() {
          if (state.currentCanvasIndex < state.canvasStates.length - 1) {
              state.currentCanvasIndex++;
              paintCanvas();
          }
      }



    border.addEventListener('input', event => {
      const width = event.target.value;
      lineWidthLabel.innerHTML = width;
      isEraser = false;
    });

    addtext.addEventListener('input', event => {
      const width = event.target.value;
      textlinelabel.innerHTML = width;
      isEraser = false;
    });

    drawline.addEventListener('click', event => {
      isrectangle=false;
      isEraser = false;
    });

    


    document.getElementById('saveToImage').addEventListener('click', function () {
      downloadCanvas();
    }, false);
    function downloadCanvas() {
      const dataURLimage = canvas.toDataURL('image/png');
    
      const a = document.createElement('a');
      a.href = dataURLimage;
      a.download = 'Dsol_image.png'; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    eraserClose.addEventListener('click', function () {
      isEraser = true;
    });


    function startDrawing(e) {
      isDrawing = true;
      draw(e);
      saveCanvasState();
    }

    function stopDrawing() {
      
      isDrawing = false;
      context.beginPath();
      saveCanvasState();
    }


    drawline.addEventListener('click', function () {
      setActiveToolsline(false, false, true,false,false);
    });
    
    
    function setActiveToolsline(text, square, draw,circle,eraser) {
      isTextActive = text;
      isSquareActive = square;
      isDrawActive = draw;
      isDrawcircle = circle;
      erasers=eraser;
      console.log(isDrawcircle)
      if (!isSquareActive && isTextActive && !erasers && !isDrawActive && !isDrawcircle) {
        draw(e);
      }
      
    }
    function draw(e) {
      if (!isDrawing) return;

      const x = (e.clientX / window.innerWidth) * canvas.width;
      const y = (e.clientY / window.innerHeight) * canvas.height;

      if (isEraser) {
        var clickCoordinates = getMouseCoordinates(e);
    const eraserSize = 15;
    context.clearRect(clickCoordinates.x, clickCoordinates.y, eraserSize, eraserSize);
    
      } 
      else {
        context.lineWidth = parseFloat(border.value);
        context.lineCap = "round";
        context.strokeStyle = color.value;
        var clickCoordinates = getMouseCoordinates(e);

        if (!context.pathIsStarted) {
          context.beginPath();
          context.moveTo(clickCoordinates.x+20, clickCoordinates.y);
          context.pathIsStarted = true;
        }

        context.lineTo(clickCoordinates.x+20 ,clickCoordinates.y);
        context.stroke();
       
        
      }
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });


//text
let textElements = [];
addtext.addEventListener('click', function () {
  setActiveToolstext(true, false, false,false,false);
});


function setActiveToolstext(text, square, draw,circle,eraser) {
  isTextActive = text;
  isSquareActive = square;
  isDrawActive = draw;
  isDrawcircle = circle;
  erasers=eraser;
  console.log(isDrawcircle)
  if (!isSquareActive && isTextActive && !erasers && !isDrawActive && !isDrawcircle) {
    canvas.addEventListener('click',handleCanvasClick,{ once: true })
  }
  
}
function handleCanvasClick(e) {
  const clickCoordinates = getMouseCoordinates(e);
if(isTextActive){
  const clickedTextElement = getClickedTextElement(clickCoordinates.x, clickCoordinates.y);

  if (clickedTextElement) {
    editTextElement(clickedTextElement);
  } else {
    createTextElement(clickCoordinates.x, clickCoordinates.y);
  }
}
}
function createTextElement(x, y) {
  const inputElement = document.createElement('textarea');
  inputElement.type = 'text';
  inputElement.style.position = 'absolute';
  inputElement.style.left = x + 'px';
  inputElement.style.top = y+520 + 'px';
  inputElement.placeholder = 'Enter text';
  document.body.appendChild(inputElement);
  inputElement.focus();

  inputElement.addEventListener('blur', function () {
    document.body.removeChild(inputElement);
    const userInput = inputElement.value.trim();
    if (userInput !== '') {
      const textsize = parseFloat(addtext1.value);
      const textColor = color.value; 
      addTextElement(x, y, userInput, textsize, textColor);
      
    }
  });
}

function addTextElement(x, y, text, textSize, textColor) {
  const textElement = {
    x: x,
    y: y,
    text: text,
    textSize: textSize,
    textColor: textColor
  };

  textElements.push(textElement);
  drawTextElements();
}

function drawTextElements() {
  textElements.forEach(element => {
    context.font = element.textSize + 'px Arial';
    context.fillStyle = element.textColor;
    context.fillText(element.text, element.x, element.y);
    
  });
}

function getClickedTextElement(x, y) {
  for (let i = textElements.length - 1; i >= 0; i--) {
    const element = textElements[i];
    const textWidth = context.measureText(element.text).width;
    const textHeight = element.textSize;
    
    if (x >= element.x && x <= element.x + textWidth && y >= element.y - textHeight && y <= element.y) {
      return element;
    }
  }
  return null;
}
function editTextElement(clickedTextElement) {
  const inputElement = document.createElement('textarea');
  inputElement.type = 'text';
  inputElement.style.position = 'absolute';
  inputElement.style.left = clickedTextElement.x - 80 + 'px';
  inputElement.style.top = clickedTextElement.y + 480 + 'px';
  inputElement.value = clickedTextElement.text;
  document.body.appendChild(inputElement);
  inputElement.focus();

  inputElement.addEventListener('blur', function () {
    document.body.removeChild(inputElement);
    const userInput = inputElement.value.trim();
    if (userInput !== '') {
      const textWidth = context.measureText(clickedTextElement.text).width;
      const textHeight = clickedTextElement.textSize;

      // Clear the area based on mouse coordinates
      context.clearRect(clickedTextElement.x - 80, clickedTextElement.y - textHeight, textWidth + 160, textHeight + 20);

      clickedTextElement.text = userInput;
      drawTextElements();
       // Redraw all elements, including the edited text
    }
  });
}



function getMouseCoordinates(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

//square


drawButton.addEventListener('click', function () {
  setActiveTools(false, true, false,false,false);
});


function setActiveTools(text, square, draw,circle,eraser) {
  isTextActive = text;
  isSquareActive = square;
  isDrawActive = draw;
  isDrawcircle = circle;
  erasers=eraser;
  console.log(isDrawcircle)
  if (isSquareActive && !isTextActive && !erasers && !isDrawActive && !isDrawcircle) {
    canvas.addEventListener('click', handleSquareClickOnce,  { once: true });
  }
  
}

function clearInput() {
  textElement = []; 
  isTextActive = false;
  isSquareActive = false;
  isDrawActive = false;
  erasers=false;
}

function handleSquareClickOnce(e) {
  var clickCoordinates = getMouseCoordinates1(e);
  console.log('Square clicked at:', clickCoordinates);
  var rewidth=parseFloat(rectwidth.value);
  var reheight=parseFloat(rectheight.value)
  if(isSquareActive){
    clearInput();
      drawSquare(clickCoordinates.x, clickCoordinates.y, rewidth, reheight, color.value);
  }
  }

function drawSquare(x, y, size1, size2, color) {
  context.strokeStyle = color; 
  context.stroke();
  context.strokeRect(x, y, size1, size2);
}


//circle
circlebtn.addEventListener('click', function () {
  setActiveTools1(false, false, false,true,false);

});
function setActiveTools1(text, square, draw,circle,eraser) {
  isTextActive = text;
  isSquareActive = square;
  isDrawActive = draw;
  isDrawcircle = circle;
  erasers=eraser
  if (!isSquareActive && !isTextActive && !erasers && !isDrawActive && isDrawcircle) {
    canvas.addEventListener('click', handleCircleClickOnce, { once: true });

  } 
   
}


function handleCircleClickOnce(e) {
  var clickCoordinates = getMouseCoordinates(e);
  var radiusvalue= parseFloat(circleradius.value);
  if(isDrawcircle){
    clearInput();
  drawCircle(clickCoordinates.x, clickCoordinates.y, radiusvalue, color.value);
  }
}

//circle
function drawCircle(x, y, radius, color) {
  context.strokeStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.stroke();
}

function getMouseCoordinates1(e) {
  var rect = canvas.getBoundingClientRect();
  return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
  };
}

function getMouseCoordinates(e) {
  var rect = canvas.getBoundingClientRect();
  return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
  };
}


//zoom
var zoom = 1.0;
  var zoomMultiplier = 0.9;

  function applyZoom() {
    canvas.style.transform = `scale(${zoom})`;
    canvas.style.height="650px";
    canvas.style.width="100%"
  }

  plusBtn.addEventListener("click", function () {
    zoom /= zoomMultiplier;
    applyZoom();
  });

  minusBtn.addEventListener("click", function () {
    zoom *= zoomMultiplier;
    applyZoom();
  });

  applyZoom();


//new page
let totalPages = 0;
let currentPage = 1;
let savedContent = {};
savedPagesContainer.innerHTML = '1';
let pageValue = 1;

if (savedPagesContainer.children.length === 0) {
  savePage();
}

function createPage(pageNumber) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();

  if (savedContent[pageNumber]) {
    savedPagesContainer.innerHTML = '';
    const img = new Image();
    const savedPage = document.createElement("span");
    img.src = savedContent[pageNumber];  
    savedPage.textContent = `${currentPage}`;

    savedPage.classList.add("saved-page");
    savedPage.addEventListener("click", () => renderSavedPage(totalPages));
    savedPagesContainer.appendChild(savedPage);

    img.onload = () => {
      
      context.drawImage(img, 0, 0);
    };
  } else {
    context.font = "16px Arial";
  }
}

function savePage() {
  const dataURL = canvas.toDataURL();
  savedContent[totalPages] = dataURL;
  savedPagesContainer.innerHTML = '';

  const savedPage = document.createElement("div");
  savedPage.textContent = `${currentPage}`;

  savedPage.classList.add("saved-page");
  savedPage.addEventListener("click", () => renderSavedPage(totalPages));
  savedPagesContainer.appendChild(savedPage);

  totalPages++;
  currentPage = totalPages;
  savedPage.textContent = `${currentPage}`;

  createPage(currentPage);
}

function renderSavedPage(pageNumber) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  if (savedContent[pageNumber]) {
    const img = new Image();
    img.src = savedContent[pageNumber];
    img.onload = () => {
      context.drawImage(img, 0, 0);
    };
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    createPage(currentPage);
  }
}

function nextPage() {
  if (currentPage <= totalPages) {
    currentPage++;
    createPage(currentPage);
  }
}

createPage(totalPages);




newPageBtn.addEventListener("click", savePage);
prevPageBtn.addEventListener("click", prevPage);
nextPageBtn.addEventListener("click", nextPage);

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);
  });
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  