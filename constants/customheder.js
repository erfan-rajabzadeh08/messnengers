import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import color from "./color";

 const customHeadrButton=props=>{
return<HeaderButton
  {...props}
  IconComponent={FontAwesome6}
  iconSize={23}
  color={props.color ?? color.blue  }
/>
 }


 export default customHeadrButton