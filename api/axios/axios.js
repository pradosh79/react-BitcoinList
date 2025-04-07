
import axios from "axios";
import { Cookies } from "react-cookie";
let adminUrl = "https://api.coincap.io/v2/";

export const baseURL = adminUrl;
let axiosInstance = axios.create({
  baseURL,
});

// export const product_pic = (media) => {
//   return `https://tureappapiforreact.onrender.com/uploads/product/${media}`;
// };
// export const profile_pic = (media) => {
//     return `https://tureappapiforreact.onrender.com/uploads/user/profile_pic/${media}`;
//   };
axiosInstance.interceptors.request.use(
    async function (config) {
      const cookie = new Cookies();
         const token = cookie.get("token");
      if (token !== null || token !== undefined) {
        config.headers["x-access-token"] = token;
      }
      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );
  
export default axiosInstance;
