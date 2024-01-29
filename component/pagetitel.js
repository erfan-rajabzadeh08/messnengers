import { View,Text,StyleSheet } from "react-native";
import color from "../constants/color";

export default PageTitle=props =>{
    return <View style={styles.continear}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
}


const styles= StyleSheet.create({
continear:{
    marginBottom:30,
    marginTop: 10,
    marginLeft:2
},
text:{
    fontSize:28,
    color:color.textcolor,
    fontFamily:"bold",
    letterSpacing:0.3
}
})



