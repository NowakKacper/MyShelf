import axios from 'axios'
import {authHeader} from "./UserService";

const API_URL = 'http://localhost:7070/api/reports';

class ReportService{

    reportBook(formData, book_id){
        return axios.post(API_URL + '/' + book_id, formData, { headers: authHeader() })
    }

    async acceptReport(id){
        const res =  await axios.get(API_URL + "/" + id, { headers: authHeader() });
        return res;
    }

    async rejectReport(id){
        const res = await axios.delete(API_URL + "/" + id, { headers: authHeader() });
        return res;
    }
}

const reportServiceInstance = new ReportService();
export default reportServiceInstance;