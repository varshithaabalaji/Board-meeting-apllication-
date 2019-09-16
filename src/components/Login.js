import React from 'react'
import {Modal,Button,Form, ButtonToolbar,Navbar} from 'react-bootstrap'
import axios from 'axios'

import Register from './Register'
export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      email:'',
      pass:'',
      message:'',
      data:'',
      errors:{
      username:"",
      password:""}
      ,
      username:'',
      password:'',
    //   userlist:[{
    //     emailid:'abc@gmail.com',
    //     password:'abc123'
    //   },
    //   {
    //     emailid:'xyz@gmail.com',
    //     password:'xyz123'
    //   }
    // ],
      
      success:false
    }
   
  }
  // check =() =>{
  //  let username
  //   for(let i=0;i<this.state.userlist.length;i++){
  //     if((this.state.userlist[i].emailid==this.state.email)&&(this.state.userlist[i].password==this.state.pass)){
  //       this.state.success=true;
  //       username = this.state.email
  //       alert("login successful")

  //       localStorage.setItem('username',username)

  //       window.open("http://localhost:3001/dashboard","_self")

  //       break;
  //     }
     
  //   }
   
  // }
  
  post=()=>{
    const error = this.validate();
    console.log(error)
  this.setState({errors:error});
  console.log(this.state.errors)
  if(error) return
  
  
    const response = axios.post('http://192.168.20.87:8003/register/login', {username:this.state.username,password:this.state.password})
    .then(res => {
    
  
  const auth=JSON.parse(JSON.stringify(res.data))
  console.log(auth)
  this.setState({
    data:auth.message
   
 
  })
  
  // localStorage.setItem('username',username)
  if(this.state.data === 'welcome'){
    window.open("http://localhost:3000/dashboard","_self")
    localStorage.setItem('username',this.state.username)
  }
  else{
    this.setState({
    success:true
    })
  }
})

}
//   post=()=>{
//     axios.post('http://192.168.20.139:8003/register/login', {username:this.state.username,password:this.state.password},
//       {    
//       headers: {
//           "Content-Type": "application/json"
//       }
//     }
//   )
 
// }
 handleChange =(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  validate = () =>{
    const errors ={};
    // console.log(this.username)
    if(this.state.username.trim() ==='')
    errors.username ='Username required'
    if(this.state.password.trim() ==='')
    errors.password ='Password required'
    
    
    return Object.keys(errors).length===0?null:errors;
  }
 

    render(){

      
        return(
          
            <div>
            
            <Modal
            {...this.props}
         
            
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
               LOGIN &nbsp;
    
              </Modal.Title>
             
            </Modal.Header>
            <Modal.Body>
             
            {this.state.success?<div style={{color:"red"}}>Invalid username or password</div>:<div></div>}
            <div className="container">
             <Form>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Username</Form.Label>
                
                  <Form.Control type="text" placeholder="username" name="username1" onChange ={this.handleChange}/>
                 {this.state.errors?<div style={{color:"red"}}>{this.state.errors.username}</div>:<div></div>}
                
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password" name="password1" onChange={this.handleChange}/>
                {this.state.errors?<div style={{color:"red"}}>{this.state.errors.password}</div>:<div></div>}
              </Form.Group>
             </Form>
            </div>
             
            </Modal.Body>
            <Modal.Footer>
            <ButtonToolbar>
             
              <Button className="loginButton" onClick={this.post} name="signin">Sign in</Button>
              &nbsp;&nbsp;
              <Button variant="secondary" onClick={this.props.onHide} name="cancel">Cancel</Button>
            </ButtonToolbar>
            </Modal.Footer>
          </Modal>
          
        
            </div>
        
        )
    }
}