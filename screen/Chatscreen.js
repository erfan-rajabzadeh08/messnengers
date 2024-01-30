
import React, { useCallback, useEffect, useState } from 'react';
import { View,Text,StyleSheet, Button, ImageBackground, TextInput, TouchableOpacity, FlatList } from 'react-native';
import  backgroundImage from "../images/droplet.jpeg"
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useSelector } from 'react-redux';
import PageContuinear from '../component/PageContinear';
 import Bubble from '../component/bubble';
import { createchat, sendTextMessage } from '../utlis/chatactions';
import ReplyTo from '../component/ReplyTo';
const Chatscreen = (props) => {

    const[chatusers,setchatusers]=useState([])
    const [massegetext,setmassgetext]=useState("");
    const [chatId,setchatId]=useState(props.route?.params?.chatId);
    const [errorBannerText,setErrorBannerText]=useState("")
    const [replyingTo,setReplyingTo]=useState()
    const userdata=useSelector(state=>state.auth.userdata);
    const storedusers=useSelector(state=>state.users.storedusers );
    const storedchats=useSelector(state=>state.chat.chatsdata)
    const chatMessages=useSelector(state=>{
    if(!chatId)return [];
    const chatMessagesData=state.messages.messagesData[chatId]
    if(!chatMessagesData)return[];
    const messageList=[];
    for(const key in chatMessagesData){
        const message=chatMessagesData[key];
        messageList.push({
        key,
        ...message
        });
    }

    return messageList;
    })

    const chatdata=(chatId && storedchats[chatId]) || props.route?.params?.newchatdata
    const getchattitelfromname=()=>{
        const otheruserId=chatusers.find(uid =>uid !== userdata.userId)
        const otheruserdata= storedusers[otheruserId]
        return otheruserdata &&  `${otheruserdata.firstname} ${otheruserdata.lastname}`
    }

      useEffect(()=>{
    props.navigation.setOptions({
    headerTitle:getchattitelfromname()
    })
     setchatusers(chatdata.users)
    },[chatusers])

    const sendmassage=useCallback(async()=>{

    try {
    let id=chatId
    if(!id){
     id=await createchat(userdata.userId,props.route.params.newchatdata);
     setchatId(id);
    }

   await sendTextMessage(chatId,userdata.userId,massegetext,replyingTo && replyingTo.key );


    } catch (error) {
    console.log(error);
    setErrorBannerText("Message failed to send")
    setTimeout(()=>setErrorBannerText(""),5000)
    }



    setmassgetext("");
    setReplyingTo(null);
    },[massegetext,chatId])
    return (
        <SafeAreaView
    edges={['left','right','bottom']}
    style={styles.container}>
     <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
     <PageContuinear style={{backgroundColor:'transparent'}}>
        {
        !chatId && <Bubble text='this is a new chat. say hi!' type="System" />
        }
        {
        errorBannerText !==""&&<Bubble text={errorBannerText} type="erorr" />
        }
        {
        chatId &&
        <FlatList
        data={chatMessages}
        renderItem={(itemdata)=>{
        const message=itemdata.item;

        const isOwnMessage=message.sentBy===userdata.userId

        const messageType=isOwnMessage ? "myMessage":"theirMessage"

        return <Bubble
           type={messageType}
           text={message.text}
           messageId={message.key}
           userId={userdata.userId}
           chatId={chatId}
           date={message.sentAt}
           setReply={() => setReplyingTo(message)}
           replyingTo={message.replyTo && chatMessages.find(i=>i.key === message.replyTo)}

        />
    }}

    />
}
     </PageContuinear>

      {
        replyingTo &&
        <ReplyTo
        text={replyingTo.text}
        user={storedusers[replyingTo.sentBy]}
        onCancel={()=>setReplyingTo(null)}
        />
      }
     </ImageBackground>
     <View style={styles.inputContiner}>
  <TouchableOpacity style={styles.tachable} onPress={(console.log('prsee'))}>
  <FontAwesome6 name={'plus'} size={24} color={"#3498d1"}  />
  </TouchableOpacity>

  <TextInput style={styles.textbox}
    onChangeText={text=>setmassgetext(text)}
    onSubmitEditing={sendmassage}
    value={massegetext}/>

  {massegetext===("")&& <TouchableOpacity style={styles.tachable} onPress={(console.log('prsee'))}>
       <FontAwesome6 name={'camera'} size={24}  color={"#3498d1"} />
   </TouchableOpacity>}
  { massegetext!==("")&& <TouchableOpacity style={{...styles.tachable,...styles.sendbutoon}} onPress={sendmassage}>
       <FontAwesome6 name={'paper-plane'} size={20}  color={"#ffff"} />
   </TouchableOpacity>}

            </View>
        </SafeAreaView>
        )};


        const styles=StyleSheet.create({
            container:{
                flex: 1,
                flexDirection:"column"

            },
            backgroundImage:{
                flex:1
            },
            inputContiner:{
                flexDirection:"row",
                paddingHorizontal:10,
              paddingVertical:7,
                height:50
            },
            textbox:{
               flex:1,
               paddingHorizontal:12,
               marginHorizontal:15,
               borderWidth:1,
               borderRadius:50,
               borderColor:"#bdc3c7"
            },
            tachable:{
                width:35,
                justifyContent:"center",
                alignItems:"center",
            },
            sendbutoon:{
                borderRadius:50,
                backgroundColor:"#3498d1" ,
            }
        })



export default Chatscreen;