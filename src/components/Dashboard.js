import React from 'react';
import ReadMoreAndLess from 'react-read-more-less';
import axios from 'axios'
import { getPostsDetails} from '../action';
import {getUsersDetails} from '../action'
import { connect } from 'react-redux';
import '../styles/pages.css';
class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts : [],
      temp_title: '',
      temp_content: '',
      show : false,
      members : [],
      temp_board : '',
      username :'',
      addedname : '',
      names : '',
      temp_added : []
    }
  }

  componentDidMount() {
    this.props.getPostsDetails();
    this.props.getUsersDetails();  
  }

  componentDidUpdate() {
      //this.props.getPostsDetails();
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = (event) => {
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json'
      }
    }
    let current = this.state.posts.slice();
    console.log(this.state.temp_added )
    const postData = {
      flag : 'private',
      topic : this.state.temp_title,
      creator : "raghuls",
      members : this.state.temp_added,
      posts : [{
       postid : 1,
       username : this.state.temp_title,
       data : this.state.temp_content,
       showpost : false
       }]
    };
    current.push({ title: this.state.temp_title, content: this.state.temp_content})
     axios.post('http://192.168.20.87:8002/boards/addboard', postData , axiosConfig)
     .then(res => {
     })
    this.setState({
      posts: current,
      temp_title: '',
      temp_content: '',
      show : false
    })
    event.preventDefault();
  }

  handleChangeUser = (userN) => {
    console.log(this.refs.username.value)
    let postName = this.refs.username.value
    let namesArr = []
    this.setState({
        names: []
    })
    for (var i = 0; i < this.props.usernames.length; i++) {
        let flag = 0
        for (var j = 0; j < postName.length; j++) {
            if (this.props.usernames[i].name[j] !== postName[j]) { flag = 1; }
        }
        if (flag == 0) {
            namesArr.push(this.props.usernames[i].name)
            this.forceUpdate()

        }
    }
    this.setState({
        names: namesArr
    })
}

  createPost = () => {
    this.setState({
      show:true
    })
  }

  handleCancel = () => {
    this.setState({
      show:false
    })
  }
  posted = () => {
    this.setState({
      show:false
    })
  }

  openDiscussion = (bid) =>{
    window.open("http://localhost:3000/viewpost", "_self")
    localStorage.setItem("boardId", bid)
  }

  addMembers = (evt) => {
    console.log(evt.currentTarget.textContent)
    let value = evt.currentTarget.textContent
     let addedArr = this.state.temp_added
    let added = value
    console.log(this.refs.addedname)
    addedArr.push(added)
    this.setState({
         temp_added : addedArr
     })
  }

  removeUser = (name) => {
    console.log(name)
    this.setState({
      temp_added: this.state.temp_added.filter(el => el !== name)
  })
  }

  render() {
    let userList = []
        for(var i = 0; i<this.state.names.length;i++){
            userList.push(
              <div class="list-group-item" name="addedname" value={this.state.addedname} onChange={this.handleChange} onClick = {this.addMembers}>{this.state.names[i]}</div>
            )
       }
    
    let addedUsers = []
      for(var i=0;i<this.state.temp_added.length;i++){
          let name = this.state.temp_added[i]
          addedUsers.push(<span><span class = "border border-danger rounded"  onClick={() => this.removeUser(name)}>{this.state.temp_added[i]}&nbsp;<span style = {{color:'white', backgroundColor :'#CD040B'}}> X </span></span>&nbsp;</span>)
      }    

      let emptyAddedUsers = 
          <div style = {{float : 'left', color : 'grey'}}>
            Added Members
          </div>

    let posts =
    <form class = "form-group">  
    <center> 
    <input placeholder = "Discussion Title" class = "form-control" type="text" name="temp_title" value={this.state.temp_title} onChange={this.handleChange} style = {{width : '35rem'}}/><br /><br />
    </center>
    <center>
    <textarea placeholder = "What's on your mind" class = "form-control" name="temp_content" value={this.state.temp_content} onChange={this.handleChange} style = {{width : '35rem', height : '10rem'}}/><br /> <br />
    </center>
    <center> 
    </center>
    <center>
    <input type = "text" placeholder = "Manage who can see your board" class = "form-control" ref="username" type="text" name="userN" onChange={this.handleChangeUser} style = {{width : '35rem'}}/>
    </center>
    <center><div class="list-group" style = {{width :'50%'}}>{userList}</div></center>&nbsp;
    <center><div class = "card"  style = {{width: '50%'}}><div class = "card-body" >{this.state.temp_added.length!=0?addedUsers:emptyAddedUsers}</div></div></center>
    <button class="btn btn-outline-danger" onClick = {this.handleSubmit}>Post Discussion</button>&nbsp;&nbsp;&nbsp;
    <button class="btn btn-outline-danger" onClick = {this.handleCancel}>Cancel</button>&nbsp;
  </form> 




    let list = this.props.boards.map(
      i => {
        return <div className="container" style = {{width : '60rem', padding: '2px 16px'}}>
          <hr />
          <div  >
            <div >
              <div class="blog-card" >
                <h4 class = "card-title title-color">
                  <center> {i.topic}</center>
                  </h4>
                <h6 class="card-subtitle mb-2 text-muted">{i.creator}</h6>
                <ReadMoreAndLess
                ref={this.ReadMore}
                className="read-more-content"
                charLimit={50}
                readMoreText="Read more"
                readLessText="Read less"
                >
                {i.posts[0].data}
                </ReadMoreAndLess>
                <br />&nbsp;&nbsp;
                 <br /> <br />
                <button class="btn btn-outline-info" style={{borderRadius: "0"}} onClick = {()=>this.openDiscussion(1)}>Open Discussion</button>

              </div> 
            </div>
          </div>

          <br />
        </div>
    });

    list.reverse()

    return (
        <div className="container" style = {{padding: '2px 16px'}}>
            <br />
            <h2> Veriboard Discussion Forums</h2>
            <h4> Ask. Discuss. Learn.</h4> <br />
    {this.state.show == false?<button class="btn btn-outline-info center-block" name = "create" onClick = {this.createPost} style = {{float : 'left'}}>Create Post</button>:<div></div>}  
          <br/ > <br />
         {this.state.show?posts:<div></div>}
        <center>{list}</center>
        </div>
    )  
  }
}


const mapStateToProps = state => ({ boards: state.postsdata, usernames : state.usersdata });
export default connect(mapStateToProps, { getPostsDetails, getUsersDetails})(Dashboard);

// style = {{width : '50rem' ,align: 'center', borderColor : 'grey',transition: '0.3s', borderWidth : 'small'}}