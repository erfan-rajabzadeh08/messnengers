
import { Text,StyleSheet ,Button, View } from 'react-native';
const PageContuinear = props => {
    return <View style={styles.continear} >
        {props.children}
        </View>

};

const styles =StyleSheet.create({
continear:{
paddingHorizontal:12,
paddingVertical:15,
flex:1,
Color:"#fff"
}



     })

export default PageContuinear;
