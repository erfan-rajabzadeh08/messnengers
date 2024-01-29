
import React, { useState } from 'react';
//import { Text,StyleSheet ,Button, TouchableOpacity,  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageContuinear from '../component/PageContinear';
import Signupform  from '../component/signupform';
import SignInform from '../component/signinform';
import { TouchableOpacity,Text, StyleSheet, Image,View, ScrollView, KeyboardAvoidingView } from 'react-native';
import color from '../constants/color';
import logo from '../images/logo.png'
const Authscreen = props => {

const [issignup,setissignup]= useState(false)

    return <SafeAreaView style={{flex:1}}>
       <PageContuinear>
        <ScrollView>
          <KeyboardAvoidingView>
        <View style={styles.logocontinear}>
          <Image style={styles.logo} source={logo}/>
        </View>
      {
        issignup ?
        <Signupform/> :
        <SignInform/>
      }
     <TouchableOpacity
      onPress={()=>setissignup(prevState=> !prevState)}
     >
      <Text style={styles.link}>{`swich to ${issignup ? "sign in":"sign up"} `}</Text>
     </TouchableOpacity>
     </KeyboardAvoidingView>
     </ScrollView>
       </PageContuinear>
        </SafeAreaView>

        };

      const styles=StyleSheet.create({
          link:{
            color:color.blue,
            textAlign:"center",
          marginVertical:10,
          fontWeight:"500"
          },
          logocontinear:{
            justifyContent:"center",
            alignItems:"center",

          },
          logo:{
            width:'50%',
            resizeMode:"contain"
          }



      })



export default Authscreen;