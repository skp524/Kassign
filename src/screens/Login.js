import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

const Login = ({ navigation }) => {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setEmailValidation] = useState(false);

    emailValidation = () => {
        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        emailFormat.test(emailId) ? setEmailValidation(false) : setEmailValidation(true);
    }

    const validateUser = async (userData) => {
        try {
            const userDataJSON = await AsyncStorage.getItem(userData.emailId)
            const userDetail = userDataJSON != null ? JSON.parse(userDataJSON) : null;
            if ((userDetail.emailId == userData.emailId) && (userDetail.password == userData.password)) {
                await AsyncStorage.setItem('authToken', 'loginAccessToken');
                navigation.navigate('Dashboard');
                console.log('Login Sucessfull');
            }

        } catch (e) {
            Alert.alert('Invaild  Details');
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>  Login</Text>
            <TextInput
                style={styles.inputField}
                placeholder='Enter Email Id'
                maxLength={16}
                value={emailId}
                onChangeText={(emailId) => {
                    emailValidation();
                    setEmailId(emailId)
                }}
            />
            {isEmailValid && <Text style={styles.title}>Enter Valid Email</Text>}
            <TextInput
                style={styles.inputField}
                maxLength={16}
                placeholder='Enter Password'
                secureTextEntry
                value={password}
                onChangeText={(password) =>
                    setPassword(password)}
            />
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        const userData = {
                            emailId: emailId,
                            password: password
                        }
                        isEmailValid ? emailValidation() : validateUser(userData);
                    }
                    }
                >
                    <Text style={styles.btnTxt}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        navigation.navigate('SignUp');
                    }
                    }
                >
                    <Text style={styles.btnTxt}>SignUp</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#53b3c3',
        height: '100%',
        padding: 40
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    heading: {
        fontSize: 35,
        marginTop: 30,
        color: '#ffffff',
        marginBottom: 10
    },
    title: {
        fontSize: 16,
        color: '#ffffff',
        padding: 5,
        marginLeft: 15,
    },
    inputField: {
        fontSize: 20,
        margin: 13,
        borderWidth: 1,
        color: 'black',
        backgroundColor: '#ffffff'

    },
    btn: {
        backgroundColor: 'black',
        padding: 10,
        marginTop: 30,
        marginHorizontal: 100,
        flexDirection: 'row',
        justifyContent: 'space-around'

    },
    btnTxt: {
        fontSize: 20,
        color: "#ffffff"
    },
});

export default Login;