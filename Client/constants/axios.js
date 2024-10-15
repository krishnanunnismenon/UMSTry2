import axios from "axios";

const instance = axios.create({
  withCredentials:true,
  baseURL: "http://localhost:4545",
});

const getToken = (role)=>{
  if(role ==='admin'){
    return localStorage.getItem("adminToken");
  }else if(role === 'user'){
    return localStorage.getItem("token");
  }
  return null
}

instance.interceptors.request.use(
  (config)=>{
    console.log("connected with backeend")
    const role = config.role || 'user';
    const token = getToken(role);
    
    if(token){
      
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error)=>{
    return Promise.reject(error);
  }
)

export default instance;
