import { PermissionsAndroid ,Platform } from "react-native"
import { getfirebaseapp } from "../utlis/firebasehelper";
import uuid from 'react-native-uuid';
import { ref  } from "firebase/database";
import { ref as sRef } from 'firebase/storage';
import { getDownloadURL, getStorage, uploadBytesResumable } from "firebase/storage";

export const uplodimageAsync=async (uri)=>{
const app=getfirebaseapp();
const blob=await new Promise((resolve,reject)=>{
     const xhr=new XMLHttpRequest();
     xhr.onload=function(){
        resolve(xhr.response);
     };
     xhr.onerror=function(e){
        console.log(e);
        reject(new TypeError("NetWork request failed"));
     };
    xhr.responseType="blob";
    xhr.open("GET",uri,true)
    xhr.send();
});

const pathfolder='profilePics';
const storegeRef=sRef(getStorage(app),`${pathfolder}/${uuid.v4()}`)
await uploadBytesResumable(storegeRef,blob);
blob.close();

return await getDownloadURL(storegeRef )
}
export const androidcameraPermission=()=>new Promise(async(resolve,reject)=>{
    try{
        if(Platform.OS==='android'){
            const granted=await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            ]);
            console.log(granted,'granted response')
            if(
                granted['android.permission.CAMERA']!=='granted' ||
                granted['android.permission.WRITE_EXTERNAL_STORAGE'] !=='granted'||
                granted['android.permission.READ_EXTERNAL_STORAGE'] !=='granted'
            ){
                showErorr("Dont have permistion pleass allow permission")
                return resolve(false);
            }
            return resolve(true)
        }
        return resolve(true)
    }catch(error){
        return resolve(false);
    }
})