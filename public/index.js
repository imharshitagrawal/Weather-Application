const getCurrent = () => {

  var weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  let currentTime = new Date();
  let day = weekdays[currentTime.getDay()];

  var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct","Nov", "Dec"];

  var month = months[currentTime.getMonth()];
  var date = currentTime.getDate();

  let hours = currentTime.getHours();
  let mins = currentTime.getMinutes();

  let period = "AM";

  if (hours > 11) {
    period = "PM";
    if (hours > 12) hours -= 12;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }

  return `${day} | ${month} ${date} | ${hours}:${mins}${period}`;

};


async function jscode(){
  const city = document.getElementById("cityname").value;
  console.log(city);
  const currDate = document.getElementById("date");
  currDate.innerHTML = getCurrent();
  var resp = await getWeather(city);
  if(resp.status==200){
    document.getElementsByClassName("location")[0].innerHTML=resp.city+", "+resp.country;
    document.getElementsByClassName("temp")[0].innerHTML=resp.temp+"&deg;C";
    document.getElementsByClassName("tempmin_max")[0].innerHTML="Min "+resp.temp_min+"&deg;C | Max "+resp.temp_max+"&deg;C";
    document.getElementsByClassName("desc")[0].innerHTML=resp.description;
    const imgurl =  "http://openweathermap.org/img/wn/"+resp.icon+"@2x.png";
    document.getElementById("weathercon").innerHTML = "<img src="+imgurl+" alt='' class='weatherimg'>";
    
    document.getElementsByClassName('box')[0].style.display = "block";
    if(resp.description == 'Clear') {
        document.body.style.backgroundImage = "url('clear.jpg')";

    } else if(resp.description == 'Clouds') {

        document.body.style.backgroundImage = "url('cloud.jpg')";

    } else if(resp.description == 'Haze') {

        document.body.style.backgroundImage = "url('cloud.jpg')";

    }     else if(resp.description == 'Rain') {

        document.body.style.backgroundImage = "url('rain.jpg')";

    } else if(resp.description == 'Snow') {

        document.body.style.backgroundImage = "url('snow.jpg')";

    } else if(resp.description == 'Thunderstorm') {

        document.body.style.backgroundImage = "url('thunderstorm.jpg')";

    }

  }
  else
  alert("Something Went Wrong! Please try again");


}

document.getElementById('cityname').addEventListener('keypress', (event) => {

    if(event.keyCode == 13) {

        jscode();

    }

});







async function getWeather(city){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    "city": city,
  });
  var requestOptions = {
    method:'POST',
    headers:myHeaders,
    body:raw,
    redirect:'follow'
  }
  let response = await fetch("http://localhost:3000/getWeather", requestOptions);
  response = await response.json();
  return response;
}
