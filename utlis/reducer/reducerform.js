export const reducer=(state,action)=>{
    const {validationresulte, inputid, inputvalue }=action;
    const updatvaluse={
      ...state.inputValues,
      [inputid]:inputvalue
      };


    const updatevalidatistes={
    ...state.inputValidities,
    [inputid]:validationresulte
    };
    let updateformisvalidate=true;
for(const key in updatevalidatistes){
  if(updatevalidatistes[key] !== undefined){
    updateformisvalidate=false;
    break;
  }
}
return{
  inputValues:updatvaluse,
  inputValidities:updatevalidatistes,
formisvalid:updateformisvalidate
}
}
