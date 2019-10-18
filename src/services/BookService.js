import { env } from '../config/environments';
import axios from 'axios'

const key =':keyes&key=AIzaSyCcwNc_KhJYS3LQwzvEpRXHB3m4pMGeo_U'

export default class BookService {
  getBooksByName(name, page){
    return axios.get(`${env.googleBooks}?q=${name} =${page || 0}`)
  }
} 