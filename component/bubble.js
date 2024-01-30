import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import color from "../constants/color";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { Menu,MenuOption,MenuTrigger,MenuOptions} from "react-native-popup-menu";
import Clipboard from '@react-native-clipboard/clipboard';
import uuid from 'react-native-uuid'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { starMessage } from "../utlis/chatactions";
import { useSelector } from "react-redux";

function formatAmPm(dateString) {
    const date=new Date(dateString)
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  }

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
const {text,type,messageId,chatId,userId,date,setReply,replyingTo,name}=props;
const starredMessages=useSelector(state=>state.messages.starredMessages[chatId]??{})
const storedusers=useSelector(state=>state.users.storedusers)
const bubblestyle={...styles.container}
const wrapperstyle={...styles.wrapperstyle}
const textstyle={...styles.text}
const menuRef=useRef(null);
const id=useRef(uuid.v4());

const dateString=date && formatAmPm(date)
let Container=View;
let isUsermessage=false;
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
        isUsermessage=true
    break;
    case "theirMessage":
        wrapperstyle.justifyContent='felx-start'
        bubblestyle.maxWidth='90%';
        Container=TouchableWithoutFeedback;
        isUsermessage=true
    break;
    case "reply":
    bubblestyle.backgroundColor='#f2f2f2'
   
    break;
    default:
        break;
}
const copyToClipboard =  text => {
 Clipboard.setString(text);
   };


  const isStared=isUsermessage && starredMessages[messageId] !==undefined;
  const replyingToUser=replyingTo && storedusers[replyingTo.sentBy];
  return(
    <View style={wrapperstyle}>
      <Container onLongPress={()=>menuRef.current.props.ctx.menuActions.openMenu(id.current)} style={{with:'100%'}}>
      <View style={bubblestyle}>

      {
       name &&
       <Text style={styles.name}>{name}</Text>
      }


      {
        replyingToUser &&
        <Bubble
        type='reply'
        text={replyingTo.text}
        name={`${replyingToUser.firstname} ${replyingToUser.lastname}`}
        />
      }
        <Text style={textstyle}>
            {text}
        </Text>
   {
  dateString && <View style={styles.timeContinear}>
        {isStared && <FontAwesome6 name='star-of-david' size={14} color='#000' style={{marginRight:7  }} />}
    <Text style={styles.time}>{dateString}</Text>
    </View>
   }



    <Menu name={id.current} ref={menuRef}>
        <MenuTrigger/>
        <MenuOptions>
            <MenuItem text="Copy To Clipboard" icon={"copy"} onSelect={()=>copyToClipboard(text)}/>
            <MenuItem text={`${isStared ? 'Unstar':'Star'} message`} icon={ isStared ?"star":"star-of-david"} onSelect={()=>starMessage(messageId,chatId,userId)}/>
            <MenuItem text='Reply' icon={"reply"} onSelect={setReply}/>


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
    },
    timeContinear:{
    flexDirection:'row',
    justifyContent:'flex-end'
    },
    time:{
      color:color.gray,
      fontSize:13
    },
    name:{
      fontSize:11
    }


})


export default Bubble;