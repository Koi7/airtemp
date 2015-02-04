    var init = function  () {
		var input = document.getElementById("city");
		input.value = "";
		var latView = document.getElementById("lat");
		var lngView = document.getElementById("lng");
		var temp    = document.getElementById("temp");
		var options = {
			types: ['(regions)']
		};
		input.oninput = clear;
		var autocomplete = new google.maps.places.Autocomplete(input, options);

		google.maps.event.addListener(autocomplete, 'place_changed', function() {
		    var place = autocomplete.getPlace(); //получаем место
		    console.log(place);
			latView.innerHTML = place.geometry.location.lat().toFixed(4) + ";";
			lngView.innerHTML = place.geometry.location.lng().toFixed(4) + ";";
			showData();
			getWeatherByCity(place.name);
	    });
	}
	google.maps.event.addDomListener(window, 'load', init);

	var getWeatherByCity = function (city) {
		var httpRequest = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"); 
		httpRequest.onreadystatechange = function () {
			var jsonText = httpRequest.readyState == 4 && httpRequest.status == 200 ? httpRequest.responseText : null;
			var weather = JSON.parse(jsonText);
			if (weather.cod == 404) {
				alert("= ( city not found");
				return;
			}
			var tempView = document.getElementById("temp");
			var tempValue = Math.floor(KtoC(weather.main.temp));
			tempView.innerHTML = tempValue + " C&deg;";
			showThermometer();
			moveRuth(tempValue);
		}
		httpRequest.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + city, true);
		httpRequest.send();
	}
	var KtoC = function (k){
		return k - 273.15;
	}
	var clear = function () {
		var latView = document.getElementById("lat");
		var lngView = document.getElementById("lng");
		var temp    = document.getElementById("temp");
		var thermometer = document.getElementById("thermometer");
		var data = document.getElementById("data");
		data.style.opacity = 0.0;
		var ruth = document.getElementById("ruth");
		ruth.style.height = "1px";
		thermometer.style.opacity = 0.0;
		lngView.innerHTML = "";
		latView.innerHTML = "";
		temp.innerHTML = "";
	}
	var showThermometer = function  () {
		var thermometer = document.getElementById("thermometer");
		thermometer.style.opacity = 1.0;
	}
	var moveRuth = function (deg)  {
		var ruth = document.getElementById("ruth");
		if (deg == 0) ruth.style.height = 182 + "px";
		if (deg > 0) {
			var zero_height = 182;
			var inc = (deg / 120) * 180;
			ruth.style.height = zero_height + inc + "px";
		}
		else{
			deg *= -1;
			var inc = 182 - ((deg / 120) * 180);
			ruth.style.height = inc + "px";
		}
	}
	var showData = function () {
		var data = document.getElementById("data");
		data.style.opacity = 1.0;
	}