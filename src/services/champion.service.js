import axios from 'axios';
import authHeader from './auth-header';

const API_URL = ' https://champions-sky-69696.herokuapp.com/api';

class ChampionDataService {

    getAll(){
        return axios.get(API_URL+"/champion" , {headers : authHeader()});
    }

    getPublished(){
        return axios.get(API_URL+"/champion/published" );
    }

    get(id){
        return axios.get(`${API_URL}/champion/${id}`, {headers : authHeader()});
    }

    getUser(id){
        return axios.get(`${API_URL}/champion/user/${id}`, {headers : authHeader()});
    }

    create(data){
      //  console.log(axios.post(API_URL+"/champion",data ,{headers : authHeader()}));
        return axios.post(`${API_URL}/champion`,data ,{headers : authHeader()});
    }

    update(id, data){
        return axios.put(`${API_URL}/champion/${id}`, data, {headers : authHeader()});
    }

    delete(id) {
        //console.log(axios.delete(`${API_URL}/champion/${id}`), {headers : authHeader()});
        return axios.delete(`${API_URL}/champion/${id}`, {headers : authHeader()});
    }

    deleteUser(id) {
        //console.log(axios.delete(`${API_URL}/champion/${id}`), {headers : authHeader()});
        return axios.delete(`${API_URL}/champion/user/${id}`, {headers : authHeader()});
    }
    
    deleteAll() {
        return axios.delete(`${API_URL}/champion`, {headers : authHeader()});
    }
    
    findByTitle(title) {
        return axios.get(`${API_URL}/champion?title=${title}`, {headers : authHeader()});
    }
}

export default new ChampionDataService;