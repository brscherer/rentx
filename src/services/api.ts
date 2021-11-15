import axios from 'axios'

// In a real project, this should be put in a .env file for secrets or using a service such Vault
const api = axios.create({
  baseURL: 'http://192.168.0.199:8081'
})

export default api;
