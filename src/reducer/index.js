import {combineReducers} from 'redux';

// const initState={
//     postlist:[]
// }

// export function postsDataRetrieval(state=initState,action){
//     // console.log("abx")
//     if(action.type === "POST_DETAILS"){
        
//         return Object.assign({},state,{
//             postlist:action.payload
//         })
//     }
//     return state;
// }
export function publicDataRetreival(data = [], action) {
    if (action.type === 'PUBLIC_BOARD_DETAILS') {
        console.log(data)
        data = action.payload;
        // console.log("ab");
        // console.log(data);
        return data;
    }

    return data;

}
export function postsDataRetrival(data = [], action) {
    if (action.type === 'POST_DETAILS') {
        data = action.payload;
        // console.log("ab");
        // console.log(data);
        return data;
    }

    return data;
}
export function loginDataRetrival(data = [], action) {
    if (action.type === 'LOGIN_DETAILS') {
        data = action.payload;
        // console.log("ab");
        // console.log(data);
        return data;
    }

    return data;
}

export default combineReducers({
    postsdata: postsDataRetrival,
    logindata: loginDataRetrival,
    publicPostsData: publicDataRetreival
});