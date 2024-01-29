import React, { useEffect, useState } from 'react';
import { View,Text,StyleSheet, Button, TouchableOpacity, TextInput, ActivityIndicator, FlatList } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import color from '../constants/color';
import PageContuinear from '../component/PageContinear';
import commonstyle from '../constants/commonstyle';
import { searchuser } from '../utlis/userAction';
import Dataitem from '../component/dataitem';
import { useDispatch, useSelector } from 'react-redux';
import { setstoredusers } from '../store/userslice';

const NewChat = props => {

const dispatch=useDispatch();

const [isloding,setIsloding]=useState(false)
const [users,setuser]=useState()
const [noresultsfound,setnoresultsfound]=useState(false)
const [searchterm ,setsearchterm]=useState('')
const userdata= useSelector(state=>state.auth.userdata)

useEffect(()=>{
const delaysearch= setTimeout(async() => {
if(!searchterm || searchterm===""){
  setuser();
  setnoresultsfound(false);
  return
}

setIsloding(true)
const usersResult=await searchuser(searchterm);
delete usersResult[userdata.userId]
setuser(usersResult)

if(Object.keys(usersResult).length===0){
  setnoresultsfound(true);
}
else{
setnoresultsfound(false)
dispatch(setstoredusers({newusers:usersResult}))
}
setIsloding(false)
}, 500);
return ()=>clearTimeout(delaysearch)
},[searchterm])

const userpressed=userId=>{
  props.navigation.navigate("Chatlists",
  {selecteduserId:userId})
}


  return <PageContuinear >
 <View style={styles.searchnewchat}>
 <FontAwesome6 name={'magnifying-glass'} size={15} color={color.lightGray}  solid />

 <TextInput style={styles.searchbox} onChangeText={(text)=>setsearchterm(text)}  placeholder='Search'/>
 </View>

 {
  isloding &&
  <View style={commonstyle.center}>
  <ActivityIndicator size={'large'} color={color.primry} />
  </View>
 }

{
  !isloding && !noresultsfound && users &&
  <FlatList
  data={Object.keys(users)}
  renderItem={(itemdata)=>{
    const userId=itemdata.item
    const userdata=users[userId]
     return <Dataitem
        titel={`${userdata.firstname} ${userdata.lastname}`}
        subtitel={userdata.about}
        image={userdata.profilepicture}
        onPress={()=>{userpressed(userId)}}
     />

  }}
  />
}

 {
  !isloding && noresultsfound && (
 <View style={commonstyle.center}>
 <FontAwesome6 name={'question'} size={55} color={color.lightGray} style={styles.noresultsIcon}  solid />
 <Text style={styles.noresultstext}>no users found!</Text>
 </View>
 )
 }
 {
 !isloding && !users &&(
 <View style={commonstyle.center}>
 <FontAwesome6 name={'users'} size={55} color={color.lightGray} style={styles.noresultsIcon}  solid />
 <Text style={styles.noresultstext}>Enter a name to search for a user!</Text>
 </View>
 )
 }
</PageContuinear>
  /* (
<View style={styles.container}>
 <Text>New chat screen</Text>
 <Button style={styles.erfan} title='goto chat' onPress={() =>
   {props.navigation.navigate(" ")}} />
  <View style={styles.hederchatlist}>
   <TouchableOpacity style={styles.createchat} onPress={()=>{console.log('success');}}><Text style={color.blue} >Close</Text></TouchableOpacity>
   </View>
 <View style={styles.hedearnewchat} ><Text>NewChat</Text></View>
</View>
); */



};

const styles=StyleSheet.create({
  /*   container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }, */

    searchnewchat:{
        backgroundColor:color.nearlywhite,
        flexDirection:"row",
        alignItems:'center',
        paddingHorizontal:8
    },
    searchbox:{
  marginHorizontal:4
   },
   noresultsIcon:{
   marginBottom:20
   },
  noresultstext:{
  fontSize:15,
  color:color.textcolor,
  letterSpacing:0.5,
  color:color.gray
  }
 /*    hederchatlist:{
      position:'absolute',
      top:0,
      left:0,
      right:0,
      backgroundColor:"#fffa",
      padding:10,
    }, */
 /*    createchat:{
    display:'flex',
    padding:10,
    alignItems:'flex-start',
    }, */
    /* hedearnewchat:{
    } */
})




export default NewChat;