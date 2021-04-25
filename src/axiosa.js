import axios from 'axios'

const axiosa = axios.create({
  baseURL:'http://localhost:8088'
})
export default axiosa