let search = document.querySelector(".bx");
let city = document.querySelector("input");
let displayCity = document.querySelector(".tempAt>p:nth-child(2)");
let temperature = document.querySelector(".de");
let icon = document.querySelector(".icon>img");
let invalidInput = document.querySelector(".cannotGetData");
let tempClass = document.querySelector(".temp");
let detailClass = document.querySelector(".detail");

let iconArray = ["https://cdn-icons-png.freepik.com/512/5570/5570141.png","https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png","https://static-00.iconduck.com/assets.00/sun-symbol-emoji-2048x2048-wityey4r.png"];

function display(dataObj) {
  temperature.textContent = dataObj.temp;
  displayCity.textContent = dataObj.cityName;
  if(dataObj.temp <= 10) icon.src = iconArray[0];
  else if(dataObj.temp > 10 && dataObj.temp <= 32) icon.src = iconArray[1];
  else if(dataObj.temp > 32) icon.src = iconArray[2];
}

function getCityDetail() {
  return(
    fetch(`https://api.weatherapi.com/v1/current.json?key=a45249a2da1b44eeb5a104520242203&q=${city.value}`)
      .then(resp => {
          if(!resp.ok) {
            console.log("Cannot find data");
            return false;
          }else{
            return resp.json();
          }
        })
      .then(data => data.current)
      .catch(error => console.log(error))
  );
}

async function requiredData() {
  let data = await getCityDetail();

  if(data) {
    let obj = {
      temp:data.temp_c,
      cityName:city.value,
      icon:data.condition.icon,
    };
    
    tempClass.style.display = "inline-flex";
    detailClass.style.display = "flex";
    invalidInput.style.display = "none";
    display(obj);
  }else{
    tempClass.style.display = "none";
    detailClass.style.display = "none";
    invalidInput.style.display = "block";
  }
}

search.addEventListener("click", () => {
  requiredData();
})
city.addEventListener("keydown",(e) => {
  if(e.key === "Enter") {
    e.preventDefault();
    requiredData();
  }
})

