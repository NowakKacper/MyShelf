import axios from 'axios'
import {authHeader} from "./UserService";

const API_URL = 'http://localhost:7070/api/books';

class BookService{

    getAllBooks() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    getBook(id) {
        return axios.get(API_URL + '/' + id, { headers: authHeader() });
    }

    getUserBooks(userId) {
        return axios.get(API_URL + "/user/" + userId, { headers: authHeader() });
    }

    addBook(formData){
        return axios.post(API_URL, formData)
    }

    updateBook(formData, book_id){
        return axios.post(API_URL + '/' + book_id, formData)
    }

    deleteBook(id){
        return axios.delete(API_URL + '/' + id, { headers: authHeader() });
    }
}

const bookServiceInstance = new BookService();
export default bookServiceInstance;