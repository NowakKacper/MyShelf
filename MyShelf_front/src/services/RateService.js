import axios from 'axios'
import { authHeader } from "./UserService";

const API_URL = 'http://localhost:7070/api/rates';

class RateService{

    addRate(rate, bookId, userId) {
        console.log(authHeader(), rate, bookId, userId)
        return axios.post(API_URL, { 
            headers: authHeader() ,
            rate,
            bookId,
            userId
        });
    }
}

const rateServiceInstance = new RateService();
export default rateServiceInstance;