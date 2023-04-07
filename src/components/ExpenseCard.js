import { View, Button, StyleSheet, Text, TextInput } from 'react-native';



export default function ExpenseCard(props) {
return(
    <View
    style={{
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        width:'100%',
        marginBottom:10}}>
    <Text
    style={{
        fontSize: 20,
        color: "black",
        textAlign:'justify'
    }}
    >{props.expense.date} {props.expense.name==""?props.expense.category:props.expense.name} {props.expense.price} $</Text>
    <Text
    style={{
     fontSize: 15,
     color: "grey"}}
    >{
    props.expense.category}</Text>
    </View>
    )
}