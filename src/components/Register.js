import React,{Component} from 'react'
import {Modal,Button,ButtonToolbar,Form} from 'react-bootstrap'
import axios from 'axios'




export default class Register extends Component{
  constructor(props){
    super(props);
    this.state ={
      pass:'',
      pass1:'',
      success:true,
      firstname:'',
      lastname:'',
      username:'',
      email:'',
      password:'',
      data:'',
      errors:{},
     boards:[],
     strength:"",
    

    }
    
      
    
  }
  
  
 
  handleChange =(e)=>{
    this.setState({
      [e.target.name]:e.target.value
     
    }
    )
    
    if(e.target.name==="password"){
      if(this.state.password.length<=2){
      this.setState({
        strength:"Password strength is weak"
      })}
      else if(this.state.password.length>2 && this.state.password.length<=5){
        this.setState({
          strength:"Password strength is medium"
        })
      }
      else{
        this.setState({
          strength:"Password strength is strong"
        })
      }
    }
    
  }
  validate = () =>{

    
    const errors ={};
    // console.log(this.username)
    if(this.state.firstname.trim() ==='')
    errors.firstname ='Firstname required'

    if(this.state.lastname.trim() ==='')
    errors.lastname ='Lastname required'

    if(this.state.username.trim() ==='')
    errors.username ='Username required'

    if(this.state.email.trim() ==='')
    errors.email ='Email id required'

    if(this.state.password.trim() ==='')
    errors.password ='Password required'
    
    return Object.keys(errors).length===0?null:errors;
  }
  
    
 handleSubmit =() =>{ 
  
  const errors = this.validate();
    
  this.setState({errors});
  if(errors) return
  else{
  
    if(this.state.password===this.state.pass1){
    
    
        
        const response = axios.post('http://192.168.20.87:8003/register/', {firstname:this.state.firstname,lastname:this.state.lastname,username:this.state.username,email:this.state.email,password:this.state.password,boards:this.state.boards},)
        .then(res => {
        
      
      const auth=JSON.parse(JSON.stringify(res.data))
      console.log(auth)
      this.setState({
        data:auth.message
      
      })
      console.log(this.state.data)
    
     
      console.log(this.state.data)
    if(this.state.data=="User registered successfully"){
      alert("User registered successfully")
      this.props.onHide()
      
    }
    else{
      alert("User already exists")
    }
  })
  }
    
    else{

      this.setState({
        success:false
        
    
      })
    }
    
 
  }
}

    render(){
      let weak=<div style={{color:"red"}}>{this.state.strength}</div>
      if(this.state.strength==="Password strength is medium")
       weak=<div style={{color:"#6d4af7"}}>{this.state.strength}</div>
       else if(this.state.strength==="Password strength is strong")
      weak=<div style={{color:"green"}}>{this.state.strength}</div>

        return(
            <div>
            <Modal
            {...this.props}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
               REGISTER
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="container">
             <Form >
              <Form.Group controlId="formGroupEmail">
                <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" name="firstname" placeholder="FirstName" onChange={this.handleChange}/>
                  {this.state.errors?<div style={{color:"red"}}>{this.state.errors.firstname}</div>:<div></div>}
              </Form.Group>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text"  name="lastname" placeholder="LastName" onChange={this.handleChange}/>
                {this.state.errors?<div style={{color:"red"}}>{this.state.errors.lastname}</div>:<div></div>}
            </Form.Group>

            <Form.Group controlId="formGroupEmail">
              {/* {this.state.data?<div style={{color:"red"}}>Username exists</div>:<div></div>} */}
            <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username"placeholder="abc_123" onChange={this.handleChange}/>
              {this.state.errors?<div style={{color:"red"}}>{this.state.errors.username}</div>:<div></div>}
            </Form.Group>

            <Form.Group controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="abc@example.com"onChange={this.handleChange}/>
              {this.state.errors?<div style={{color:"red"}}>{this.state.errors.email}</div>:<div></div>}
            </Form.Group>
           
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"   placeholder="password" name="password" onChange={this.handleChange}/>
               {weak}
              </Form.Group>
              {this.state.errors?<div style={{color:"red"}}>{this.state.errors.password}</div>:<div></div>}
             {this.state.success?<div></div>:<div style={{color:"red"}}>Passwords don't match</div>}
              <Form.Group>
                <Form.Label >Retype Password</Form.Label>
                <Form.Control type="password" placeholder="retype-password" name="pass1" onChange={this.handleChange}/>
              </Form.Group>
             
             </Form>
            </div>
             
            </Modal.Body>
            <Modal.Footer>
            <ButtonToolbar>
              <Button onClick={this.handleSubmit}name="signup">Sign Up</Button>
              &nbsp;&nbsp;
              <Button variant="secondary" onClick={this.props.onHide} name="cancel">Cancel</Button>
            
            </ButtonToolbar>
            </Modal.Footer>
          </Modal>
            </div>
        )
        }
    }

   
