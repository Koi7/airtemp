    var init = function  () {
		var input = document.getElementById("city");
		input.value = "";
		var latView = document.getElementById("lat");
		var lngView = document.getElementById("lng");
		var temp    = document.getElementById("temp");
		var options = {
			types: ['(regions)']
		};

		var autocomplete = new google.maps.places.Autocomplete(input, options);

		google.maps.event.addListener(autocomplete, 'place_changed', function() {
		    var place = autocomplete.getPlace(); //получаем место
		    console.log(place);
			latView.innerHTML = place.geometry.location.lat() + ";";
			lngView.innerHTML = place.geometry.location.lng() + ";";
			debugger;
			console.log(getTemperatureByCity(place.name));
	    });
	}
	google.maps.event.addDomListener(window, 'load', init);

	var getTemperatureByCity = function (city) {
		var jsonText = getWeatherJSON(city);
		var weather = JSON.parse(jsonText);
		return weather.main.temp;
	}
	var getWeatherJSON = function (city) {
		var httpRequest = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"); 
		var jsonText;
		httpRequest.onreadystatechange = function () {
			//====jsonText after getting respons equals null====
			jsonText = httpRequest.readyState == 4 && httpRequest.status == 200 ? httpRequest.responseText : null;
		}
		httpRequest.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + city, true);
		httpRequest.send();
		return jsonText;
	}