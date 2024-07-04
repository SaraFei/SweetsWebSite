import axios from "axios"
let baseUrl = "http://localhost:4500/api/sweets"

export const getAllSweets = (page) => {
    return axios.get(`${baseUrl}?page=${page}`);
}
export const getAllSweetsFiltered = (search) => {
    return axios.get(`${baseUrl}/filter?search=${search}`);
}


export const getSweetById = (id) => {
    return axios.get(`${baseUrl}/${id}`);
}
export const getQtyOfSweets = (search) => {
    return axios.get(`http://localhost:4500/api/sweetsQty?search=${search}`);
}

//get per button
export const MovePage = (page) => {
    return axios.get(`${baseUrl}?page=${page}`)
}
//for manager only! delete product
export const DeleteProductFromServer = (prodId, token) => {
    return axios.delete(`${baseUrl}/${prodId}`, { headers: { "a-access-token": token } })
}
//for manager only! add sweet
export const AddSweetToSever = (sweet, token) => {
    return axios.post(`${baseUrl}`, sweet, { headers: { "a-access-token": token } });

}


//get all sweets default to first page
// export const getAllSweets = () => {
//     return axios.get(`${baseUrl}?page=1`);
// }
