
getWeatherThreeDays("Dornbirn");

document.getElementById("input").addEventListener('keyup', function(event) {

    let value = document.getElementById("input").value;
    if (event.keyCode === 13) {

        getWeatherThreeDays(value);
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
    getWeatherThreeDays(value);

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

function getWeatherThreeDays(value){
    fetch('http://api.weatherapi.com/v1/forecast.json?key=5fa2dd3419924cd88d871245231710&q='+ value+ '&days=3&aqi=no&alerts=no')
    .then(response => response.json())
    .then(response =>{
        console.log("Three Days", response);
        changeData(response);
        
    }).catch(error =>{
        alert("Stadt nicht gefunden!");
    })
}



function getWeatherByCoords(lat,lon){
    fetch('http://api.weatherapi.com/v1/forecast.json?key=5fa2dd3419924cd88d871245231710&q='+lat + ',' + lon +'&days=3&aqi=no&alerts=no')
    .then(response => response.json())
    .then(response =>{
        console.log("Today through autocomplete", response);
        changeData(response);
    }).catch(error =>{
        alert("Stadt nicht gefunden!");
    })

}


function changeData(data){
    var titleComponent;
    var data;
    var m = data.forecast.forecastday[0].day;
    var n = data.forecast.forecastday[1].day;
    var a = data.forecast.forecastday[2].day;

    var others = data.forecast.forecastday;



    titleComponent = '<div class="bg-white h-auto w-[90vw] md:w-[70vw] rounded-[20px] m-10 border-solid border-black border-[2px] flex flex-col relative">'+
                            '<div class="absolute right-5 top-0 text-[30px] font-black md:hidden">Morgen</div>'+
                                '<div id="dayanddate" class="flex flex-col items-center text-[40px] font-extrabold self-center">'+
                                    '<div id="day" class="text-[40px] hidden md:inline">Morgen</div>'+
                                    '<div id="date" class="text-[40px] hidden md:inline">'+ getFormattedDateRange() +'</div>'+
                            ' </div>'+
                                '<div id="place" class="text-[30px] p-4 md:absolute md:left-[10px]">'+
                                    '<div id="region" class="font-bold">'+ data.location.region +'</div>'+
                                    '<div id="city" class="">'+ data.location.name +'</div>'+
                            ' </div>'+
                        '</div>';

    var data = '<div id="1" class="bg-white h-auto min-h-[150px] w-[90vw] md:w-[70vw] rounded-[20px] m-2 border-solid border-black border-[2px] flex justify-evenly relative p-3">' +
    '<div class="flex items-center">' +
        '<div class="flex flex-row">' +
            '<div class="text-[40px] md:text-[50px] font-bold">'+ m.avgtemp_c +'°</div>' +
            '<div class="text-[15px] font-bold hidden md:inline self-start">'+ others[0].hour[6].temp_c +'°/'+ others[0].hour[21].temp_c +'°</div>' +
        '</div>' +
    '</div>' +
    '<div class="flex flex-col justify-center">' +
        '<div class="flex">' +
            '<img src="./img/rain.png" alt="" class="w-[30px] m-1">' +
            '<div class="hidden lg:inline">&nbsp Niederschlag:</div>' +
            '<div> &nbsp'+ m.totalprecip_mm +' mm/h</div>' +
        '</div>' +
        '<div class="flex">' +
            '<img src="./img/humidity.png" alt="" class="w-[30px] m-1">' +
            '<div class="hidden lg:inline">&nbsp Luftfeuchtigkeit:</div>' +
            '<div> &nbsp'+ m.avghumidity +'%</div>' +
        '</div>' +
        '<div class="flex">' +
            '<img src="./img/wind.png" alt="" class="w-[30px] m-1">' +
            '<div class="hidden lg:inline">&nbsp Wind:</div>' +
            '<div> &nbsp'+ m.maxwind_kph +' km/h</div>' +
        '</div>' +
    '</div>' +
    '<div class="flex flex-col items-end w-[30vw]">' +
        '<div class="text-[25px] font-black hidden md:inline">'+ getDateMinus(1) +'</div>' +
        '<div class="text-[25px] font-black md:hidden">'+ getDateMinus(1, "ddmm") +'</div>' +
        '<img src="'+ m.condition.icon +'" alt="" srcset="" class="w-[80px]">' +
    '</div>' +
'</div>' +
'<div id="2" class="bg-white h-auto min-h-[150px] w-[90vw] md:w-[70vw] rounded-[20px] m-2 border-solid border-black border-[2px] flex justify-evenly relative p-3">' +
    '<div class="flex items-center">' +
        '<div class="flex flex-row">' +
            '<div class="text-[40px] md:text-[50px] font-bold">'+ n.avgtemp_c +'°</div>' +
            '<div class="text-[15px] font-bold hidden md:inline self-start">'+ others[1].hour[6].temp_c +'°/'+ others[1].hour[21].temp_c +'°</div>' +
        '</div>' +
    '</div>' +
    '<div class="flex flex-col justify-center">' +
        '<div class="flex">' +
            '<img src="./img/rain.png" alt="" class="w-[30px] m-1">' +
            '<div class="hidden lg:inline">&nbsp Niederschlag:</div>' +
            '<div> &nbsp'+ n.totalprecip_mm +' mm/h</div>' +
        '</div>' +
        '<div class="flex">' +
            '<img src="./img/humidity.png" alt="" class="w-[30px] m-1">' +
            '<div class="hidden lg:inline">&nbsp Luftfeuchtigkeit:</div>' +
            '<div> &nbsp'+ n.avghumidity +'%</div>' +
        '</div>' +
        '<div class="flex">' +
            '<img src="./img/wind.png" alt="" class="w-[30px] m-1">' +
            '<div class="hidden lg:inline">&nbsp Wind:</div>' +
            '<div> &nbsp'+ n.maxwind_kph +' km/h</div>' +
        '</div>' +
    '</div>' +
    '<div class="flex flex-col items-end w-[30vw]">' +
        '<div class="text-[25px] font-black hidden md:inline">'+ getDateMinus(2) +'</div>' +
        '<div class="text-[25px] font-black md:hidden">'+ getDateMinus(2, "ddmm") +'</div>' +
        '<img src="'+ m.condition.icon +'" alt="" srcset="" class="w-[80px]">' +
    '</div>' +
'</div>' +
'<div id="3" class="bg-white h-auto min-h-[150px] w-[90vw] md:w-[70vw] rounded-[20px] m-2 border-solid border-black border-[2px] flex justify-evenly relative p-3">' +
    '<div class="flex items-center">' +
        '<div class="flex flex-row">' +
            '<div class="text-[40px] md:text-[50px] font-bold">'+ a.avgtemp_c +'°</div>' +
            '<div class="text-[15px] font-bold hidden md:inline self-start">'+ others[2].hour[6].temp_c +'°/'+ others[2].hour[21].temp_c +'°</div>' +
        '</div>' +
    '</div>' +
    '<div class="flex flex-col justify-center">' +
        '<div class="flex">' +
            '<img src="./img/rain.png" alt="" class="w-[30px] m-1">' +
            '<div class="hidden lg:inline">&nbsp Niederschlag:</div>' +
            '<div> &nbsp'+ a.totalprecip_mm +' mm/h</div>' +
        '</div>' +
        '<div class="flex">' +
            '<img src="./img/humidity.png" alt="" class="w-[30px] m-1">' +
            '<div class="hidden lg:inline">&nbsp Luftfeuchtigkeit:</div>' +
            '<div> &nbsp'+ a.avghumidity +'%</div>' +
        '</div>' +
        '<div class="flex">' +
            '<img src="./img/wind.png" alt="" class="w-[30px] m-1">' +
            '<div class="hidden lg:inline">&nbsp Wind:</div>' +
            '<div> &nbsp'+ a.maxwind_kph +' km/h</div>' +
        '</div>' +
    '</div>' +
    '<div class="flex flex-col items-end w-[30vw]">' +
        '<div class="text-[25px] font-black hidden md:inline">'+ getDateMinus(3) +'</div>' +
        '<div class="text-[25px] font-black md:hidden">'+ getDateMinus(3, "ddmm") +'</div>' +
        '<img src="'+ a.condition.icon +'" alt="" srcset="" class="w-[80px]">' +
    '</div>' +
'</div>';


document.getElementById("title").innerHTML = titleComponent;
document.getElementById("data").innerHTML = data;
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

function getDateMinus(dayplus, type) {
    const now = new Date();
    const day = now.getDate() + dayplus;
    const month = now.getMonth() + 1; 
    const year = now.getFullYear();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    if(type == "ddmm")
    {
        return  `${formattedDay}.${formattedMonth}`;
    }
    const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;
    return formattedDate;
}

function getFormattedDateRange() {
    const today = new Date();
    const startDate = new Date(today);
    const endDate = new Date(today);

    startDate.setDate(today.getDate() + 1);
    endDate.setDate(startDate.getDate() + 2);

    const formatNumber = (num) => (num < 10 ? "0" + num : num);

    const formattedStartDay = formatNumber(startDate.getDate());
    const formattedStartMonth = formatNumber(startDate.getMonth() + 1);
    const startYear = startDate.getFullYear();

    const formattedEndDay = formatNumber(endDate.getDate());
    const formattedEndMonth = formatNumber(endDate.getMonth() + 1);

    const formattedDateRange = `${formattedStartDay}.${formattedStartMonth} - ${formattedEndDay}.${formattedEndMonth}`;

    return formattedDateRange;
}
