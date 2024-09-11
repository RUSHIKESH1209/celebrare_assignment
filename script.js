let input = document.querySelector(".input");
let addbutton = document.querySelector(".addbutton");
let board = document.querySelector(".board");
let Bold = document.querySelector(".bold");
let Italic = document.querySelector(".italic");
let Underline = document.querySelector(".underline");
let Undo = document.querySelector(".undo");
let Redo = document.querySelector(".redo");
let templateblocks;
let templateblock;

let addtemp = () => {
  let templateblock_content = input.value;
  templateblock = document.createElement("div");
  templateblock.textContent = templateblock_content;
  templateblock.classList.add("templateblock");
  templateblock.style.left = "0px";
  templateblock.style.top = "0px";
  board.appendChild(templateblock);
  input.value = "";

  move();
};

addbutton.addEventListener("click", () => {
  if (input.value != "") {
    addtemp();
  }
});

let choose_element = null;

const move = function () {
  templateblocks = document.querySelectorAll(".templateblock");

  templateblocks.forEach((templateblock) => {
    templateblock.addEventListener("mousedown", (e) => {
      choose_element = templateblock;
      let offsetX = e.clientX - templateblock.offsetLeft;
      let offsetY = e.clientY - templateblock.offsetTop;

      document.onmousemove = (e) => {
        if (choose_element) {
          let x = e.pageX - offsetX;
          let y = e.pageY - offsetY;
          choose_element.style.left = x + "px";
          choose_element.style.top = y + "px";
        }
      };
    });
  });

  document.onmouseup = function () {
    choose_element = null;
  };
};

Underline.addEventListener("click", () => {
   if (templateblock.style.textDecoration === "underline") {
     templateblock.style.textDecoration = "none";
   } else {
     templateblock.style.textDecoration = "underline";
   }
 });

 
Bold.addEventListener("click", () => {
   if (templateblock.style.fontWeight === "bold") {
     templateblock.style.fontWeight = "normal";
   } else {
     templateblock.style.fontWeight = "bold";
   }
 });
 

 Italic.addEventListener("click", () => {
   if (templateblock.style.fontStyle === "italic") {
     templateblock.style.fontStyle = "normal";
   } else {
     templateblock.style.fontStyle = "italic";
   }
 });
 

let removedBlocks = []; 

Undo.addEventListener("click", () => {
  if (board.lastChild) {
    removedBlocks.push(board.lastChild);
    board.removeChild(board.lastChild);
  }
});

Redo.addEventListener("click", () => {
  if (removedBlocks.length > 0) {
    let lastRemovedBlock = removedBlocks.pop(); 
    board.appendChild(lastRemovedBlock);      
  }
});



const returnFont = async () => {
   try {
       const response = await fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCoxMv-BvE6EK3sf2QXT0SyFmcueH5v3sQ");
       const data = await response.json();
       const selectElement = document.getElementById('font-select');

       selectElement.innerHTML = '<option value="">Select a font</option>';
       data.items.forEach(font => {
           const option = document.createElement('option');
           option.value = font.family;
           option.textContent = font.family;
           selectElement.appendChild(option);
       });

       selectElement.addEventListener('change', (event) => {
           const selectedFont = event.target.value;

           if (selectedFont) {
               const stylesheetId = `font-style-${selectedFont.replace(/\s+/g, '-')}`;
               
               let link = document.getElementById(stylesheetId);
               if (!link) {
                   link = document.createElement('link');
                   link.id = stylesheetId;
                   link.rel = 'stylesheet';
                   link.href = `https://fonts.googleapis.com/css?family=${selectedFont.replace(/\s+/g, '+')}`;
                   document.head.appendChild(link);
               }

               templateblock.style.fontFamily = selectedFont;

           } else {
               templateblock.style.fontFamily = '';
               
           }
       });

   } catch (error) {
       console.error('Error fetching fonts:', error);
   }
}

returnFont();

document.getElementById('fontsize').addEventListener('change', function() {
   var selectedSize = this.value;
   console.log(selectedSize)
   var textDiv=templateblock
   if (selectedSize) {
       textDiv.style.fontSize = selectedSize + 'px';
   } else {
       textDiv.style.fontSize = '';
   }
});