//import { generateText } from "./content.js"

const generateText = (file, language = 'eng') => {
  console.log(file)
  document.body.style.cursor="wait";
  document.getElementById("start").style.cursor="wait";
  Tesseract.recognize(
    file,
    language,
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    console.log(text);
    const para = document.getElementById("text");
    const image = document.getElementsByClassName("image")[0];
    image.innerHTML = `<img id = "selected-image" src = "${file}">`
    para.textContent = text;
  })
}

async function getfile(input){
  if(!input.value){
    console.log("Empty");
    document.getElementById("text").innerText = "No Image Selected";
    const image = document.getElementsByClassName("image")[0];
    image.innerHTML = ``;
  }
  else{
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 4000)
    });
    const img = URL.createObjectURL(input.files[0])
    generateText(img, lang.value);
    let result = await promise;
    if(result){
      document.body.style.cursor="default";
      document.getElementById("start").style.cursor="default";
    }
  }
}

function quit_website(){
  let strconfirm = confirm("Are you sure you want to exit?")
  if(strconfirm == true){
    window.close();
  }
}

const copytext = document.getElementById("copy_icon");
const clearicon = document.getElementById("clear_icon");

copytext.onclick = function copyText(){
  document.execCommand("copy");
}

clearicon.onclick = function clear(){
  let strconfirm = confirm("Are you sure you want to clear the text?")
  if (strconfirm == true){
    document.getElementById("text").innerText = "";
  }
}

const input = document.getElementById("file-1");
const lang = document.getElementById("langsel");
const start = document.getElementById("start");
start.addEventListener("click", ()=>{getfile(input);});

const quit = document.getElementById("cut_icon");
quit.addEventListener("click", ()=>{quit_website();});

