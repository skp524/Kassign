import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

const registerUser = async (userData) => {
    try {
        const userDataJSON = await AsyncStorage.getItem(userData.emailId)
        const userDetail = userDataJSON != null ? JSON.parse(userDataJSON) : null;
        if ((userDetail == null)) {
            await AsyncStorage.setItem(userData.emailId, JSON.stringify(userData))
            Alert.alert('Sign Up Sucessfull');
        }
        else {
            Alert.alert('Email Id Already Exits')
        }
    } catch (e) {
        console.log('user registration error', e);
        Alert.alert('Invalid Details');
    }
}

const SignUp = () => {
    const [userName, setUserName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setEmailValidation] = useState(false);

    emailValidation = () => {
        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        emailFormat.test(emailId) ? setEmailValidation(false) : setEmailValidation(true);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.heading}> Sign Up</Text>
            <TextInput
                style={styles.inputField}
                maxLength={16}
                placeholder='Full Name'
                value={userName}
                onChangeText={(userName) => {
                    setUserName(userName)
                }}
            />
            <TextInput
                style={styles.inputField}
                placeholder='Email Id'
                onChangeText={(emailId) => {
                    emailValidation();
                    setEmailId(emailId)
                }}
            />
            {isEmailValid && <Text style={styles.title}>Enter Valid Email</Text>}
            <TextInput
                style={styles.inputField}
                maxLength={16}
                placeholder='Password'
                secureTextEntry
                onChangeText={(password) =>
                    setPassword(password)}
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    const userData = {
                        userName: userName,
                        emailId: emailId,
                        password: password
                    }
                    isEmailValid ? emailValidation() : registerUser(userData);
                }
                }
            >
                <Text style={styles.btnTxt}> SignUp</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#53b3c3',
        height: '100%',
        padding: 40
    },
    heading: {
        fontSize: 35,
        marginTop: 30,
        color: '#ffffff',
        marginBottom: 10
    },
    inputField: {
        fontSize: 20,
        margin: 13,
        borderWidth: 1,
        color: 'black',
        backgroundColor: '#ffffff'

    },
    title: {
        fontSize: 16,
        color: '#ffffff',
        padding: 5,
        marginLeft: 15,
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

export default SignUp;