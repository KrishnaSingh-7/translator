const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("#transfer");
const FromText = document.querySelector("#FromText");
const ToText = document.querySelector("#ToText");
const icons = document.querySelectorAll("img");

selectTag.forEach((tag , id)=>{
  for(const countriesCode in countries){
    let selected ;
    if(id == 0 && countriesCode == "en-GB"){
      selected = "selected";
    }else if(id == 1 && countriesCode == "hi-IN"){
      selected = "selected";
    }
    let option = `<option value="${countriesCode}" ${selected}>${countries[countriesCode]}</option>`;

    tag.insertAdjacentHTML("beforeend",option);
  }
});

translateBtn.addEventListener(("click") , ()=> {
let Text = FromText.value ,
translateFrom = selectTag[0].value,
translateTo = selectTag[1].value

const apiURL = `https://api.mymemory.translated.net/get?q=${Text}!&langpair=${translateFrom}
|${translateTo}`;

fetch(apiURL).then(res => res.json()).then(data => {
  ToText.value = data.responseData.translatedText;
});

});

icons.forEach(icon =>{
  icon.addEventListener( "click" , ({target}) => {
    if(target.classList.contains("copy")){
      // console.log("copy")
      if(target.id == "from"){
        navigator.clipboard.writeText(FromText.value)
      }else{
        navigator.clipboard.writeText(ToText.value)
      }
    }
     else{
     let utterance;
     if(target.id == "from"){
      utterance = new SpeechSynthesisUtterance(FromText.value)
      utterance.lang = selectTag[0].value;
     }else{
      utterance = new SpeechSynthesisUtterance(ToText.value)
      utterance.lang = selectTag[1].value;
     }
     speechSynthesis.speak(utterance);
    }
    });
});








