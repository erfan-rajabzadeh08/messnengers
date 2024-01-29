import React, { useState } from "react";
import { Image, StyleSheet, Text,  TouchableOpacity, View,PermissionsAndroid, Button, Platform, Alert } from "react-native";
import imagesuser from "../images/imagesuser.jpg"
import color from "../constants/color";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import ImagePicker from "react-native-image-crop-picker";
import { androidcameraPermission, uplodimageAsync } from "./permissions";
import { updatesignedInUserData } from "../utlis/authAction";
import { useDispatch } from "react-redux";
import { updateLoggedInUserData } from "../store/authSlice";
const ProfileImage=props=> {
  const[image,setimage]=useState(imagesuser)
  const userId = props.userId;
  const dispatch=useDispatch()

 const onSelectImage=async()=>{
  const permissionstatus= await androidcameraPermission()
  if(permissionstatus || Platform.OS=='android'){
    Alert.alert(
      'profile picture',
      'choose an option',
    [
      {text:'Camera', onPress:onCamera },
      {text:'Gallry', onPress:onGallery},
      {text:'Cancel', onPress:()=>{}}
    ]
    )
  }
}
const onCamera = async () => {
  try {
    const image = await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    });
    setimage({ uri: image.path });

      const downloadURL = await uplodimageAsync(image.path);
      console.log('Download URL:', downloadURL);
    } catch (error) {
      console.error('Error selecting or uploading image:', error);
    }
  };

const onGallery = async () => {
  try {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    });
    setimage({ uri: image.path });

    const downloadURL = await uplodimageAsync(image.path);
    console.log('Download URL:', downloadURL);
    const newData={ profilePicture: downloadURL }
    await updatesignedInUserData(userId, newData);
    dispatch(updateLoggedInUserData({newData}))
  } catch (error) {
    console.error('Error selecting or uploading image:', error);
  }
};

return(
<TouchableOpacity onPress={onSelectImage}>
 <View >
 <Image
 source={ image}
 style={{...styles.image,...{width:props.size,height:props.size}}}
  />
 <View style={styles.editimage}>
 <FontAwesome6 name={'pen'} size={13}/>
 </View>
 </View>
  </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
image:{
position:"relative",
borderRadius:50,
borderWidth:1,
borderColor:color.gray,
marginBottom:10
},
editimage:{
position:"absolute",
backgroundColor:color.gray,
padding:6,
borderRadius:50,
bottom:5,
right:5
}
})



export default ProfileImage;