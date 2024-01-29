
import React, { useCallback, useState } from 'react';
import { View,Text,StyleSheet, Button, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import  backgroundImage from "../images/droplet.jpeg"
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
const Chatscreen = (props) => {
    const [massegetext,setmassgetext]=useState("");
    const sendmassage=useCallback(()=>{
       setmassgetext("")
    },[massegetext])
    return (
        <SafeAreaView
    edges={['left','right','bottom']}
         style={styles.container}
        >
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>

            </ImageBackground>
            <View style={styles.inputContiner}>

   <TouchableOpacity style={styles.tachable} onPress={(console.log('prsee'))}>
  <FontAwesome6 name={'plus'} size={24} color={"#3498d1"}  />
   </TouchableOpacity>

     <TextInput style={styles.textbox}
      onChangeText={text=>setmassgetext(text)}
      onSubmitEditing={sendmassage}
    value={massegetext}/>

  {massegetext===("")&& <TouchableOpacity style={styles.tachable} onPress={(console.log('prsee'))}>
       <FontAwesome6 name={'camera'} size={24}  color={"#3498d1"} />
   </TouchableOpacity>}
  { massegetext!==("")&& <TouchableOpacity style={{...styles.tachable,...styles.sendbutoon}} onPress={sendmassage}>
       <FontAwesome6 name={'paper-plane'} size={20}  color={"#ffff"} />
   </TouchableOpacity>}

            </View>
        </SafeAreaView>
        )};


        const styles=StyleSheet.create({
            container:{
                flex: 1,
                flexDirection:"column"

            },
            backgroundImage:{
                flex:1
            },
            inputContiner:{
                flexDirection:"row",
                paddingHorizontal:10,
              paddingVertical:7,
                height:50
            },
            textbox:{
               flex:1,
               paddingHorizontal:12,
               marginHorizontal:15,
               borderWidth:1,
               borderRadius:50,
               borderColor:"#bdc3c7"
            },
            tachable:{
                width:35,
                justifyContent:"center",
                alignItems:"center",
            },
            sendbutoon:{
                borderRadius:50,
                backgroundColor:"#3498d1" ,
            }
        })



export default Chatscreen;