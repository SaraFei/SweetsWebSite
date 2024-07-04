import axios from "axios";

export const addOrderToServer = (newOrder,token) => {
    return axios.post("http://localhost:4500/api/orders", newOrder,{ headers: { "a-access-token": token } });
}