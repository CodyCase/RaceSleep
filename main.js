import React, { Component } from 'react';
import { Button, Image, Slider, ListView, Text, View, TouchableHighlight, Platform } from 'react-native';

import { StackNavigator } from 'react-navigation';

// Import the react-native-sound module
var Sound = require('react-native-sound');
// Enable playback in silence mode (iOS only)
Sound.setCategory('Playback');

// Load the sound file 'advertising.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.
var sound = new Sound('Sound2.wav', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
    // loaded successfully
    console.log('duration in seconds: ' + sound.getDuration() + 'number of channels: ' + sound.getNumberOfChannels());
});

class SoundConfigScreen extends React.Component {
  static navigationOptions = {
    title: 'Sound Configuration',
  };

  state = {
    value: this.props.value,
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <Image source={params.picture} resizeMode={'contain'} style={{height: 250}} />
        <Text style={{flex: 1, height: 40, color: 'yellow', fontSize: 16, fontWeight: 'bold', textAlign: 'left'}}>{params.soundName}</Text>


        <TouchableHighlight onPress={this._onPlaySound}>
            <View >
                <Text style={{height: 40, color: 'yellow', fontSize: 12, fontWeight: 'bold', textAlign: 'right'}}>Play!</Text>
            </View>
        </TouchableHighlight>


        <TouchableHighlight onPress={this._onStopSound}>
            <View >
                <Text style={{height: 40, color: 'yellow', fontSize: 12, fontWeight: 'bold', textAlign: 'right'}}>Stop!</Text>
            </View>
        </TouchableHighlight>


      </View>
    );
  }

    _onPlaySound() {

        sound.setNumberOfLoops(1);

        // Play the sound with an onEnd callback
        sound.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });
    }

    _onStopSound() {
        sound.stop();
    }

}


class HomeScreen extends Component {
    // Initialize the hardcoded data
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
        dataSource: ds.cloneWithRows([
                                      'F1 V12', 'F1 V10', 'Nascar V8', 'Spec Miata', '911 GT3', 'Chevy V8', 'BMW V8', 'AMG V8'
                                      ])
        };
    }
    
  static navigationOptions = {
    title: 'Welcome to SleepRacer',
  };

    render() {
        const { navigate } = this.props.navigation;
        let pic = {
            uri: 'https://s-media-cache-ak0.pinimg.com/originals/4a/b9/71/4ab9716d3306be030bcd3ce21fe2c209.jpg'
        }
        return (
            
            <View style={{flex: 1, backgroundColor: 'black'}}>
                <Image source={pic} resizeMode={'contain'} style={{height: 250}} />
            
                <ListView style={{paddingTop: 22}}
                    dataSource={this.state.dataSource}
            
                    renderRow={(rowData) =>
            
                    <View style={{flexDirection: 'row'}}>
                        <TouchableHighlight onPress={() => navigate('SoundConfig', {soundName : rowData, picture : pic, sound : sound })}>
                            <View style={{minWidth: '80%', paddingLeft: 22}}>
                                <Text style={{height: 40, color: 'yellow', fontSize: 16, fontWeight: 'bold', textAlign: 'left'}}>{rowData}</Text>
                            </View>
                        </TouchableHighlight>
            
                        <TouchableHighlight onPressIn={this._onSampleSound} onPressOut={this._onStopSound}>
                            <View >
                                <Text style={{height: 40, color: 'yellow', fontSize: 12, fontWeight: 'bold', textAlign: 'right'}}>Sample</Text>
                            </View>
                        </TouchableHighlight>

                    </View>

                }/>
            </View>
                
        );
    }
    
    _onSampleSound() {

        // Play the sound with an onEnd callback
        sound.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });
    }

    _onStopSound() {
        sound.stop();
    }
    
}

const RaceSleep = StackNavigator({
    Home: { screen: HomeScreen },
    SoundConfig: { screen: SoundConfigScreen },
});

export default RaceSleep;






