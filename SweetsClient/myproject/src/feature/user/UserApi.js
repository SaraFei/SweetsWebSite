import axios from "axios";

let baseUrl = "http://localhost:4500/api/users";

export const loginInServer= (user) => {
    return axios.post(`${baseUrl}/login`,user);
}

export const addUserToServer = (user) => {
    return axios.post(baseUrl,user);
}
export const getAllUsers = () => {
    return axios.get(baseUrl);
}