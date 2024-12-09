const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if (select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if (select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
         select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateexchangerate= async()=>{
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    
    if(amtval===""||amtval<1){
        amtval=1;
        amount.value="1";
    }
const URL=`${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
let response= await fetch(URL);
let data= await response.json();
let rate=data[tocurr.value.toLowerCase()];
let finalamount=amtval*rate;
msg.innerText=`${amtval} ${fromcurr.value}=${finalamount}${tocurr.value}`;
};

const updateFlag =(element)=>{
 let currCode=element.value;
let countrycode= countryList[currCode];
let newsrc = `https://flagsapi.com/${countrycode}/flag/64.png`;
 let img=element.parentElement.querySelector("img");
 img.scr=newsrc;
};

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updateexchangerate();
    
});
window.addEventListener("load",()=>{
    updateexchangerate();
})