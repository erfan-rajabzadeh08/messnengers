import React, { useEffect, useState } from "react";
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import ChatList from '../screen/ChatList';
import Chatseting from '../screen/ChatScreenseting';
import Seting  from '../screen/setingscreen'
import Chatscreen from "../screen/Chatscreen";
import newChat from "../screen/newchat";
import { useDispatch, useSelector } from "react-redux";
import { child, get, getDatabase, off, onValue,ref } from "firebase/database";
import { getfirebaseapp } from "../utlis/firebasehelper";
import { setchatsdata } from "../store/chatslice";
import { ActivityIndicator, View } from "react-native";
import color from "../constants/color";
import commonstyle from "../constants/commonstyle";
import { setstoredusers } from "../store/userslice";
import { setchatmessages } from "../store/messagesslic";



const Stack=createStackNavigator()
const Tab = createBottomTabNavigator();

 const Tabnavigator= () =>  {
  return(
  <Tab.Navigator screenOptions={{headerTitle:'',
  headerShown: false

  }}>
  <Tab.Screen name="Chatlists" component={ChatList} options={{tabBarLabel:'Chats',
tabBarIcon:({color,size})=> <FontAwesome6 name={'comment'} size={size} color={color}  solid />
}}/>
  <Tab.Screen name="Settings" component={Seting} options={{tabBarLabel:'Setings',
tabBarIcon:({size,color})=> <FontAwesome6 name={'gear'} size={size} color={color}  solid />
}}/>
</Tab.Navigator>
)
};
const Stacknavigator=()=>{
  return(
    <Stack.Navigator>
      <Stack.Group>
    <Stack.Screen  name="HOME" component={Tabnavigator} options={{headerShown:''}}/>
    <Stack.Screen name="Chatscreen" component={Chatscreen} options={{headerTitle:"" , headerTitleAlign:'center' }} />
     <Stack.Screen name="ChatSeting" component={Chatseting} options={{
    headerBackTitle:"go",
    headerTitle:"Settings",
    }} />
</Stack.Group>
<Stack.Group screenOptions={{presentation:'containedModal'}}>
<Stack.Screen name="newchat" component={newChat} options={{headerTitle:'New Chat', headerTitleAlign:'center' } } />
</Stack.Group>
    </Stack.Navigator>
  )
}

const Mainnavigator=(props) =>{

 const dispatch=useDispatch()
 const [isloding,setisloading]=useState(true);


  const userdata=useSelector(state=>state.auth.userdata);
  const storedusers=useSelector(state=>state.users.storedusers)
useEffect(()=>{
console.log("subscribing to firebase listener");

const app=getfirebaseapp();
const dbref= ref(getDatabase(app))
const userchatsref=child(dbref,`userchats/${userdata.userId}`)
const refs=[userchatsref]
onValue(userchatsref,(querysnapshot)=>{
const chatidsdata=querysnapshot.val() || {};
const chatids=Object.values(chatidsdata)

const chatsdata={};
let chatsfoundcount=0;
for (let i = 0; i < chatids.length; i++) {
  const chatid = chatids[i];
  const chatref=child(dbref,`chat/${chatid}`)
  refs.push(chatref);

  onValue(chatref,(chatSnapshot)=>{
    chatsfoundcount++;

    const data=chatSnapshot.val();

    if(data){
     data.key=chatSnapshot.key
     data.users.forEach(userId=>{
        if(storedusers[userId])return;

        const userref=child(dbref,`users/${userId}`);

        get(userref)
        .then(usersnapshot=>{
          const usersnapshotdata=usersnapshot.val();
          dispatch(setstoredusers({newusers:{usersnapshotdata}}))
          })
    refs.push(userref);

     })


     chatsdata[chatSnapshot.key]=data;
    }
     if(chatsfoundcount >=chatids.length){
      dispatch(setchatsdata({chatsdata}))
      setisloading(false)
     }
  })

  const messagesRef=child(dbref,`messages/${chatid}`)
  refs.push(messagesRef)

  onValue(messagesRef,messagessnapshot =>{
    const messagesData=messagessnapshot.val()
    dispatch(setchatmessages({chatid,messagesData}))
})


  if(chatsfoundcount==0){
    setisloading(false)
  }



}
})
return ()=>{
  console.log("subscribing to firebase listener");
  refs.forEach(ref=>off(ref));

};
},[]);

if(isloding){
  <View style={commonstyle.center}>
    <ActivityIndicator size={'large'} color={color.primry} />
  </View>
}



return(
  <Stacknavigator />
  )
};


export default Mainnavigator;