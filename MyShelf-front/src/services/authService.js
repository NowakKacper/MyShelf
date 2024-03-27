import axios from "axios";
import { jwtDecode } from 'jwt-decode'

const API_URL = "http://localhost:7070/api/auth";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "/login", {
        "username": username,
        "password": password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user_data", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user_data");
  }

  register(username, email, password) {
    return axios.post(API_URL + "/signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    let user_data = JSON.parse(localStorage.getItem('user_data'));
    if(user_data){
      let token = user_data.token
      let decoded_token = jwtDecode(token)

      if(decoded_token.exp < new Date().getTime()/1000) return false
      else return user_data
    }
    return user_data
  }

}
const authServiceInstance = new AuthService();
export default authServiceInstance;
