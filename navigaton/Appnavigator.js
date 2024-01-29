import React from "react";
import {NavigationContainer} from "@react-navigation/native"
import Mainnavigator from "./Mainnavigator";
import Authscreen from "../screen/Authscreen";
import { useSelector } from "react-redux";
import Startscreen from "../screen/StartUpScreen";


const Appnavigator= (props) => {
    const isAuth = useSelector(state=>state.auth.token!==null && state.auth.token!=="")
    const didTryAutoLogin=useSelector(state =>state.auth.didTryAutoLogin);
return(
    <NavigationContainer>
{isAuth && <Mainnavigator />}
{!isAuth &&didTryAutoLogin&&<Authscreen/>}
{!isAuth &&!didTryAutoLogin&&<Startscreen/>}
    </NavigationContainer>

)


}
export default Appnavigator;