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

// form
var form = document.querySelector('#form');
var input = document.querySelector('#value');

// content
var city = document.querySelector('#city');
var temp = document.querySelector('#temp');
var cold = document.querySelector('#cold');
var forecast = document.querySelector('#forecast');

form.addEventListener('submit', function(e) {
	e.preventDefault()
	var value = input.value;
	fetch('http://wthrcdn.etouch.cn/weather_mini?city=' + value, function(data) {
	    if(!data) return;
	    data = JSON.parse(data);
		forecast.innerHTML = '';
	    console.log(data.data)

	    city.innerHTML = data.data.city;
	    temp.innerHTML = data.data.wendu + ' °C';
	    cold.innerHTML = data.data.ganmao;
	    for(var i of data.data.forecast) {
	    	var tempLi = document.createElement('li');
	    	tempLi.innerHTML =
	    	'<p>日期: ' + i.date + '</p>' +
	    	'<p>风力: ' + i.fengli + '</p>' +
	    	'<p>风向: ' + i.fengxiang + '</p>' +
	    	'<p>最高温: ' + i.high + '</p>' +
	    	'<p>最低温: ' + i.low + '</p>' +
	    	'<p>类型: ' + i.type + '</p>';

	    	forecast.appendChild(tempLi);
	    }
	});
})