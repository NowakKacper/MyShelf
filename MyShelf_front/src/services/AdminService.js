import axios from 'axios'
import {authHeader} from "./UserService";

const API_URL_BOOKS = 'http://localhost:7070/api/admin/books';
const API_URL_REPORTS = 'http://localhost:7070/api/reports';

class AdminService{

    getAllBooksToAccept() {
        return axios.get(API_URL_BOOKS, { headers: authHeader() });
    }

    getAllReports(){
        return axios.get(API_URL_REPORTS, { headers: authHeader() })
    }

    async rejectBook(id) {
        const res = await axios.delete(API_URL_BOOKS + "/" + id, { headers: authHeader() });
        return res;
    }

    async acceptBook(id) {
        const res =  await axios.get(API_URL_BOOKS + "/" + id, { headers: authHeader() });
        return res;
    }
}

const adminServoceInstance = new AdminService();
export default adminServoceInstance;