// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class Iphone extends Component {
	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.wunderground.com/api/6521e73cdd976f11/conditions/q/UK/London.json";

		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		});

		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		return (
			<div class={ style.container }>
				{ !this.state.display &&
					<div class={ style.header }>

						<div class={ style.city }>{ this.state.locate }</div>
						<div class={ style.conditions }>{ this.state.cond }</div>
						<span class={ tempStyles }>{ this.state.temp }</span>
						<div>{this.state.wind}</div>
						<div>{this.state.rain}</div>
						<div>{this.state.humidity}</div>
						<img class={style.icon} src= { this.state.icon}></img>
					</div>

					// <div class={ style.icons }>
					// 	<img src="../../assets/icons/png/shorts.png" alt="Shorts">
					// 	<img src="../../assets/icons/png/hoodie.png" alt="hoodie">
					// 	<img src="../../assets/icons/png/tshirt.png" alt="tshirt">
					// 	<img src="../../assets/icons/png/gloves.png" alt="gloves">
					// 	<img src="../../assets/icons/png/hat.png" alt="hat">
					// 	<img src="../../assets/icons/png/jacket.png" alt="jacket">
					// 	<img src="../../assets/icons/png/jumper.png" alt="jumper">
					// 	<img src="../../assets/icons/png/shoes.png" alt="shoes">
					// 	<img src="../../assets/icons/png/socks.png" alt="socks">
					// 	<img src="../../assets/icons/png/trousers.png" alt="trousers">
					// </div>

				}

				<div class={ style.details }></div>

				<div class= { style_iphone.container }>
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }
				</div>
			</div>
		);
	}

	// function to try and show the clothing icon based on weather.  
	// Needs to be turned into array or object:key?
	render: function() {
		var clothingicon;

		if(this.temp_c > 10){
			clothingicon = <img src{../../assets/icons/png/shorts.png}>
		} else {
			clothingicon = <img src{../../assets/icons/png/trousers.png}>
		}
		return (
			<div class={ style.icons }>
				{clothingicon}
			</div>
		)
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['current_observation']['display_location']['city'];
		var temp_c = parsed_json['current_observation']['temp_c'];
		var conditions = parsed_json['current_observation']['weather'];
		var wind_string = parsed_json['current_observation']['wind_string'];
		var precip_today_metric = parsed_json['current_observation']['precip_today_metric'];
		var relative_humidity = parsed_json['current_observation']['relative_humidity'];
		var icon_url = parsed_json['current_observation']['icon_url'];


		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions,
			wind: wind_string,
			rain: precip_today_metric,
			humidity: relative_humidity,
			icon: icon_url
		});
	}
}
