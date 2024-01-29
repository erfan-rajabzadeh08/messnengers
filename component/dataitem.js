import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import ProfileImage from "./profileImage";
import color from "../constants/color";


const Dataitem =props=>{
  const {titel ,subtitel,image}=props;


return(
<TouchableWithoutFeedback onPress={props.onPress }>
    <View style={styles.container}>
         <ProfileImage
          uri={image}
          size={40}
         />
        <View style={styles.textcontainer}>
          <Text numberOfLines={1} style={styles.titel}>{titel}</Text>
          <Text numberOfLines={1} style={styles.subtitel}>{subtitel }</Text>

        </View>

    </View>
</TouchableWithoutFeedback>
)
}
const styles=StyleSheet.create({
    container:{
     flexDirection:'row',
     paddingVertical:7,
     borderBottomColor:color.lightGray,
     borderBottomWidth:1,
     alignItems:'center',
     minHeight:50
    },
    textcontainer:{
      marginLeft:15
    },
    titel:{
      letterSpacing:0.3,
      fontSize:17,
      color:'#000'
    },
    subtitel:{
        letterSpacing:0.3,
        color:color.gray,
        fontSize:14
    }
});




export default Dataitem;