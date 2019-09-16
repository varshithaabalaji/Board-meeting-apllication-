import React from 'react';
import ReadMoreAndLess from 'react-read-more-less';
import axios from 'axios';
import {getPublicBoards, getPublicPostsDetails} from '../action'
import { connect } from 'react-redux'
import '../styles/pages.css';

class Publicboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [
        { title: 'asdsda', username : 'User1', content: 'Cards that show cryptocurrency-related data, including a chart. Can be used for showing other data, such as fiat currency or stock market prices.'},
        { title: 'uywerywue', username : 'User 2', content: 'Cards that show cryptocurrency-related data, including a chart. Can be used for showing other data, such as fiat currency or stock market prices.'},
      ],
      temp_title: '',
      temp_content: '',
      boardLength : 0,
      show : false,
      members : [],
      temp_board : '',
      usernames : [],
      username :'',
      addedname : '',
      names : '',
      temp_added : []
    }
  }

  componentDidMount() {
    // axios.get('http://192.168.20.87:8002/boards/showboards/public')
    //     .then(response => {
    //         const data = JSON.parse(JSON.stringify(response.data));
    //         this.setState({
    //           boards : data 
    //         });
    //     })
    this.props.getPublicPostsDetails();
        axios.get('http://192.168.20.87:8003/register/usernames')
        .then(response => {
            const data = JSON.parse(JSON.stringify(response.data));
            this.setState({
                usernames: data
            });
        })    
  }

  componentDidUpdate() {
    axios.get('http://192.168.20.97:8080/showboard')
        .then(response => {
            const data = JSON.parse(JSON.stringify(response.data));
            this.setState({
              boards : data,
              boardLength : data.length + 1001 
            });
        })
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
    console.log(this.state.temp_added)
    const postData = {
      flag : 'private',
      board_id : this.state.boardLength,
      topic : this.state.temp_title,
      creator : localStorage.getItem("username"),
      members : this.state.temp_added,
      posts : [{
       postid : 1,
       username : this.state.temp_title,
       data : [this.state.temp_content],
       }]
    };
    current.push({ title: this.state.temp_title, content: this.state.temp_content})
     axios.post('http://192.168.20.97:8080/addboard', postData , axiosConfig)
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
    for (var i = 0; i < this.state.usernames.length; i++) {
        let flag = 0
        for (var j = 0; j < postName.length; j++) {
            if (this.state.usernames[i].name[j] !== postName[j]) { flag = 1; }
        }
        if (flag == 0) {
            namesArr.push(this.state.usernames[i].name)
            //console.log(namesArr)
            this.forceUpdate()

        }
        // console.log(this.state.names)
    }
    this.setState({
        names: namesArr
    })
}

//   createPost = () => {
//     this.setState({
//       show:true
//     })
//   }

//   posted = () => {
//     this.setState({
//       show:false
//     })
//   }

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

  render() {
    let userList = []
        for(var i = 0; i<this.state.names.length;i++){
            userList.push(
              <div class="list-group-item" name="addedname" value={this.state.addedname} onChange={this.handleChange} onClick = {this.addMembers}>{this.state.names[i]}</div>
            )
        }    

    let posts =
    <form class = "form-group">  
    <center> 
    <input placeholder = "Discussion Title" class = "form-control" type="text" name="temp_title" value={this.state.temp_title} onChange={this.handleChange} style = {{width : '35rem'}}/><br /><br />
    </center>
    <center>
    <textarea placeholder = "What's on your mind" class = "form-control" name="temp_content" value={this.state.temp_content} onChange={this.handleChange} style = {{width : '35rem', height : '10rem'}}/><br /> <br />
    </center>
    <center> 
    <input placeholder = "Added Members" class = "form-control" type="text" name="temp_added" value={this.state.temp_added} onChange={this.handleChange} style = {{width : '35rem'}}/><br /><br />
    </center>
    <center>
    <input type = "text" placeholder = "Manage who can see your board" class = "form-control" ref="username" type="text" name="userN" onChange={this.handleChangeUser} style = {{width : '35rem'}}/>
    </center>
    <br /><br />
    <center><div class="list-group">{userList}</div></center>
    <button class="btn btn-outline-info" onClick = {this.handleSubmit}>Post Discussion</button>
  </form> 




    let list = this.props.boards.map(
      i => {
          let bid = i.boardid
        return <div className="container" style = {{width : '60rem', padding: '2px 16px'}}>
          <hr />
          <div class="blog-card" >
            <div>
              <div >
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
                
                <button class="btn" style = {{backgroundColor : '#008080', color : '#fff'}} onClick = {()=>this.openDiscussion(bid)}>Open Discussion</button><br />&nbsp;&nbsp;
                <br /> <br />

              </div> 
            </div>
          </div>

          <br />
        </div>
    
    });


    const image_url = 'C:/Users/verizon/Pictures/th4OUVO0N7.jpg';

    return (
     
        <div className="container" style = {{padding: '2px 16px'}}>
            <br />
            <h2> Veriboard Discussion Forums</h2>
            <h4> Ask. Discuss. Learn.</h4> <br />
            {/* <button class="btn btn-outline-danger center-block" name = "create" onClick = {this.createPost} style = {{float : 'left'}}>Create Post</button>   */}
          {/* <br/ > <br /> */}
         {this.state.show?posts:<div></div>}
        <center>{list}</center>
        </div>
    )  
      {/* </div>
      //</div>
      <div class = "column" style = {{ float: 'left', width: '25%'}}> </div>
          // background: "#466368",
          // background: "-webkit-linear-gradient(#648880, #293f50)",
          // background:    "-moz-linear-gradient(#648880, #293f50)",
          // background:         "linear-gradient(#648880, #293f50)"
          // background: "#648880",
          // background: "linear-gradient(to top, #000, #648880, #293f50)"
      </div> */}
  }
}
const mapStateToProps = state => ({ boards: state.publicPostsData });
export default connect(mapStateToProps, { getPublicPostsDetails : getPublicPostsDetails})(Publicboard);
// style = {{width : '50rem' ,align: 'center', rgba:'(0,0,0,0.2)',transition: '0.3s', borderWidth : 'medium'}}