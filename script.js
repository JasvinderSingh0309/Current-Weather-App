let search = document.querySelector(".bx");
let city = document.querySelector("input");
let displayCity = document.querySelector(".tempAt>p:nth-child(2)");
let temperature = document.querySelector(".de");
let icon = document.querySelector(".icon>img");

function display(dataObj) {
  temperature.textContent = dataObj.temp;
  displayCity.textContent = dataObj.cityName;
  icon.src = dataObj.icon;
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
    display(obj);
  }else{
    display({temp:0, cityName:"Wrong Name", icon:icon.src});
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