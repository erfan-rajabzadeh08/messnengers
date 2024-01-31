/* import React, { useState } from "react";
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
  const dispatch=useDispatch()

  const[image,setimage]=useState(imagesuser)
  const userId = props.userId;

  const showeditbutton=props.showeditbutton && props.showeditbutton===true;

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
const Container=showeditbutton ? TouchableOpacity : View;
return(
<Container onPress={onSelectImage}>
 <View >
 <Image
 source={ image}
 style={{...styles.image,...{width:props.size,height:props.size}}}
  />

  {
    showeditbutton &&
    <View style={styles.editimage}>
    <FontAwesome6 name={'pen'} size={13}/>
    </View>
  }
  </View>


  </Container>
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



export default ProfileImage; */



/* import React, { useState } from "react";
import { Image, StyleSheet, Text,  TouchableOpacity, View,PermissionsAndroid, Button, Platform, Alert } from "react-native";
import imagesuser from "../images/imagesuser.jpg"
import color from "../constants/color";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import ImagePicker from "react-native-image-crop-picker";
import { androidcameraPermission, uplodimageAsync } from "./permissions";
import { updatesignedInUserData } from "../utlis/authAction";
import { useDispatch } from "react-redux";
import { updateLoggedInUserData } from "../store/authSlice"; */

/* const ProfileImage = props => {
  const [image, setimage] = useState(null);
  const userId = props.userId;
const showeditbutton=props.showeditbutton&&props.showeditbutton===true;
  useEffect(() => {
    loadProfileImage();
  }, []);

  const loadProfileImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem('profileImage');
      if (savedImage) {
        setimage(JSON.parse(savedImage));
      }
    } catch (error) {
      console.error('Error loading profile image from AsyncStorage:', error);
    }
  };

  const saveProfileImage = async (downloadURL) => {
    try {
      await AsyncStorage.setItem('profileImage', JSON.stringify({ uri: downloadURL }));
    } catch (error) {
      console.error('Error saving profile image to AsyncStorage:', error);
    }
  };

  const onSelectImage = async () => {
    const permissionstatus = await androidcameraPermission();
    if (permissionstatus) {
      Alert.alert(
        'Profile Picture',
        'Choose an option',
        [
          { text: 'Camera', onPress: onCamera },
          { text: 'Gallery', onPress: onGallery },
          { text: 'Cancel', onPress: () => {} }
        ]
      );
    }
  };

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
      saveProfileImage(downloadURL);

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
      const newData = { profilePicture: downloadURL };
      await updatesignedInUserData(userId, newData);
      dispatch(updateLoggedInUserData({ newData }));

      saveProfileImage(downloadURL);

    } catch (error) {
      console.error('Error selecting or uploading image:', error);
    }
  };
const Container=showeditbutton ?TouchableOpacity:View;
  return (
    <Container onPress={onSelectImage}>
      <View>

        <Image
          source={image || require("../images/imagesuser.jpg")}
          style={{ ...styles.image, ...{ width: props.size, height: props.size } }}
        />


      {
        showeditbutton &&  <View style={styles.editimage}>
        <FontAwesome6 name={'pen'} size={13}/>
        </View>
      }
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  image: {
    position: "relative",
    borderRadius: 50,
    borderWidth: 1,
    marginBottom: 10
  },
  editimage:{
    position:"absolute",
    backgroundColor:color.gray,
    padding:6,
    borderRadius:50,
    bottom:5,
    right:5
    }
});

export default ProfileImage;
 */
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from "react-native-image-crop-picker";
import { androidcameraPermission, uplodimageAsync } from "./permissions";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import color from '../constants/color';

const ProfileImage = (props) => {
  const { userId, size, showeditbutton } = props;
  const [image, setimage] = useState(null);

  useEffect(() => {
    loadProfileImage(userId);
  }, [userId]);

  const loadProfileImage = async (userId) => {
    try {
      const savedImage = await AsyncStorage.getItem(`profileImage_${userId}`);
      if (savedImage) {
        setimage(JSON.parse(savedImage));
      }
    } catch (error) {
      console.error('Error loading profile image from AsyncStorage:', error);
    }
  };

  const saveProfileImage = async (downloadURL) => {
    try {
      await AsyncStorage.setItem(`profileImage_${userId}`, JSON.stringify({ uri: downloadURL }));
    } catch (error) {
      console.error('Error saving profile image to AsyncStorage:', error);
    }
  };

  const onSelectImage = async () => {
    const permissionstatus = await androidcameraPermission();
    if (permissionstatus) {
      Alert.alert(
        'Profile Picture',
        'Choose an option',
        [
          { text: 'Camera', onPress: onCamera },
          { text: 'Gallery', onPress: onGallery },
          { text: 'Cancel', onPress: () => {} }
        ]
      );
    }
  };

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
      saveProfileImage(downloadURL);

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
      const newData = { profilePicture: downloadURL };
      await updatesignedInUserData(userId, newData);
      dispatch(updateLoggedInUserData({ newData }));

      saveProfileImage(downloadURL);

    } catch (error) {
      console.error('Error selecting or uploading image:', error);
    }
  };

  const Container = showeditbutton ? TouchableOpacity : View;

  return (
    <Container onPress={onSelectImage}>
      <View>
        <Image
          source={image || require("../images/imagesuser.jpg")}
          style={{ ...styles.image, ...{ width: size, height: size } }}
        />
        {showeditbutton && (
          <View style={styles.editimage}>
            <FontAwesome6 name={'pen'} size={13} />
          </View>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    position: "relative",
    borderRadius: 50,
    borderWidth: 1,
    marginBottom: 10
  },
  editimage: {
    position: "absolute",
    backgroundColor: color.gray,
    padding: 6,
    borderRadius: 50,
    bottom: 5,
    right: 5
  }
});

export default ProfileImage;
