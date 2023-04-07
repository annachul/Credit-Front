import * as SecureStore from 'expo-secure-store';
import React, { Component, useEffect, useCallback } from 'react';
import { View, Button, StyleSheet, Text, TextInput } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios, { Axios } from 'axios';
import DatePicker from 'react-native-datepicker'
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';

function HomeScreen({ navigation }) {
  const [result, setResult] = React.useState([])
  const [fileResponse, setFileResponse] = React.useState([]);
 
  const handleDocumentSelection = React.useCallback(async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
        presentationStyle: 'fullScreen',
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  var date = new Date()
  var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  const [mydate, setMydate] =React.useState(today);

  const  handleRequest = () =>  {
    var payload = {name: info, price: sum, category: selectedItem[0], date: mydate}
    SecureStore.getItemAsync('secure_token').then(token => {
  
      axios
      .post('https://0ca6-97-71-223-147.ngrok.io/api/payments', payload,
)
      .then (response => response.json())
      .then (response => {
        console.log(response)

      })
      .then(setInfo(""))
      .then(setSum(""))
      .then(setSelectedItem([]))
      })
      
  }
const onSelectedItemsChange = (selectedItems) => {
  console.log(selectedItems);
  setSelectedItem(selectedItems);
}
  const [selectedItem, setSelectedItem] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [info, setInfo] = React.useState("")
  const [sum, setSum] = React.useState("");
    useEffect(()=>{SecureStore.getItemAsync('secure_token').then(token => {

      fetch('https://0ca6-97-71-223-147.ngrok.io/api/categories',
      {
          headers: {
              'Authorization': `Token ${token}`
              }    
      })
      .then (response => response.json())
      .then (response => {
        console.log(response)
        var categories = [{label: "Other", value: response['id']}]
        for (var i = 0; i < response['children'].length; i++) {
          categories.push({label: response['children'][i]["name"], value: response['children'][i]["id"]})
      }
      console.log(response['children'])
      setCategories(response['children'])
      })
      
    })

  }, [])

return (
  <View style={styles.formContainerStyle}>
    <View style={styles.alignStyle}>
    <Text>Add new expense</Text></View>
    <View style={styles.alignStyle}>
    <TextInput
            placeholder="Sum"
            onChangeText={setSum}
            keyboardType='numeric'
            autoCorrect={false}
            value={sum}
            style={styles.textInputStyle}
          />
    <TextInput
            placeholder="Info"
            onChangeText={setInfo}
            autoCorrect={false}
            value={info}
            style={styles.textInputStyle}
           
          />
    <DatePicker
        style={{width: 330,
          padding: 15,
        }}
        date={mydate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        suffixIcon={null}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => {setMydate(date)}}
        showIcon={false}
      />
    </View>
    <View style={styles.picker}>
    <SectionedMultiSelect 
          styles={{button: {
            backgroundColor: '#9370DB',
          },
          }}
          single={true}
          IconRenderer={Icon}
          items={categories} 
          uniqueKey='id'
          subKey='children'
          selectText='Select a category'
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItem}
        /></View>
    <Button color= '#9370DB' title="Confirm" onPress={handleRequest.bind(this)}/>
    <Button title="Select 📑" onPress={handleDocumentSelection} />
    <Button
        title="open picker for single selection of pdf file"
        onPress={() => {
          DocumentPicker.pick({
            type: types.csv,
          })
            .then(setResult)
            .catch(handleError)
        }}
      />
  </View>
);
} 

const styles = StyleSheet.create({
    buttonContainerStyle: {
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    textInputStyle: {
      padding: 15,
      width: 300,
      justifyContent: 'center',
      margin: 6,
      borderColor: "#9370DB",
      borderWidth: 1,
      borderRadius: 10
    }, 
    formContainerStyle: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
      },
      picker: {
        padding: 0,
        width: 300,
        justifyContent: 'center',
        margin: 6,
        borderColor: "#9370DB",
        borderWidth: 1,
        borderRadius: 10,
        left: 30
      },
      alignStyle:{
        alignItems: 'center',
      },
  });
  

export default HomeScreen;