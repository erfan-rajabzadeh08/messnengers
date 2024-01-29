import {validate} from "validate.js";

export const validatestring =(id,value)=>{
    const constraints={
        presence: {allowEmpty: false}
        }
        if(value !==""){
          constraints.format={
            pattern: "[a-z]+",
            flags: "i",
         message: "value can only contain letters"
          }
        }
       const validateresulte= validate({ [id] :value} , {[id]:constraints});
           return validateresulte &&validateresulte[id];
        }

        export const validatelength =(id,value,minlength,maxlength,allowEmpty)=>{
            const constraints={
                presence: {allowEmpty}
                }
                if(!allowEmpty ||value !==""){
                  constraints.length={ }
                  if(minlength !=null){
                    constraints.length.minimum=minlength
                  }
                  if(maxlength!=null){
                    constraints.length.maximum=maxlength
                  }

                }
               const validateresulte= validate({ [id] :value} , {[id]:constraints});
                   return validateresulte &&validateresulte[id];
                }

        export const validateEmail =(id,value)=>{
        const constraints={
            presence: {allowEmpty: false}
            }
            if(value !==""){
                constraints.email=true
            }
            const validateresulte= validate({ [id] :value} , {[id]:constraints});
                return validateresulte &&validateresulte[id];
            }
        export const validatePassword =(id,value)=>{
            const constraints={
                presence: {allowEmpty: false}
                }
                if(value !==""){
                    constraints.length={
                        minimum:6,
                        message:"must be at least 6 characters "
                    }
                }
                const validateresulte= validate({ [id] :value} , {[id]:constraints});
                    return validateresulte &&validateresulte[id];
                }