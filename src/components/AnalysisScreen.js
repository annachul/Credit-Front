import * as SecureStore from 'expo-secure-store';
import React, { Component, useEffect } from 'react';
import { View, Button, StyleSheet, Text, ScrollView,TouchableOpacity} from 'react-native';
import axios, { Axios } from 'axios';
import {PieChart} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import {Picker} from '@react-native-picker/picker';



function AnalysisScreen({ navigation }) {
    const [data, setData] = React.useState([])
    const [category, setCategory] = React.useState(1)
    const screenWidth = Dimensions.get("window").width;
    var date = new Date()
    var todaymonth=date.getMonth() + 1
    var todayear=date.getFullYear()
    const [selectedMonth, setSelectedMonth] =React.useState(todaymonth);
    

    colors=["#FF99C8", "#FEC8C3", "#FDDFC0", "#FCF6BD", "#E6F5CE", "#D0F4DE", "#BDE9EC", "#A9DEF9", "#C7D0F9", "#E4C1F9"]
      

    useEffect(() => {
        const fetchData = async () => {
          const token = await SecureStore.getItemAsync('secure_token');
          const response = await fetch('https://0ca6-97-71-223-147.ngrok.io/api/categories/1?month='+selectedMonth+'&year='+todayear, {
            headers: {
              'Authorization': `Token ${token}`
            }
          });
          const result = await response.json();
          setData(result['General']);
        };
        fetchData();
      }, []);
    
      const handlePress = (val, sum) => {
          if(sum!=0){
        const fetchData = async () => {
            const token = await SecureStore.getItemAsync('secure_token');
            const response = await fetch('https://0ca6-97-71-223-147.ngrok.io/api/categories/' +val +'?month='+selectedMonth+'&year='+todayear, {
              headers: {
                'Authorization': `Token ${token}`
              }
            });
            const result = await response.json();
            console.log(result)
            setData(result[Object.keys(result)[0]]);

          };
          fetchData();}

      }

      const handleRequest= (val) => {
      console.log(val)
      setSelectedMonth(val)
      const fetchData = async () => {
          const token = await SecureStore.getItemAsync('secure_token');
          const response = await fetch('https://0ca6-97-71-223-147.ngrok.io/api/categories/1?month='+val+'&year='+todayear, {
            headers: {
              'Authorization': `Token ${token}`
            }
          });
          const result = await response.json();
          console.log(result)
          setData(result['General']);

        };
        fetchData();

    }


      const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 1, 
        barPercentage: 0.5,
        useShadowColorFromDataset: false 
      };
    
      const list = data.map((item, index) => ({
        name: item.name,
        sum:item.sum,
        color: colors[index],
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }));
      
      
      

      return (
        <View style={{ flex: 1,}}>
            <View style={{ justifyContent: 'left', alignItems: 'left' }}>
         <Button
     onPress={() => handlePress(1, 1)}
    title="Back"
    color="#841584"

/>
</View>

<Picker
  selectedValue={selectedMonth}
  style={{height:150}}
  onValueChange={(itemValue, itemIndex) =>
    handleRequest(itemValue)
  }>
  <Picker.Item label="January" value="1" />
  <Picker.Item label="February" value="2" />
  <Picker.Item label="March" value="3" />
  <Picker.Item label="April" value="4" />
  <Picker.Item label="May" value="5" />
  <Picker.Item label="June" value="6" />
  <Picker.Item label="July" value="7" />
  <Picker.Item label="August" value="8" />
  <Picker.Item label="September" value="9" />
  <Picker.Item label="October" value="10" />
  <Picker.Item label="November" value="11" />
  <Picker.Item label="December" value="12" />
</Picker>

          <PieChart
  data={list}
  width={screenWidth}
  height={250}
  chartConfig={chartConfig}
  accessor={"sum"}
  backgroundColor={"transparent"}
  paddingLeft={"15"}
  center={[10, 10]}
/>
<   ScrollView>
        {data.map((cat)=>
        {
            return(
                <View
    style={{
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        width:350,
        marginBottom:10,
        marginLeft:10,
        flexDirection: 'row'}}>
     <View style={{flex: 1}}>
     <TouchableOpacity onPress={() => {handlePress(cat.id, cat.sum) }}>   
    <Text
    style={{
        fontSize: 20,
        color: "purple"
    }}
    >{cat.name} </Text>
    </TouchableOpacity> 
    </View>
    <View style={{flex: 1}}>
       <Text
    style={{
        fontSize: 20,
        color: "black",
        alignSelf: 'flex-end'
    }}
    >{cat.sum} $</Text>
    </View>

    </View>
            )
        })}
        </ScrollView>
        </View>

      );
    }
    
    
    

export default AnalysisScreen;
