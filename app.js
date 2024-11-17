const BASE_URL = `https://v6.exchangerate-api.com/v6/c0e0b3148dc3a0cb9412cfcb/pair`;
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(" form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

for (let select of dropdown) {
    for (currencycode in countryList) {
        //   console.log(code, countryList[code]);  
        let newoption = document.createElement("option");
        newoption.innerHTML = currencycode;
        newoption.value = currencycode;

        if (select.name === "from" && currencycode === "USD") {
            newoption.selected = "selected";
        }
        else if (select.name === "to" && currencycode === "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);

    }
    // flag update 
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
}

const updateflag = (element) => {
    // console.log(element);
    let currencycode = element.value;
    // console.log(currencycode);
    let countrycode = countryList[currencycode];
    // console.log(countrycode);
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
    //  console.log(img.src);
}
// button 
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input"); // to get amount
    let amtval = amount.value;
    // console.log(amount.value);

    if (amtval == "" || amtval < 0) { // to check value if value is not empty and minus value
        amtval = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value}/${toCurr.value}`;
    let data = await fetch(URL);
    let finaldata = await data.json();
    // console.log(finaldata);
    let rate = finaldata["conversion_rate"];
    // console.log(rate);

    let finalAmount = parseInt(rate) * parseInt(amtval);
  //  msg.innerText = finalAmount;

    msg.innerHTML= `${amtval} ${fromCurr.value}` +"="+ `${finalAmount} ${toCurr.value}`
   // alert(finalAmount);
}