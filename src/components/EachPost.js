import React, {Component} from 'react'
import '../styles/pages.css';

import axios from 'axios'

class EachPost extends Component{
    constructor (props){
        super(props)

        this.state={
            posts:[{username:'', post:''}],

           newPost: {flag:'',board_id:'',topic:'',tag:[],creator:'',members:[],posts:[{postid:'',username:'',data:[]}]}
        }

 
    }

    // handlePost = (event) => {
        
    //             fetch('http://192.168.20.97:8080/showboard', {
    //                 method: 'POST',
    //                 body: JSON.stringify(this.state.newPost),
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Access-Control-Allow-Origin":"*"
    //                 }
    //             }).then(response =>
    //                 console.log(response,"Post Entered"));
                
    //             }

    // handlePost = (event) => {
    // let post=  this.state.boards[event.target.name].board_id


    // axios.post('http://192.168.20.97:8080/post', {board_id:boardID} )
    //     .then( response =>
    //     { 
    //         let currentClick=response.data[response.data.length-1]
    //         this.setState({eachPost:currentClick})
    //         console.log("username",this.state.eachPost.username)
    //         console.log("posts",this.state.eachPost.data)
        
    //     // .catch(response=>console.log(response))
    //     })
    // }

componentDidMount(){

        axios.get("http://192.168.20.97:8080/filteredposts")
        .then(response=>
            {
                console.log(response.data[response.data.length-1].username)
                let temp = [{username:'', post:''}]
                temp.push({username:response.data[response.data.length-1].username, post:response.data[response.data.length-1].data})
           
            this.setState({
                posts:temp
            })
            }).catch(response=>console.log(response))
               
        
    }
        
                


     handlePostSend = (event) => {
                    let name = event.target.name;
                    let value = event.target.value;
                    this.setState(prevState => ({ newPost: { ...prevState.newPost, ['post']: value } }))
                    event.preventDefault()
                    // event.target.value=" ";
                }      
                

    
    render(){

        return(
                //  <div className="card" > //style="width: 18rem;">
                // <div className= "card bg-light mb-3">
                // <div className="col-sm-6" class={card.car
                <div class ="row justify-content-center">
                <div class="col-9">
                <div class="card" style={{marginTop: "2rem"}}>
                {/* className={card.cardsize}> */}
                <div class="card-header">
                <div class="commenterImg">
                <img src="https://media.licdn.com/dms/image/C4E0BAQFJWS9dHHT0jA/company-logo_200_200/0?e=2159024400&v=beta&t=WBMIM9eGXy-yXSOJXKZDbq9EL0fv4r9GK6rat3vCSwc" width="30" height="30" alt=""/>
                <b>User Name</b>
                </div>  
                </div>
                <div class="card-body">
                    <h5 class="card-title">Post Title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Tags</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Like</a>
                    <a href="#" class="card-link">Report</a>
                </div>
                <div class="card-body">
             
                 {this.state.posts && this.state.posts.map((posts,index)=>(
                    <ul class="list-group list-group-flush"  key={index}>
                    <div class="card" >
                    <li class="list-group list-group-flush">{posts.username}: {posts.post}</li>
                    {/* {console.log(posts.username)} */}
                    </div>
                    </ul> 
                    ))} 
                
               
                </div>
                </div>
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Message" aria-label="Message" 
                    aria-describedby="basic-addon2" onChange={this.handlePostSend}/> 
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" onClick={this.handlePost} >Post</button>
                    </div>
                    </div>
                </div>
                </div>
        
        )
    }
}

export default EachPost;