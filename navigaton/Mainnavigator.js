import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Chat from '../screen/ChatList';
import Chatseting from '../screen/ChatScreenseting';
import Seting  from '../screen/setingscreen'
import Chatscreen from "../screen/Chatscreen";


const Stack=createStackNavigator()
const Tab = createBottomTabNavigator();

 const Tabnavigator= () =>  {
  return(
  <Tab.Navigator screenOptions={{headerTitle:'',
  headerShown: false

  }}>
  <Tab.Screen name="Chat" component={Chat} options={{tabBarLabel:'Chats',
tabBarIcon:({color,size})=> <FontAwesome6 name={'comment'} size={size} color={color}  solid />
}}/>
  <Tab.Screen name="Settings" component={Seting} options={{tabBarLabel:'Setings',
tabBarIcon:({size,color})=> <FontAwesome6 name={'gear'} size={size} color={color}  solid />
}}/>
</Tab.Navigator>
)
};
const Mainnavigator=(props) =>{
return(
    <Stack.Navigator>
    <Stack.Screen  name="HOME" component={Tabnavigator} options={{headerShown:false}}/>
    <Stack.Screen name="Chatscreen" component={Chatscreen} options={{headerTitle:''}} />
    <Stack.Screen name="ChatSeting" component={Chatseting} options={{
    headerBackTitle:"go",
      headerTitle:"Settings",

    }} />


    </Stack.Navigator>
);
};


export default Mainnavigator;