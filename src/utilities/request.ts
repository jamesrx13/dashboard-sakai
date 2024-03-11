import { appConfigurations } from "src/environments/environment"
import { StorageManagger } from "./storage"

const WithOutAuthRequest = (url: URL, headers: object, body?: FormData) => {
    
    if(body){
        headers = {
            ...headers,
            body,
        }  
    }

    return new Promise((resolve, reject) => {
        fetch(url, headers)
        .then(response => {
            resolve(response.json())
        })
        .catch(error => {
            reject(error)
        })
    })
}

const WithAuthRequest = (url: URL, headers: object, body?: FormData) => {
    const jwt = (new StorageManagger).getItem(appConfigurations.jwtAuth)

    headers = {
        ...headers,
        [appConfigurations.authHeader]: jwt
    }  
    
    if(body){
        headers = {
            ...headers,
            body,
        }  
    }

    return new Promise((resolve, reject) => {

        if(jwt == null){
            reject('Token not found')
        }

        fetch(url, headers)
        .then(response => {
            resolve(response.json())
        })
        .catch(error => {
            reject(error)
        })
    })
}

export {
    WithOutAuthRequest,
    WithAuthRequest
}