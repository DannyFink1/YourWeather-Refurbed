getWeatherToday("Dornbirn");
getHourData("Dornbirn");



document.getElementById("input").addEventListener('keypress', function(event) {
    let value = document.getElementById("input").value;
    if (event.key === "Enter") {

        getWeatherToday(value);
        getHourData(value);
    }
})

document.getElementById("input").addEventListener("keyup", (e)=>{
    let value = document.getElementById("input").value;
    console.log("value", value);
    getAutocomplete(value);
});

var autocompleteTimeout;

document.getElementById("input").addEventListener("click",(event)=>{
    document.getElementById("autocomplete").style.display= "inline";
});

document.getElementById("input").addEventListener('blur', function(event) {
    console.log("moin")
    // Verzögert das Ausblenden des autocomplete-Elements
    autocompleteTimeout = setTimeout(function() {
        console.log("blur");
        document.getElementById("autocomplete").style.display= "none";
    }, 1);
});

document.getElementById("autocomplete").addEventListener('mousedown', function(event) {
    // Verhindert das Auslösen des blur-Events und behält den Fokus im Input-Feld
    clearTimeout(autocompleteTimeout);
    event.preventDefault();
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
    });
}

function getHourData(value){
    fetch('http://api.weatherapi.com/v1/history.json?key=5fa2dd3419924cd88d871245231710&q=' + value + "&dt=" + getTodayDateMinus())
    .then(response => response.json())
    .then(response =>{
        console.log("Hourly", response);
        changeHourDate(response);
    });
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
            console.log(result);
            output = "";
            if(result.results.length != 0)
            {
                result.results.forEach((element, index)=>{
                    output += '<div class="py-6 flex items-center w-full border-t border-gray-200 hover:bg-gray-50">'+
                                '<a href="#" class="flex-1">'+
                        '<div class="text-gray-400 text-base">'+ element.city + ", " + element.country +'</div>'+
                    '</a>'+
                    '<div>'+
                        '<svg width="40" height="20" viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg">'+
                            '<line x1="30" y1="2" x2="40" y2="10" stroke="#9CA3AF" />'+
                            '<line x1="30" y1="18" x2="40" y2="10" stroke="#9CA3AF" />'+
                            '<line x1="20" y1="10" x2="40" y2="10" stroke="#9CA3AF" />'+
                        '</svg>'+
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