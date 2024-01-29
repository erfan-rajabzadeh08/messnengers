import { child, endAt, get, getDatabase, orderByChild, query, ref, startAt } from "firebase/database"
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
export const searchuser =async (querytext)=>{
  const searchterm=querytext.toLowerCase();
  try {
    const app=getfirebaseapp()
    const dbref=ref(getDatabase(app));
    const userRef=child(dbref,'users');
    const queryRef=query(userRef,orderByChild('fullname'),startAt(searchterm),endAt(searchterm + "\uf8ff ") )
    const snapshot =await get(queryRef);
    if(snapshot.exists()){
        return snapshot.val();
    }
    return{}
  } catch (error) {
  console.log(error);
  throw error;

  }

}






