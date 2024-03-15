import { appConfigurations } from "src/environments/environment"
import { StorageManagger } from "./storage"

const WithOutAuthRequest = (url: URL, requestOpt: object, body?: FormData) => {
    
    if(body){
        requestOpt = {
            ...requestOpt,
            body,
        }  
    }

    return new Promise((resolve, reject) => {
        fetch(url, requestOpt)
        .then(response => {
            resolve(response.json())
        })
        .catch(error => {
            reject(error)
        })
    })
}

const WithAuthRequest = (url: URL, requestOpt: object, body?: FormData) => {
    const jwt = (new StorageManagger).getItem(appConfigurations.jwtAuth)

    requestOpt = {
        ...requestOpt,
        headers: {
            [appConfigurations.authHeader]: jwt
        }
    }  
    
    if(body){
        requestOpt = {
            ...requestOpt,
            body,
        }  
    }   

    return new Promise((resolve, reject) => {

        if(jwt == null){
            reject('Token not found')
        }

        fetch(url, requestOpt)
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