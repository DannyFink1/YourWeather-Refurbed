getWeatherToday("Dornbirn");
getHourData("Dornbirn");



document.getElementById("input").addEventListener('keyup', function(event) {

    let value = document.getElementById("input").value;
    console.log("jop", value[value.length-1]);
    if (event.keyCode === 13) {

        getWeatherToday(value);
        getHourData(value);
        this.blur();
    }
    if (value[value.length-1] == "?")
    {
        value = value.split('?');
        console.log(value);
        getAutocomplete(value);
    }
    
})

document.getElementById("searchIcon").addEventListener('click', function(event) {
    let value = document.getElementById("input").value;
    getWeatherToday(value);
    getHourData(value);
})

document.getElementById("input").addEventListener("keyup", (e)=>{
    let value = document.getElementById("input").value;
  
});

var autocompleteTimeout;

document.getElementById("input").addEventListener("click",(event)=>{
    document.getElementById("autocomplete").style.display= "inline";
});

document.getElementById("input").addEventListener('blur', function(event) {
    autocompleteTimeout = setTimeout(function() {
        document.getElementById("autocomplete").style.display= "none";
    }, 1);
});

document.getElementById("autocomplete").addEventListener('mousedown', function(event) {
    clearTimeout(autocompleteTimeout);
    event.preventDefault();
    document.getElementById("input").blur();
});

document.getElementById("menubtn").addEventListener("click", function(event) {
    document.getElementById("menu").style = "display: inline; right: 0; transition: right 0.3s ease-in-out;";
});

document.addEventListener("click", function(event) {
    var menu = document.getElementById("menu");
    var menubtn = document.getElementById("menubtn");
    if (event.target !== menu && !menu.contains(event.target) && event.target !== menubtn) {
        // Menü schließen
        menu.style = "right: -1000px; transition: right 0.5s ease-in-out;";
    }
});

document.getElementById("close-x").addEventListener("click", function(event) {
    document.getElementById("menu").style = "right: -1000px; transition: right 0.3s ease-in-out;";
})


function getWeatherToday(value){
    fetch('https://api.weatherapi.com/v1/current.json?&key=5fa2dd3419924cd88d871245231710&q=' + value)
    .then(response => response.json())
    .then(response =>{
        console.log("Today", response);
        changeData(response);
    }).catch(error =>{
        alert("Stadt nicht gefunden!");
    })
}

function getHourData(value){
    fetch('http://api.weatherapi.com/v1/history.json?key=5fa2dd3419924cd88d871245231710&q=' + value + "&dt=" + getTodayDateMinus())
    .then(response => response.json())
    .then(response =>{
        console.log("Hourly", response);
        changeHourDate(response);
    })
}

function getWeatherByCoords(lat,lon){
    fetch('https://api.weatherapi.com/v1/current.json?&key=5fa2dd3419924cd88d871245231710&q=' + lat + "," + lon)
    .then(response => response.json())
    .then(response =>{
        console.log("Today through autocomplete", response);
        changeData(response);
    }).catch(error =>{
        alert("Stadt nicht gefunden!");
    })

}

function changeData(data){
    var c = data.current;
    var l = data.location;
    output = "";
    output ='<div class="absolute right-5 top-0 text-[30px] font-black md:hidden">Heute</div>'+
            '<div id="dayanddate" class="flex flex-col items-center text-[40px] font-extrabold self-center">'+
                '<div id="day" class="text-[40px] hidden md:inline">Heute, Do</div>'+
                '<div id="date" class="text-[40px] hidden md:inline">1.12.2023</div>'+
            '</div>'+
            '<div id="place" class="text-[30px] p-4 md:absolute md:left-[10px]">'+
                '<div id="region" class="font-bold">'+ l.region +'</div>'+
                '<div id="city" class="">'+ l.name +'</div>'+
           ' </div>'+
            '<div>'+
                '<div id="prim-inf" class="mt-2 ml-10 relative flex items-center">'+
                   '<div>'+
                        '<div id="temp" class="font-extrabold text-[40px]">'+ c.temp_c +'°</div>'+
                        '<div id="maxmin" class="text-[30px]">8°/16°</div>'+ //Needs Work
                    '</div>'+
                   ' <div id="img" class="absolute right-10 md:right-[5vw]">'+
                        '<img src="'+ c.condition.icon +'" alt="" class=" w-[30vw] md:w-[25vw] max-w-[250px]">'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div id="sec-inf" class="ml-5 md:ml-10 text-[25px] pt-4 pb-6 font-semibold">'+
                '<div id="rain" class="flex items-center ">'+
                    '<img src="./img/rain.png" alt="" class="md:hidden w-[15vw] min-w-[60px] max-w-[60px] mr-4">'+
                    '<div class="">'+
                        '<div class="hidden md:inline">Niederschlag: </div>'+
                        c.precip_mm + " mm/h"+
                    '</div>'+
                '</div>'+
                '<div id="wind" class="flex items-center ">'+
                   ' <img src="./img/wind.png" alt="" class="md:hidden w-[15vw] min-w-[60px] max-w-[60px]  mr-4">'+
                    '<div class="">'+
                        '<div class="hidden md:inline">Wind: </div>'+
                        c.wind_kph + " km/h"+
                   ' </div>'+
                '</div>'+
                '<div id="humidity" class="flex items-center ">'+ 
                    '<img src="./img/humidity.png" alt="" class="md:hidden w-[15vw] min-w-[60px] max-w-[60px]  mr-4">'+
                    '<div class="">'+
                        '<div class="hidden md:inline">Luftfeuchtigkeit: </div>'+
                        c.humidity + "%"+
                    '</div>'+
                '</div>'+
            '</div>';
    document.getElementById("data").innerHTML = output;
}

function changeHourDate(data){
    var c = data.forecast.forecastday[0].hour;
    var l = data.location;
    output = "";
    c.forEach((element, index) =>{
        output += '<div class="bg-[#8ECAE6] h-max w-[100px] m-4 rounded-[10px] border-solid border-black border-[1px] p-1 flex flex-col items-center hover:drop-shadow-lg">'+
        '<div >'+ index +' Uhr</div>'+
        '<div class="font-bold">'+ element.temp_c +'°</div>'+
        '<div><img src="'+ element.condition.icon +'" alt="" class="w-[16vw] max-w-[65px] md:w-[4vw]"></div>'+
        '<div class="text-[15px]">'+ element.humidity +'%</div>'+
        '</div>';
    });
    document.getElementById("hour-list").innerHTML = output;   
}

function getAutocomplete(value){
    
    fetch("https://api.geoapify.com/v1/geocode/autocomplete?text="+ value +"&type=city&format=json&apiKey=2c9b4a0d91734167acac6edcb58a8f41")
        .then(response => response.json())
        .then(result => {
            console.log(result)
            output = "";
            if(result.results.length != 0)
            {
                result.results.forEach((element, index)=>{
                    output += '<div class="py-6 flex items-center w-full border-t border-gray-200 hover:bg-gray-50" id="ac-'+ index +'">'+
                                '<a href="#" class="flex-1">'+
                                    '<div class="text-gray-800 text-base" onclick="getWeatherByCoords('+ element.lat+','+ element.lon +')">'+ element.city + ", " + element.country +'</div>'+
                                '</a>'+
                                '<div>'+
                                    '<a href="https://www.google.at/maps/place/'+ element.city +'+'+ element.country +'" target="_blank">'+
                                        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">'+
                                            '<path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />'+
                                        '</svg>'+
                                    '</a>'+
                                '</div>'+
                               '</div>';
                });
                document.getElementById("autocomplete").innerHTML = output;
            }
        })
        .catch(error => console.log('error', error));
}


function getTodayDateMinus() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; 
    const year = now.getFullYear();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    return formattedDate;
}