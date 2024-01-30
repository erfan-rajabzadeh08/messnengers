import { child, get, getDatabase,push,ref, remove, set, update } from "firebase/database";
import { getfirebaseapp } from "./firebasehelper";

export const createchat=async(loggedinuserid,chatdata)=>{

    const newchatdata={
        ...chatdata,
        createdby:loggedinuserid,
        updatedby:loggedinuserid,
        createdat:new Date().toISOString(),
        updatedat:new Date().toISOString()
    };

    const app=getfirebaseapp();
    const dbref=ref(getDatabase(app));
    const newchat=await push(child(dbref,'chat'),newchatdata)

    const chatusers=newchatdata.users;
    for (let i = 0; i < chatusers.length; i++) {
        const userId = chatusers[i];
        await push(child(dbref,`userchats/${userId}`),newchat.key)
    }

    return newchat.key;

}

export const sendTextMessage=async(chatId,senderId,messageText,replyTo)=>{
    const app=getfirebaseapp()
    const dbRef=ref(getDatabase())
    const messagesRef=child(dbRef,`messages/${chatId}`);


    const messageData={
        sentBy:senderId,
        sentAt:new Date().toISOString(),
        text:messageText
    }

    if(replyTo){
       messageData.replyTo=replyTo
    }


  await  push(messagesRef,messageData);

  const chatRef=child(dbRef,`chat/${chatId}`);
  await update(chatRef,{
    updatedBy:senderId,
    updateAt:new Date().toISOString(),
    lastestMessageText:messageText
  });
}

export const starMessage=async(messageId,chatId,userId)=>{
    try {
        const app=getfirebaseapp()
        const dbref=ref(getDatabase(app))
        const childRef=child(dbref,`userStarredMessages/${userId}/${chatId}/${messageId}`);

        const snapshot= await get(childRef);
        if(snapshot.exists()){
          await remove(childRef)
        }else{
            const starredMessagesData={
             messageId,
             chatId,
             starredAt:new Date().toISOString()
            }
            await set(childRef,starredMessagesData)
        }
    } catch (error) {
           console.log(error);
    }
}