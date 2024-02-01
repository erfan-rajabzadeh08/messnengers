import { getfirebaseapp } from "./firebasehelper";
import {getAuth ,createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, child, ref,set, update} from "firebase/database"
import { authenticate ,logout} from "../store/authSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from "./userAction";

let timer;
export const signUp=(firstname,lastname,email,password)=>{
   return async dispatch=>{
    const app=getfirebaseapp();
    const auth=getAuth(app);
    try {
        const result = await createUserWithEmailAndPassword(auth,email, password);
        const {uid, stsTokenManager}=result.user
        const {accessToken,expirationTime}=stsTokenManager

        const expiryDate=new Date(expirationTime);

       const userdata=await createuser(firstname,lastname,email,uid)
       dispatch(authenticate({token:accessToken,userdata}))
       saveDataToStorage(accessToken,uid,expiryDate);
      } catch (error) {
          console.log(error);
   const errorCode=error.code
   let massege="somthing went wrong"
   if(errorCode==="auth/email-already-in-use"){
     massege="this email is already in use";
   }
    throw new Error(massege);
}
}
}

export const signIn=(email,password)=>{
   return async dispatch=>{
    const app=getfirebaseapp();
    const auth=getAuth(app);
    try {
        const result = await signInWithEmailAndPassword(auth,email, password);
        const {uid, stsTokenManager}=result.user
        const {accessToken,expirationTime}=stsTokenManager

        const expiryDate=new Date(expirationTime);
        const timeNow=new Date();
        const millisecondsUntilExpiry=expiryDate-timeNow;

       const userdata=await getUserData(uid)
       dispatch(authenticate({token:accessToken,userdata}))
       saveDataToStorage(accessToken,uid,expiryDate);

       timer=setTimeout(() => {
         dispatch(userlogout())
       },millisecondsUntilExpiry);

      } catch (error) {
          console.log(error);
   const errorCode=error.code
   let massege="somthing went wrong"
   if(errorCode==="auth/invalid-credential"||errorCode==="auth/user-not-found"){
     massege="this username or password was incorrect";
   }
    throw new Error(massege);
 }
}
}

export const userlogout= ()=>{
   return async dispatch=>{
      await AsyncStorage.removeItem("useData");
      clearTimeout(timer);
      dispatch(logout())
   }
}

export const updatesignedInUserData=async(userId,newData)=>{
   if(newData.firstname && newData.lastname){
      const fullname=` ${newData.firstname} ${newData.lastname}`.toLowerCase()
      newData.fullname=fullname
   }
   const dbref=ref(getDatabase())
   const childref=child(dbref,`users/${userId}`)
   await update(childref,newData)
}



 const createuser=async(firstname,lastname,email,userId)=>{
    const fullname=` ${firstname} ${lastname}`.toLowerCase()
    const userdata ={
        firstname,
        lastname,
        fullname,
        email,
        userId,
        signUpDate:new Date().toISOString()
     };
const dbref=ref(getDatabase())
const childref=child(dbref,`users/${userId}`)
await set(childref,userdata)
return userdata;
}

const saveDataToStorage=(token,userId,expiryDate)=>{
AsyncStorage.setItem("useData",JSON.stringify({
   token,
   userId,
   expiryDate:expiryDate.toISOString()

}))
}