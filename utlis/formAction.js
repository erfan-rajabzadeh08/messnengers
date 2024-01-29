import { validateEmail, validatePassword, validatelength, validatestring } from "../utlis/validationConstraints";


export const validateInput=(inputid,inputvalue)=>{
    if(inputid==="firstname"||inputid==="lastname"){
        return validatestring(inputid,inputvalue);
            }
            else if(inputid==="email"){
              return validateEmail(inputid,inputvalue);
            }
            else if(inputid==="password"){
              return validatePassword(inputid,inputvalue);
            }
            else if(inputid==="about"){
              return validatelength(inputid,inputvalue,0,150,true);

            }
}