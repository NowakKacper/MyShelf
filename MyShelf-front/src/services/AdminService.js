import axios from 'axios'
import {authHeader} from "./UserService";

const API_URL = 'http://localhost:7070/api/admin/books';

class AdminService{

    getAllBooksToAccept() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    async rejectBook(id) {
        const res = await axios.delete(API_URL + "/" + id, { headers: authHeader() });
        return res;
    }

    async acceptBook(id) {
        const res =  await axios.get(API_URL + "/" + id, { headers: authHeader() });
        return res;
    }
}

const adminServoceInstance = new AdminService();
export default adminServoceInstance;