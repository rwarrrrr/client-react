import axios from "axios";

export const getAllLibur = async (callback:any) => {
    axios.get(
        'http://localhost:3000/api/liburs',
        { 
            headers: { 
                'Authorization': 'Bearer ' + localStorage.getItem('token') 
            } 
        }
    ).then((res) => {
        callback(res)
    }).catch((err) => {
        callback(err)
    })

}

export const getDetailLibur = async (id:string, callback:any) => {
    axios.get(
        `http://localhost:3000/api/liburs/${id}`,
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

export const createLibur = async (data:any, callback:any) => {
    axios.post(
        'http://localhost:3000/api/liburs',
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

export const updateLibur = async (id:string, data:any, callback:any) => {
    axios.put(
        `http://localhost:3000/api/liburs/${id}`,
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

export const deleteLibur = async (id:string) => {
    axios.delete(
        `http://localhost:3000/api/liburs/${id}`,
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    )
}