import { child, get, getDatabase, ref } from "firebase/database"
import { getfirebaseapp } from "./firebasehelper";

export const getUserData=async(userId) =>{
try {
    const app=getfirebaseapp()
    const dbref=ref(getDatabase(app));
    const userRef=child(dbref,`users/${userId}`)

    const spanshot=await get(userRef)
    return spanshot.val();
} catch (error) {
console.log(error);
}

}







