import axios from "./customize_axios";

//auth
const postLogin = (Username, Password) => {    
    const data = new FormData(); 
    data.append('Username', Username);
    data.append('Password', Password);
    return axios.post(`api/auth/login`, data);  
}
//Category
const getAllCategori = () => {
    return axios.get(`api/categories`); 
}

const getCategoryById = (id) => {
    const data = new FormData();
    data.append('id', id);  
    return axios.get(`api/categories/`+id, data);
}


//Post
const getAllPost = () => {
    return axios.get(`api/post`); 
}
// Tag
const getTagById = (id) => {
    const data = new FormData();
    data.append('id', id);
    return axios.get(`api/tag/`+id, data); 
}



export { 
    postLogin, 
    getAllCategori,
    getAllPost,
    getCategoryById,
    getTagById
 };