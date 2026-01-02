import { useState } from "react";
import { useNavs } from "../Contexts/Navs_Context";
import { useAuth } from "../Contexts/Auth_Context";
import { End_Points } from "../Service/endPoints";
import http from "../Service/httpService";

export const useSignin = () => {
  const [signInEmail, setSignInEmail] = useState('');
  const [signInpassword, setSignInpassword] = useState('');

  const { setAlert } = useNavs();

  const signin = async () => {

    if (!signInEmail || !signInpassword) {
      console.log('❌ [SIGNIN] Campos vazios detectados');
      return setAlert({
        open: true,
        message: "All fields must be filled",
        type: 'error'
      });
    }

    try {

      const response = await http.post(
        End_Points.Sing_In_Endpoint(),
        { email: signInEmail, password: signInpassword },
        { withCredentials: true }
      );

      setAlert({
        open: true,
        message: "Login successful",
        type: 'success',
      });

      setTimeout(() => {
        window.location.href = '/Main';
      }, 300);

    } catch (error: any) {

      const msg = error.response?.data?.message || error.message || "Something went wrong";
      
      setAlert({
        open: true,
        message: msg,
        type: 'error',
      });
    }
  };

  return {
    signInEmail, 
    setSignInEmail,
    signInpassword, 
    setSignInpassword,
    signin,
  };
};