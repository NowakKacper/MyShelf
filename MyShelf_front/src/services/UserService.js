import axios from 'axios';

const API_URL = 'http://localhost:7070';

export function authHeader() {
    const user = JSON.parse(localStorage.getItem('user_data'));

    if (user && user.token) {
      return { Authorization: "Bearer " + user.token };
    } else {
      return {};
    }
}

class UserService {
  getPublicContent() {
    return axios.get(API_URL + '/all');
  }

  getUserPage() {
    return axios.get(API_URL + '/user', { headers: authHeader() });
  }

  getAdminPage() {
    return axios.get(API_URL + '/admin', { headers: authHeader() });
  }
}

const userServiceInstance = new UserService();
export default userServiceInstance;