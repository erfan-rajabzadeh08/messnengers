import React, { useEffect } from 'react';
import { View,Text,StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native';
import { HeaderButton, Item } from 'react-navigation-header-buttons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import color from '../constants/color';
import { useSelector } from 'react-redux';
import Dataitem from '../component/dataitem';
import PageContuinear from '../component/PageContinear';

const ChatList = props => {
const selecteduser=props.route?.params?.selecteduserId
const userdata= useSelector(state=>state.auth.userdata)
const storedusers=useSelector(state=>state.users.storedusers)
const userchats=useSelector(state=>{
const chatsdata=state.chat.chatsdata;
return Object.values(chatsdata).sort((a,b)=>{
  return new Date(b.updatedat)-new Date(a.updatedat)
});

});


 useEffect(()=>{
  if(!selecteduser){
    return;
  }

  const chatusers=[selecteduser,userdata.userId]

  const navigationprops={
  newchatdata:{users:chatusers}
  }

 props.navigation.navigate("Chatscreen",navigationprops);

 },[props.route?.params])



return <PageContuinear>
   <View style={styles.hederchatlist}>
     <TouchableOpacity style={styles.createchat} onPress={()=>props.navigation.navigate("newchat")}><FontAwesome6 name={'plus'} size={20} color={color.blue}  solid  /></TouchableOpacity>
     </View>
      <View style={styles.chatlistuser}>
  <FlatList
  data={userchats}
  renderItem={(itemdata)=>{
  const chatdata=itemdata.item
  const chatId=chatdata.key
  const otheruserid=chatdata.users.find(uid=>uid !== userdata.userId)
  const otheruser=storedusers[otheruserid];

  if(!otheruser)return;
const titel=`${otheruser.firstname} ${otheruser.lastname}`
const subtitle=chatdata.lastestMessageText || "New Chat"
const image=otheruser.profilepicure
console.log(image);
  return <Dataitem
    titel={titel}
    subtitel={subtitle}
    image={image}
    onPress={() => props.navigation.navigate("Chatscreen",{chatId})}
  />
  }}

  />
</View>

  </PageContuinear>
  };



const styles=StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    hederchatlist:{
      position:'absolute',
      top:0,
      left:0,
      right:0,
      backgroundColor:"#fffa",
      padding:8,
    },
    createchat:{
    display:'flex',
    padding:10,
    alignItems:'flex-end',
    },
    chatlistuser:{
      marginVertical: 50,
    }
})




export default ChatList;