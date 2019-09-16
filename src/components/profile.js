import React from 'react'
import axios from 'axios'
import '../styles/profile.module.css'
import { Link } from 'react-router-dom'
import '../styles/pages.css';

export default class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            user: '',
            boards: []
        }
    }
    componentDidMount() {
        axios.get('http://192.168.20.97:8080/showboard')
            .then(response => {
                this.setState({
                    boards: response.data
                })
            }).catch(error => console.log(error))
            this.setState({
                user: localStorage.getItem("username")
            })
    }
    render() {

        let boards = []
        let posts = []
        for (let i = 0; i < this.state.boards.length; i++) {
            if (this.state.boards[i].creator === this.state.user) {
                boards.push(
                    // <div className="card" style={{ width: 400 }}>
                    //     <div className="card-body">
                    //         <h5 className="card-title">Topic: {this.state.boards[i].topic}</h5>
                    //         <h6 className="card-subtitle mb-2 text-muted">Board_ID: {this.state.boards[i].board_id}</h6>
                    //         <h6 className="card-subtitle mb-2 text-muted">posts: {this.state.boards[i].posts[0].data}</h6>
                    //         <div className="row">
                    //             <div className="col">
                    //                 <a href="#" className="card-link">Go To Board</a>
                    //             </div>
                    //             <div className="col">
                    //                 <button type="button" className="btn btn-outline-danger">Close Board</button>
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div>
                    <div>
                    <div class="card">
                        <h5 class="card-header"><h6>Topic : {this.state.boards[i].topic}</h6></h5>
                        <div class="card-body">
                            <h6 class="card-title">Board_ID : {this.state.boards[i].board_id}</h6>
                            <p class="card-text">{this.state.boards[i].posts[0].data}</p>
                            <div className="row">
                                <div className="col-sm-9">
                                    <Link to='/viewpost' class="btn btn-primary">View Board</Link>
                                </div>
                                <div className="col-sm-3">
                                    {/* <Link to='/viewpost' class="btn btn-primary">View Board</Link> */}
                                    <button type="button" className="btn btn-outline-danger">Close Board</button>
                                </div>
                            </div>
                            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                        </div>
                    </div><br/>
                    </div>
                )
            }
        }
        for (let i = 0; i < this.state.boards.length; i++) {
            for (let j = 0; j < this.state.boards[i].posts.length; j++) {
                if (this.state.boards[i].posts[j].username === this.state.user) {
                    posts.push(
                        <div class="card" style={{ width: 400 }}>
                            <div class="card-header">
                                <h6>Post_ID:  {this.state.boards[i].posts[j].postid}</h6>
                            </div>
                            <div class="card-body">
                                <p class="card-text">{this.state.boards[i].posts[j].data[0]}</p>
                                <footer class="blockquote-footer">from the discussion topic <cite title="Source Title">{this.state.boards[i].topic}</cite></footer>
                                <Link to='/viewpost' class="btn btn-primary">View Post</Link>
                            </div>

                        </div>
                    )
                }
            }

        }

        return (
            <div style={{backgroundImage: "url(https://www.pixelstalk.net/wp-content/uploads/2016/05/Free-Silver-Backgrounds-Images-Download.png)"}}>
            <div className="container">
                <div className="toppane">
                    <div class="row">
                        <div class="col-sm-11"><h1 className="display-3">VeriBoard</h1></div>
                        {/* <div class="col-sm-1"><button type="button" class="btn btn-outline-primary btn-xs">LogOut</button></div> */}
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-3">
                        <img src="https://image.flaticon.com/icons/png/512/21/21294.png" alt="user's DP" width="200" height="150" />
                        <br /><table><th>UserName </th><th> <h6>: {this.state.user}</h6></th>
                        </table>
                    </div>
                    {/* <div className="col">
                        <h3>List of Contributions to Groups</h3>
                        {posts}
                    </div> */}
                    <div className="col">
                        <h3>My Boards </h3>
                        {boards}<br/>
                        {/* <h5>Closed Boards </h5> */}
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
