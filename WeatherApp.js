import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import Forecast from './Forecast'

export default class WeatherApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forecast: {
                main: '-',
                description: '-',
                temp: 0
            }
        };        
    }

    componentWillMount(){
        var self = this;
        console.log("Yeah!");
        fetch("http://api.openweathermap.org/data/2.5/weather?q=90110,th&units=metric&APPID=fd68c0f2039c5a25f666a9ff374bc93e")
            .then(response => response.json())
            .then(responseJSON => {
                self.setState({
                    forecast: {
                        main: responseJSON.weather[0].main,
                        description: responseJSON.weather[0].description,
                        temp: responseJSON.main.temp
                    }
                })
            })
            .catch(error => {console.warn(error)});
    }

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
            Hat Yai Weather
            </Text>
            <Forecast main={this.state.forecast.main} description={this.state.forecast.description}
                temp={this.state.forecast.temp}/>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    fontSize: 20,
    borderWidth: 2,
    height: 40
  },
});