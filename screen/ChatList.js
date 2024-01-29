
import React from 'react';
import { View,Text,StyleSheet, Button } from 'react-native';

const Chat = (props) => {
    return (
<View style={styles.container}>
<Text>erfan chat</Text>
<Button style={styles.erfan} title='goto chat' onPress={() => {props.navigation.navigate("Chatscreen")}} />

</View>
);
};

const styles=StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },



})




export default Chat;