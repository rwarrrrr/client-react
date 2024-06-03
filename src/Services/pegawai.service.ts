import axios from "axios";

export const getAllPegawai = async (callback:any) => {
    axios.get(
        'http://localhost:3000/api/pegawais',
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

export const getDetailPegawai = async (id:string, callback:any) => {
    axios.get(
        `http://localhost:3000/api/pegawais/${id}`,
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

export const createPegawai = async (data:any, callback:any) => {
    axios.post(
        'http://localhost:3000/api/pegawais',
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

export const updatePegawai = async (id:string, data:any, callback:any) => {
    axios.put(
        `http://localhost:3000/api/pegawais/${id}`,
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

export const deletePegawai = async (id:string) => {
    axios.delete(
        `http://localhost:3000/api/pegawais/${id}`,
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    )
}
