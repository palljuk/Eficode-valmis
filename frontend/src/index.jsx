import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = 'http://localhost:9000/api/weather';
const baseUrl5Days = 'http://localhost:9000/api/weatherfivedays';

const get5DaysWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseUrl5Days}`);
    return response.json();
  } catch (error) {
    return (error);
  }
};

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}`);
    return response.json();
  } catch (error) {
    return (error);
  }
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
      icon1: '',
      icon2: '',
      icon3: '',
      temp: '',
      temp1: '',
      temp2: '',
      temp3: '',
      dateTime1: '',
      dateTime2: '',
      dateTime3: '',
    };
  }

  async componentWillMount() {
    const weather = await getWeatherFromApi();
    const weather5Days = await get5DaysWeatherFromApi();

    this.setState({
      icon: weather.weather[0].icon,
      icon1: weather5Days.list[1].weather[0].icon,
      icon2: weather5Days.list[2].weather[0].icon,
      icon3: weather5Days.list[3].weather[0].icon,
      temp: weather.main.temp,
      temp1: weather5Days.list[1].main.temp,
      temp2: weather5Days.list[2].main.temp,
      temp3: weather5Days.list[3].main.temp,
      dateTime1: weather5Days.list[1].dt_txt.slice(10),
      dateTime2: weather5Days.list[2].dt_txt.slice(10),
      dateTime3: weather5Days.list[3].dt_txt.slice(10),
    });
  }

  render() {
    const {
      icon,
      icon1,
      icon2,
      icon3,
      temp,
      temp1,
      temp2,
      temp3,
      dateTime1,
      dateTime2,
      dateTime3,
    } = this.state;
    return (
      <div className="icon">
        <div>
          Current weather Helsinki
          <p>{icon && <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon" />}</p>
          <p>{temp}&#8451;</p>
        </div>
        <div>
          {dateTime1}
          <p><br />{icon1 && <img src={`http://openweathermap.org/img/wn/${icon1}@2x.png`} alt="Weather Icon" />}</p>
          <p>{temp1}&#8451;</p>
        </div>
        <div>
          {dateTime2}
          <p><br />{icon2 && <img src={`http://openweathermap.org/img/wn/${icon2}@2x.png`} alt="Weather Icon" />}</p>
          <p>{temp2}&#8451;</p>
        </div>
        <div>
          {dateTime3}
          <p><br />{icon3 && <img src={`http://openweathermap.org/img/wn/${icon3}@2x.png`} alt="Weather Icon" />}</p>
          <p>{temp3}&#8451;</p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Weather />, document.getElementById('app'));
