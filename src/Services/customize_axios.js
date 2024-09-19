import axios from "axios";
import NProgress from "nprogress";
// import { store } from "../Redux/Store/store";   

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
    minimum: 0.3,
    easing: "ease",
    speed: 500,
    trickle: true,
});


// Tạo ra phiên bản axios mà theo í của mình
const instance = axios.create({
    baseURL: "http://localhost:5273",
    // withCredentials: true, 

});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    NProgress.start();
    // console.log("check store ", store.getState());
    // Get the token from the Redux store
    // Lấy token từ localStorage hoặc từ store nếu cần thiết
    
    // const token = store?.getState()?.user?.user?.data || localStorage.getItem('token');
    // if (token) {
    //     config.headers['Authorization'] = "Bearer "+token;
    // }
    // console.log("check token ", token);
    
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance;