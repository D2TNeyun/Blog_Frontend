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

const Register = (Username, Email, Password) => {
    const data = new FormData();
    data.append('username', Username);
    data.append('email', Email);
    data.append('password', Password);
    return axios.post(`api/auth/register`, data);
}

const getAllUser = () => {
    return axios.get(`api/user`);
}

const getUserById = (id) => {
    const data = new FormData();
    data.append('id', id);
    return axios.get(`api/user/`+id, data);
}

const searchUser = (UserName) => {
    const data = new FormData();
    data.append('title', UserName);
    return axios.get(`api/user?UserName=`+UserName, data);
}

const AddUser = (UserName, Email, Password, Role) => {
    const data = new FormData();
    data.append('username', UserName);
    data.append('email', Email);
    data.append('password', Password);
    data.append('Role', Role);
    return axios.post(`api/user/addUser`, data);
}

const deleteUser = (id) =>{
    return axios.delete(`api/user/`+id);
}

const PuteditUser = (id, UserName, Email, Role, StatusName) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', UserName);
    data.append('email', Email);
    data.append('Role', Role);
    data.append('StatusName', StatusName);
    return axios.put(`api/user/`+id, data);
}

const LoginGoogle = () => {
    return axios.get(`api/auth/signin-google`);
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

const addCategories = (CategoryName) => {
    const data = new FormData();
    data.append('categoryName', CategoryName);
    return axios.post(`api/categories`, data);
}

const deleteCategory = (id) => {
    return axios.delete(`api/categories/`+id);
}

const PuteditCategory = (id, CategoryName) => {
    const data = new FormData();
    data.append('id', id);
    data.append('categoryName', CategoryName);
    return axios.put(`api/categories/`+id, data);
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

const searchTerm = (Title) => {
    const data = new FormData();
    data.append('title', Title);
    return axios.get(`api/post?Title=`+Title, data);
}
const createNewPost = (AppUserID, Title, Description, Content, TagID, CategoryID,Image) => {
    const data = new FormData();
    data.append("AppUserID", AppUserID);
    data.append('categoryID', CategoryID);
    data.append('tagID', TagID);
    data.append('title', Title);
    data.append('description', Description);
    data.append('content', Content);
    data.append("Image", Image)
    return axios.post(`api/post/create`, data);
}
const UpdatePost = (id, CategoryID,TagID,Title, Description, Content, Image) => {
    const data = new FormData();
    data.append('categoryID', CategoryID);
    data.append('tagID', TagID);
    data.append('title', Title);
    data.append('description', Description);
    data.append('content', Content);
    data.append("Image", Image)
    return axios.put(`api/post/`+id, data);
}
const deletePost = (id) => {
    return axios.delete(`api/post/`+id);
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

const addTag = (CategoryID,TagName) => {
    const data = new FormData();
    data.append('CategoryID', CategoryID)
    data.append('tagName', TagName);
    return axios.post(`api/tag`, data);
}

const puttag = (id, TagName) => {
    const data = new FormData();
    data.append('id', id);
    data.append('TagName', TagName);
    return axios.put(`api/tag/`+id, data);
}

const deleteTag = (id) => {
    return axios.delete(`api/tag/`+id);
}
//Comment
const postCmt = (PostId, AppUserID, Content) => {
    const data = new FormData();
    data.append('PostId', PostId);
    data.append('AppUserID', AppUserID);
    data.append('Content', Content);
    return axios.post(`api/comments`, data);
}

const getComments = () => {
    return axios.get(`api/comments`); 
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
    getAllUser,
    postCmt,
    getComments,
    createNewPost,
    addCategories,
    deleteCategory,
    PuteditCategory,
    searchTerm,
    addTag,
    puttag,
    deleteTag,
    searchUser,
    AddUser,
    deleteUser,
    getUserById,
    UpdatePost,
    deletePost,
    PuteditUser,
    LoginGoogle
 };