import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

function Login({ onLogin }) {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const user = jwtDecode(credentialResponse.credential);
        onLogin(user);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
}

export default Login;