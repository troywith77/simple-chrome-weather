// ajax
function fetch(url, callback) {
	var xhr = new XMLHttpRequest();
    xhr.open('GET',url,true);
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			callback(xhr.responseText);
		}
	}
	xhr.send()
}

function getWeather(value) {
	fetch('http://wthrcdn.etouch.cn/weather_mini?city=' + value, function(data) {
	    if(!data) return;
	    data = JSON.parse(data);
		forecast.innerHTML = '';
	    console.log(data.data)
	    forecastHeader.innerHTML = ''

	    city.innerHTML = data.data.city;
	    temp.innerHTML = data.data.wendu + ' °C';
	    cold.innerHTML = data.data.ganmao;

	    forecastHeader.innerHTML = '预报'
	    for(var i of data.data.forecast) {
	    	var tempLi = document.createElement('li');
	    	tempLi.innerHTML =
	    	'<p><span>日期: </span><span>' + i.date + '</span></p>' +
	    	'<p><span>风力: </span><span>' + i.fengli + '</span></p>' +
	    	'<p><span>风向: </span><span>' + i.fengxiang + '</span></p>' +
	    	'<p><span>最高温: </span><span>' + i.high + '</span></p>' +
	    	'<p><span>最低温: </span><span>' + i.low + '</span></p>' +
	    	'<p><span>类型: </span><span>' + i.type + '</span></p>';

	    	forecast.appendChild(tempLi);
	    }

	    input.value = ''
	});
}

var currentCity = null;

fetch('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json', function(data) {
	var currentCity = JSON.parse(data).city

	getWeather(currentCity)
})

// form selector
var form = document.querySelector('#form');
var input = document.querySelector('#value');

// content selector
var city = document.querySelector('#city');
var temp = document.querySelector('#temp');
var cold = document.querySelector('#cold');
var forecast = document.querySelector('#forecast');
var forecastHeader = document.querySelector('#forecast-header');


// event handler
form.addEventListener('submit', function(e) {
	e.preventDefault()
	var value = input.value;

	getWeather(value)
})