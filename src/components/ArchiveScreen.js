import * as SecureStore from 'expo-secure-store';
import React, { Component, useEffect } from 'react';
import { View, Button, StyleSheet, Text, TextInput, ScrollView, RefreshControl} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios, { Axios } from 'axios';
import ExpenseCard from './ExpenseCard';
import DatePicker from 'react-native-datepicker'


function ArchiveScreen({ navigation }) {
    const [payments, setPayments] = React.useState([])
    const [sum, setSum] = React.useState()
    const [expenses, setExpenses] = React.useState([])
    const [refreshing, setRefreshing] = React.useState(true);


    

    useEffect(()=>{SecureStore.getItemAsync('secure_token').then(token => {

        fetch('https://0ca6-97-71-223-147.ngrok.io/api/payments',
        {
            headers: {
                'Authorization': `Token ${token}`
                }    
        })
        .then (response => response.json())
        .then (response => {

            setPayments(response)
            setSum(response["sum"])
            setExpenses(response["data"])
            
        }) })}, []) 
        var date = new Date()
        var dayearliar = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate()-1)
        var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()


        
        const oneexpense=expenses.map((expense) => 
        <ExpenseCard
                key={expense.id}
                expense={expense}
              />
       
        )

       
          const [categories, setCategories] = React.useState([])
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
      
        function  handleRequest (event) {
            // event.preventDefault()
            var payload = {from: from, to: to, category: selectedItem[0]}
            var filterto="&to="+payload.to
            var filtercategory
            textsum="Sum of your expenses from " +from+ " to "+ to+ " is " +sum

            if (selectedItem.length==0){
                filtercategory="" 
            }
            else {filtercategory="&category="+payload.category}
            SecureStore.getItemAsync('secure_token').then(token => {fetch('https://0ca6-97-71-223-147.ngrok.io/api/payments?from='+payload.from+filterto+filtercategory,
            {
                headers: {
                    'Authorization': `Token ${token}`
                    }    
            })
                .then (response => response.json())
                .then (response => {

                    setPayments(response)
                    setRefreshing(false);
                    setSum(response["sum"])
                    console.log(sum)
                    setExpenses(response["data"])
                    
                })})}
        
        const onSelectedItemsChange = (selectedItems) => {
          console.log(selectedItems);
          setSelectedItem(selectedItems);
        }
          const [selectedItem, setSelectedItem] = React.useState([])
          const [from, setfrom] = React.useState(dayearliar);
          const [to, setto] = React.useState(today);
          var textsum="Sum of your expenses from " +from+ " to "+ to+ " is " +sum

    return (
      <View style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
          <View style={style.row}>
          <DatePicker
        style={{width: 190}}
        date={from}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        maxDate={today}
        showIcon={false}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          
          dateInput: {
            marginLeft: 20
          }
        }}
        onDateChange={(date) => {setfrom(date)}}
      />
      <DatePicker
        style={{width: 190, padding:10}}
        date={to}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate={today}
        showIcon={false}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          
          dateInput: {
            marginLeft: 20
          }
        }}
        onDateChange={(date) => {setto(date)}}
      /></View>
<View style={style.alignStyle}>
<View style={style.picker}> 
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
           <Button color= '#9370DB' title="Confirm" onPress={handleRequest}/>
           </View>
        <Text
            style={{
                fontSize: 18,
                color: "black",
                marginBottom:30,
                fontWeight:'bold',
                marginHorizontal:5,
                alignSelf: "flex-start"
                
            }}
        >{sum==null?"Sorry, the aren't any expenses":textsum}</Text>
         <ScrollView style={style.scroll}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRequest} />
          }>
        {oneexpense}
        </ScrollView>
      </View>
    );
  }

  const style = StyleSheet.create({
    row: {
      flexDirection: 'row',
      textAlign: "left",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 35
    },
    picker: {
      padding: 0,
      width: 300,
      justifyContent: 'center',
      margin: 6,
      borderColor: "#9370DB",
      borderWidth: 1,
      borderRadius: 10,
      left: 30,
    },
      scroll:{
        marginBottom:100
      },
      alignStyle:{
        alignItems: 'center',
      },
  })

export default ArchiveScreen;