import React, { Component } from 'react';
import {
    KeyboardAvoidingView, StyleSheet, View,
    Image, TextInput, Button, Text, Alert } from 'react-native';
import { signInOnFirebase } from '../services/FirebaseApi';

const img = require('../assets/TodoList.png');

export default class Login extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.state = { email: '', password: '' };
    }

    render() {
        return(
            <KeyboardAvoidingView style={styles.container}
                behavior='padding'>
                <View style={styles.topView}>
                    <Image style={styles.img} source={img}/>
                </View>
                <View style={styles.bottomView}>
                    <TextInput style={styles.input}
                        placeholder='Email'
                        keyboardType={'email-address'}
                        onChangeText={(text) => this.setState({email: text})}/>
                    <TextInput style={styles.input}
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({password: text})}/>
                    <Button title='Sign In'
                        onPress={ () => this.signIn()}/>
                    <View style={styles.textConteiner}>
                        <Text>Not a member? Let's </Text>
                        <Text style={styles.textRegister}
                            onPress={ () => this.onRegister() }>
                            Register
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }

    signIn() {
        signInOnFirebase(this.state.email, this.state.password)
            .then( (user) => {
                Alert.alert('User Authenticated',
                    `User ${user.email} has been authenticated!`);
            })
            .catch( (error) => {
                Alert.alert('Failed Login', error.message);
            });
    }

    onRegister() {
        this.props.navigation.navigate('Register');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    topView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50
    },
    img: {
        width: 200,
        height: 200
    },
    bottomView: {
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20
    },
    input: {
        marginBottom: 20
    },
    textConteiner: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    textRegister: {
        fontWeight: 'bold'
    }
});
