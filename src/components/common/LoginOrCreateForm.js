import React, { Component } from 'react';
import { Button, View, Text, TextInput, StyleSheet,Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

class LoginOrCreateForm extends Component {
  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  }


  onUsernameChange(text) {
    this.setState({ username: text });
  }

  onPasswordChange(text) {
    this.setState({ password: text });
  }

  onFirstNameChange(text) {
    this.setState({ firstName: text });
  }

  onLastNameChange(text) {
    this.setState({ lastName: text });
  }

  handleRequest() {
    const endpoint = this.props.create ? 'register' : 'login';
    const payload = { username: this.state.username, password: this.state.password } 
 

    if (this.props.create) {
      payload.first_name = this.state.firstName;
      payload.last_name = this.state.lastName;
    }
    console.log(payload);
   

    axios
      .post(`http://6031-88-10-182-37.ngrok.io/api/auth/${endpoint}/`, payload)
      .then(response => {
        const { token, user } = response.data;

        axios.defaults.headers.common.Authorization = `Token ${token}`;
        
        console.log(token)
        _storeData = async () => {
          try {
            await AsyncStorage.setItem(
              'mytoken',
              token
            );
            await SecureStore.setItemAsync('secure_token',token);
          } catch (error) {
            console.log(error)
          }
        };
      
        Actions.main();
      })
      .catch(function (error) {
        console.log(error)
      });
    
  }

  renderCreateForm() {
    const { fieldStyle, textInputStyle } = styles;
    if (this.props.create) {
      return (
          <View style={fieldStyle}>
            <TextInput
              placeholder="First name"
              autoCorrect={false}
              onChangeText={this.onFirstNameChange.bind(this)}
              style={textInputStyle}
            />
            <TextInput
              placeholder="Last name"
              autoCorrect={false}
              onChangeText={this.onLastNameChange.bind(this)}
              style={textInputStyle}
            />
          </View>
      );
    }
  }

  renderButton() {
    const buttonText = this.props.create ? 'Create' : 'Login';

    return (
      <Button color= '#9370DB' title={buttonText} onPress={this.handleRequest.bind(this)}/>
    );
  }


  renderCreateLink() {
    if (!this.props.create) {
      const { accountCreateTextStyle } = styles;
      return (
        <Text style={accountCreateTextStyle}>
          Or 
          <Text style={{ color: '#9370DB' }} onPress={() => Actions.register()}>
            {' Sign-up'}
          </Text>
        </Text>
      );
    }
  }

  render() {
    const {
      formContainerStyle,
      fieldStyle,
      textInputStyle,
      buttonContainerStyle,
      accountCreateContainerStyle
    } = styles;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={formContainerStyle}>
          <View style={fieldStyle}>
            <TextInput
              placeholder="username"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={this.onUsernameChange.bind(this)}
              style={textInputStyle}
            />
          </View>
          <View style={fieldStyle}>
            <TextInput
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              style={textInputStyle}
            />
          </View>
          {this.renderCreateForm()}
         
        </View>
        <View style={buttonContainerStyle}>
          {this.renderButton()}
          <View style={accountCreateContainerStyle}>
            {this.renderCreateLink()}
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  formContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    flex: 1,
    padding: 15,
    margin: 2,
    borderColor: "#9370DB",
    borderWidth: 1,
    borderRadius: 10
  },
  fieldStyle: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
  },
  accountCreateTextStyle: {
    color: 'black',
  },
  accountCreateContainerStyle: {
    padding: 25,
    alignItems: 'center'
  },
  centeredView: {
    margin: 90,
    marginLeft:40,
    backgroundColor: "white",
    padding: 45,
    paddingLeft: 20,
    shadowColor: "#000",
    color:"#9370DB",
    width:700
    
  }
});


export default LoginOrCreateForm;