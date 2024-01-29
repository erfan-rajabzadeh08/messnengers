import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import color from "../constants/color";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { Menu,MenuOption,MenuTrigger,MenuOptions} from "react-native-popup-menu";
import Clipboard from '@react-native-clipboard/clipboard';
import uuid from 'react-native-uuid'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
const Icon = FontAwesome6;
const MenuItem=props=>{
    return <MenuOption onSelect={props.onSelect}>
    <View style={styles.menuItem}>
      <Text style={styles.textmeun}>
        {props.text}
      </Text>
      <Icon name={props.icon} size={15} style={{marginLeft:8, color:"#000"}} />
    </View>
    </MenuOption>
}
const Bubble=props=>{
const {text,type}=props;
const bubblestyle={...styles.container}
const wrapperstyle={...styles.wrapperstyle}
const textstyle={...styles.text}
const menuRef=useRef(null);
const id=useRef(uuid.v4());


let Container=View;
switch (type) {
    case "system":
     textstyle.color='#65644a';
     bubblestyle.backgroundColor=color.beige;
     bubblestyle.alginItem='center';
        break;
    case "erorr":
     bubblestyle.backgroundColor=color.red
     textstyle.color='white';
    break;
    case "myMessage":
        wrapperstyle.justifyContent='flex-end';
        bubblestyle.backgroundColor='#e7fed6';
        bubblestyle.maxWidth='90%';
        Container=TouchableWithoutFeedback;
    break;
    case "theirMessage":
        wrapperstyle.justifyContent='felx-start'
        bubblestyle.maxWidth='90%';
        Container=TouchableWithoutFeedback;
    break;

    default:
        break;
}
const copyToClipboard =  text => {
 Clipboard.setString(text);
   };

return(
    <View style={wrapperstyle}>
      <Container onLongPress={()=>menuRef.current.props.ctx.menuActions.openMenu(id.current)} style={{with:'100%'}}>
      <View style={bubblestyle}>
        <Text style={textstyle}>
            {text}
        </Text>

    <Menu name={id.current} ref={menuRef}>
        <MenuTrigger/>
        <MenuOptions>
            <MenuItem text="Copy To Clipboard" icon={"copy"} onSelect={()=>copyToClipboard(text)}/>
            <MenuItem text="Start message" icon={"star"} onSelect={()=>copyToClipboard(text)}/>


        </MenuOptions>
    </Menu>




      </View>
      </Container>
    </View>
)
}

const styles=StyleSheet.create({
    wrapperstyle:{
        flexDirection:"row",
        justifyContent:"center",
        marginVertical:8
    },
    container:{
    backgroundColor:'white',
    borderRadius:6,
    padding:5,
    borderColor:'#E2dacc',
    borderWidth:1
    },
    text:{
        letterSpacing:0.3,
        fontSize:16,
        color:'#000'
    },
    menuItem:{
        flexDirection:"row",
        padding:5,
        flex:1,
        letterSpacing:0.3,
        fontSize:16,
        borderRadius:3

    },
    textmeun:{
    color:'#000'
    }


})


export default Bubble;