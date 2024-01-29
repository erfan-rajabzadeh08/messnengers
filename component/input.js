
import { useState } from 'react';
import { Text,StyleSheet ,Button, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const Input = props => {

  const[value,setValue]=useState(props.initailValue)
  const onChangeText= text =>{
  setValue(text)
  props.onInputchange(props.id,text)
  }

    return <View style={styles.continear} >
      <Text style={styles.label} >{props.label }</Text>
        <View style={styles.inputstyle}>
        <FontAwesome6 name={props.icon} size={18} style={styles.icon}  />

        <TextInput
        onChangeText={onChangeText}
        value={value}
        />
        </View>
     {
        props.texterorr &&
      <View style={styles.erorrcontinear} >
        <Text style={styles.texterorr}>{props.texterorr}</Text>
       </View>}

        </View>


};

const styles =StyleSheet.create({
continear:{
width:'100%',

},
inputstyle:{
flexDirection:'row',
backgroundColor:"#f4f8ff",
width:'100%',
paddingHorizontal:8,
paddingVertical:8,
marginVertical:7,
borderRadius:5

},
icon:{
alignSelf:'center',
marginRight:10,
color:"#bdc3c7"
},
label:{
    color:"#1c1e21",
    fontWeight:"bold",
    letterSpacing:0.8,
    fontSize:15,
},
erorrcontinear:{
color:'red'
},
texterorr:{
color:"red",
letterSpacing:0.5
},


})
export default Input;
