
import { GoogleLogin } from 'react-google-login';


const handleGoogleLogin = async (googleResponse) => {
    const tokenId = googleResponse.tokenId;
  };



  <GoogleLogin
  clientId="651236571845-lv9cr9m7cve4mb9hvl92dmc85rqkq2n3.apps.googleusercontent.com"
  buttonText="Login with Google"
  onSuccess={response => handleGoogleLogin(response)}
  onFailure={response => console.error('Google Login Failed:', response)}/>