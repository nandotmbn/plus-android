import axios from "axios"

export default Request = {
    GET_DEVICE_BY_ID: async (id) => {
        try {
            const result = await axios.get(`https://plus-api.herokuapp.com/api/device/${id}`)
            if(result.error.response) return result.error.response
            return result.data
        } catch (error) {
            console.log(error.message);
        }
    }
}