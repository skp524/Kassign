import React, { Component } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav: 'Login'
        }
        this.isLogin();
    }
    isLogin = async () => {
        const userToken = await AsyncStorage.getItem('authToken');
        this.setState({ nav: (userToken == 'loginAccessToken') ? 'Dashboard' : 'Login' })
    };
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate(this.state.nav)
        }, 500);
    }
    render() {
        return (
            <ImageBackground
                source={require('../assets/splash.png')}
                style={styles.image}
            >
            </ImageBackground>);
    }
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
});
export default Splash;
