import axios from "./customize_axios";

//Account/Auth
const postLogin = (Username, Password) => {    
    const data = new FormData(); 
    data.append('Username', Username);
    data.append('Password', Password);
    return axios.post(`api/auth/login`, data);  
}
const logoutApi = () => {
    return axios.post(`api/auth/logout`);
}

const Register = () => {
    const data = new FormData();
    data.append('username', Username);
    data.append('email', Email);
    data.append('password', Password);
    return axios.post(`api/auth/register`, data);
}

const getAllUser = () => {
    return axios.get(`api/user`);
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

const getPostById = (id) => {
    const data = new FormData();
    data.append('id', id);
    return axios.get(`api/post/`+id, data);
}
// Tag
const getTagById = (id) => {
    const data = new FormData();
    data.append('id', id);
    return axios.get(`api/tag/`+id, data); 
}

const getAllTag = () => {
    return axios.get(`api/tag`); 
}



export { 
    postLogin, 
    getAllCategori,
    getAllPost,
    getCategoryById,
    getTagById,
    getAllTag,
    getPostById,
    logoutApi,
    Register,
    getAllUser
 };