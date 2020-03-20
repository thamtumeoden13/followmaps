/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    Platform,
    Alert
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { PERMISSIONS, request } from 'react-native-permissions';

console.disableYellowBox = true
class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            markers: [],
            coordinates: [
                { name: 'Burger', latitude: 37.8025259, longitude: -122.4351431, },
                { name: 'Pizza', latitude: 37.7946386, longitude: -122.421646, },
                { name: 'Soup', latitude: 37.7665248, longitude: -122.4165628, },
                { name: 'Sushi', latitude: 37.7834153, longitude: -122.4527787, },
                { name: 'Curry', latitude: 37.7948105, longitude: -122.4596065, },
            ],
            // initialPosition: {
            //     latitude: 37.78825,
            //     longitude: -122.4324,
            //     latitudeDelta: 0.09,
            //     longitudeDelta: 0.035
            // }
        }
    }

    componentDidMount() {
        this.requestLocationPermission();
    }

    requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            const response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            console.log('Iphone: ', response)
            if (response === 'granted') {
                this.localCurrentPosition()
            }
        }
        else {
            const response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            console.log('Android: ', response)
            if (response === 'granted') {
                this.localCurrentPosition()
            }
        }
    }

    localCurrentPosition = () => {
        Geolocation.getCurrentPosition(
            position => (console.log(JSON.stringify(position))),
            // error => Alert.alert(error.message),
            // { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
        );
    }

    render() {

        return (
            <Fragment>
                <StatusBar barStyle="dark-content" />
                <View style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        showsUserLocation={true}
                        // ref={map => this._map = map}
                        style={styles.map}
                        region={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.09,
                            longitudeDelta: 0.035,
                        }}
                    // initialRegion={this.state.initialPosition}
                    >
                        <Polygon
                            coordinates={this.state.coordinates}
                            fillColor={'rgba(100,100,200,0.3)'}
                            strokeWidth={1}
                        />
                        <Circle
                            center={{ latitude: 37.8025259, longitude: -122.4351431 }}
                            radius={1000}
                        />
                        {
                            this.state.coordinates.map(marker => (
                                <Marker
                                    key={marker.name}
                                    coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                                    title={marker.name}
                                >
                                    <Callout>
                                        <Text>{marker.name}</Text>
                                    </Callout>
                                </Marker>
                            ))
                        }

                    </MapView>
                </View>
            </Fragment>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default App;
