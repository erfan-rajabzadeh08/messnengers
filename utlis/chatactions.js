import { child, getDatabase,push,ref, update } from "firebase/database";
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

export const sendTextMessage=async(chatId,senderId,messageText)=>{
    const app=getfirebaseapp()
    const dbRef=ref(getDatabase())
    const messagesRef=child(dbRef,`messages/${chatId}`);


    const messageData={
        sentBy:senderId,
        sentAt:new Date().toISOString(),
        text:messageText
    }
  await  push(messagesRef,messageData);

  const chatRef=child(dbRef,`chat/${chatId}`);
  await update(chatRef,{
    updatedBy:senderId,
    updateAt:new Date().toISOString(),
    lastestMessageText:messageText
  });
}
