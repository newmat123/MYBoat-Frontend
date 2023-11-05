import axios from "axios"

//192.168.69.75          test
//192.168.1.1            soft ap
export const api = axios.create({
    baseURL: "http://192.168.1.1",
})

// defining a custom error handler for all APIs
const errorHandler = (error: any) => {
    const statusCode = error.response?.status

    // logging only errors that are not 401
    if (statusCode && statusCode !== 401) {
        console.error(error)
    }

    return Promise.reject(error)
}

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
    return errorHandler(error)
})