const alltags = document.querySelectorAll('select');
const icons = document.querySelectorAll(".row i");
const toText = document.querySelector('.to_text');
const exchange = document.querySelector('.exchange');
const inputValue = document.querySelector('.from_text');
const btn = document.querySelector('button');
alltags.forEach((tag,id)=>{
  
    for(const country_code in countries){
        let selected;   
 
    if(id==0 && country_code=='en-GB'){
    selected ='selected';
    }else if(id==1 && country_code=="hi-IN"){
        selected ="selected"; 
    }
        let option =`<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
    tag.insertAdjacentHTML("beforeend",option)
   

}
});

exchange.addEventListener('click',()=>{

    let temptext = inputValue.value;
    let templang = alltags[0].value;
    alltags[0].value =  alltags[1].value;
    alltags[1].value=templang;
        inputValue.value = toText.value;
    toText.value = temptext;
})

btn.addEventListener('click',()=>{
    let text = inputValue.value;
  let   translateFrom = alltags[0].value,
    translateTo = alltags[1].value;
 if(!text){
    alert('Enter text')
    return;
 }
    // toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        console.log(data);
        toText.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
                toText.value = data.translation;
            }
        });
    });
   

});
icons.forEach(icons => {
icons.addEventListener('click',({target})=>{
    if(target.classList.contains('fa-copy')){
   
        if(target.id=='copy_from'){
          navigator.clipboard.writeText(inputValue.value);
        }if(target.id=='copy_to'){
            navigator.clipboard.writeText(toText.value);
        }
    }else{
        let voice;
        if(target.id=='vol_from'){
           voice = new SpeechSynthesisUtterance(inputValue.value);
           voice.lang=alltags[0].value;
        }if(target.id=='vol_to'){
            voice = new SpeechSynthesisUtterance(toText.value);
            voice.lang= alltags[1].value;
        }
        speechSynthesis.speak(voice);
    }


})
})