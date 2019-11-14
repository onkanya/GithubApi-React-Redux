import axios from 'axios'
import { userService } from './users'

const apiCaller = axios.create({
    baseURL: 'https://api.github.com/'
})

export default {
    users: userService(apiCaller)
}