import fetch from 'node-fetch'

const BASE_URL = 'http://localhost:5000/restapi/'

const informationsModels = {

    findAll:() => {
        return fetch(`${BASE_URL}${'information'}`)
            .then(res => res.json())
            .then(json => json)
    },
    findById: (id) => {
        return fetch(`${BASE_URL}${'information/'}${id}`)
            .then(res => res.json())
            .then(json => json)
    }
}

export default informationsModels
