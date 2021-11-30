import { green, yellow } from '@mui/material/colors';
import React from 'react';
import "../css/login.css";

class Signup extends React.Component {

    state={
    email:"",
    password:"",
    confirmPassword:"",
    };

    setEmail = (e)=>{
        if(RegExp("/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/").test(e.target.value))
        {
            return true;
        }
        else{
            return false;
        }
    }
    
    setPassword =(e)=>{
        const strongRegex= new RegExp("^(?=.*[a.z])(?=.*[A.Z])(?=.*[0-9])(?=.*[!@#\^&\*])(?=.{8,})");
        const mediumRegex =new RegExp("^(((?=.*[a.z])(?=.*[A.Z]))|((?=.*[0-9])(?=.*[A.Z]))|((?=.*[A.Z])(?=.*[a.z])))(?=.{6,})");
        
        if(strongRegex.test(e.target.value)){
           // e.target.style.background-color = green; 
           //UNCOMMENT WHEN LEARNT HOW TO RENDER
        }
        else if(mediumRegex.test(e.target.value)){
            //e.target.style.background-color = yellow;
        }
        else{
            //e.target.style.background-color=red;
        }

        if(e.length<8){
            return false;
        }
        else{
            this.state.password=e.target.value;
            return true;
        }
    }

    setConfirmPassword =(e)=>{
        this.state.confirmPassword=e;
    }

    CheckPassword=(p1)=>{
        this.setConfirmPassword(p1.target.value)
        if(this.state.confirmPassword!=this.state.password) return false;
        else return true;
    }
    render() { 
        return (<div class="Signup">
                <h2>SIGN UP</h2>
                <form class="Signup_Form"> {/*Action will be used here to send the data*/}
                <label for="email">EMAIL</label>
                <input 
                type='text' 
                id="email" 
                name="email" 
                value={this.state.email} 
                onChange={(e)=>this.setEmail(e.target.value)} 
                placeholder="example123@gmail.com" required/>
                
                <label for="password">PASSWORD</label>
                <input 
                type='text' 
                id="password" 
                name="password" 
                onChange={(e)=>this.setPassword(e)}
                placeholder="Min. 8 characters"
                value={this.state.password} required/>

                <label for="cpassword">CONFIRM PASSWORD</label>
                <input type='text' 
                id="cpassword" 
                name="cpassword" 
                onChange={(e)=>this.CheckPassword(e)}
                value={this.state.confirmPassword} required/>

                <label for="fname">FIRST NAME</label>
                <input type='text' 
                id="fname" 
                name="fname" 
                required/>
                
                <label for="lname">LAST NAME</label>
                <input type='text' 
                id="lname" 
                name="lname" 
                required/>
                
                <label for="city">CITY</label>
                <input type='text' 
                id="city" 
                name="city" 
                required/>
                
                <label for="address">BILLING ADDRESS</label>
                <input type='text' 
                id="address" 
                name="address" 
                required/>
                {/*We can put checks on password later like min. 8 words if we have time*/}
                <input type ="Submit" value="CREATE AN ACCOUNT!" class="Signup_button"/>
                </form>
        </div>);
    }
}
 
export default Signup;