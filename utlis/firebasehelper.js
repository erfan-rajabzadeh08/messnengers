import { initializeApp } from "firebase/app";


export const getfirebaseapp=()=>{
    const firebaseConfig = {
        apiKey: "AIzaSyCtHVhtclqWh00LqN5RnMEEHAXsnIp44j4",
        authDomain: "messages-erfan.firebaseapp.com",
        projectId: "messages-erfan",
        storageBucket: "messages-erfan.appspot.com",
        messagingSenderId: "111127143184",
        appId: "1:111127143184:web:634d8866e5062d42fefb95",
        measurementId: "G-5FQFL747FW"
      };
      return initializeApp(firebaseConfig);





}