import axios from "axios"

export const getAllJabatan = async (callback:any) => {
    axios.get(
        'http://localhost:3000/api/jabatans',
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    )
    .then((res) => {
        callback(res)
    }).catch((err) => {
        callback(err)
    })
}

export const getDetailJabatan = async (id:string, callback:any) => {
    axios.get(
        `http://localhost:3000/api/jabatans/${id}`,
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    )
    .then((res) => {
        callback(res)
    }).catch((err) => {
        callback(err)
    })
}

export const createJabatan = async (data:any, callback:any) => {
    axios.post(
        'http://localhost:3000/api/jabatans',
        data,
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    )
    .then((res) => {
        callback(res)
    }).catch((err) => {
        callback(err)
    })
}

export const updateJabatan = async (id:string, data:any, callback:any) => {
    axios.put(
        `http://localhost:3000/api/jabatans/${id}`,
        data,
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    )
    .then((res) => {
        callback(res)
    }).catch((err) => {
        callback(err)
    })
}

export const deleteJabatan = async (id:string) => {
    axios.delete(
        `http://localhost:3000/api/jabatans/${id}`,
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    )
}