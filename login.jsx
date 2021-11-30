import React from 'react';
import "../css/login.css";

class Login extends React.Component {
    render() { 
        return (<div class="Login">
                <h2>LOGIN</h2>
                <form class="Login_Form"> {/*Action will be used here to send the data*/}
                <label for="email">EMAIL</label>
                <input type='text' id="email" name="email" placeholder="example123@gmail.com" required/>
                <label for="password">PASSWORD</label>
                <input type='text' id="password" name="password" required/>
                {/*We can put checks on password later like min. 8 words if we have time*/}
                <input type ="Submit" value="LOGIN!" class="Login_button"/>
                </form>
        </div>);
    }
}
 
export default Login;
