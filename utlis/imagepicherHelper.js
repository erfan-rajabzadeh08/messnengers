/* const onSelectImage=async()=>{
    const permissionstatus= await androidcameraPermission()
    if(permissionstatus || Platform.OS=='android'){
      Alert.alert(
        'profile picture',
        'choose an option',
      [
        {text:'Camera', onPress:onCamera },
        {text:'Gallry', onPress:onGallery},
        {text:'Cancel', onPress:()=>{}}
      ]
      )
    }
  }
    const onCamera=()=>{
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
     console.log(image);
      });
    }

    const onGallery=()=>{
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        console.log(image);
      });
    } */