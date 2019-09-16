import axios from 'axios'
export function showPostsAction(filteredPosts){
    return {
        type:'SHOW_POSTS',
        payload:filteredPosts
    }
}

export function getPosts(data){
    // console.log("here1")
    return{
        type: "POST_DETAILS",
        payload : data
    };
}

export function getUsers(data) {
    return{
        type : "USER_DETAILS",
        payload : data
    }
}


export function getPublicBoards(data){
    return{
        type: "PUBLIC_BOARD_DETAILS",
        payload : data
    }
}

export function showFilteredPosts(){


    return function(dispatch){
    let boardID=localStorage.getItem("boardId")
    console.log("In actions" ,boardID)
    axios.get("http://192.168.20.87:8002/boards/getpostsbyid/"+boardID)
    .then(response=>
        {
            let posts=[{'username':'', 'data':''}]
            console.log(response.data)
            for(let index=0; index<response.data.length; index++){
                console.log("index", index)
            posts.push({username:response.data[index].username, 
                data:response.data[index].data})
            }
            dispatch(showPostsAction(posts))
        })
        .catch(response=>console.log(response))
    }
}

export function getPostsDetails(){
    const URL="http://192.168.20.87:8002/boards/showboards/sahila";
    // console.log("here")
    return function (dispatch) {
        // console.log("1")
        return fetch(URL)
        .then(
            response => response.json(),
            error => console.log("An Error Occured",error)
        )
        .then(
            
            data=>{
                // console.log(data)
                dispatch(getPosts(data));
            },
            error=>console.log("An Error Occured",error)
        )
    }
}


export function getUsersDetails(){
    const URL="http://192.168.20.87:8003/register/usernames";
    // console.log("here")
    return function (dispatch) {
        // console.log("1")
        return fetch(URL)
        .then(
            response => response.json(),
            error => console.log("An Error Occured",error)
        )
        .then(
            
            data=>{
                //console.log(data)
                dispatch(getUsers(data));
            },
            error=>console.log("An Error Occured",error)
        )
    }
}

export function getPublicPostsDetails(){
    const URL="http://192.168.20.87:8002/boards/showboards/public";
    // console.log("here")
    return function (dispatch) {
         console.log("1")
        return fetch(URL)
        .then(
            response => response.json(),
            error => console.log("An Error Occured",error)
        )
        .then(
            
            data=>{
                // console.log(data)
                dispatch(getPublicBoards(data));
            },
            error=>console.log("An Error Occured",error)
        )
    }
}
