import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import Button from '../Elements/Button';
import { useEffect, useState } from 'react';
import { getAllJabatan } from '../../Services/jabatan.service';
import { getAllUser } from '../../Services/auth.service';
import { createPegawai } from '../../Services/pegawai.service';

interface FormData {
  user_id: any,
  kode_pegawai: string,
  nama_pegawai: string,
  tgl_lahir: Date,
  jabatan: any,
  hari_libur: string,
  shift: number,
  jam_istirahat: number,
  jam_sholat: number,
  jam_break: number,
  jatah_cuti: number,
  gaji_pokok: number,
  tunjangan_jabatan: number,
  kode_sales: string,
  kode_toko: string,
  pin: number
}

const FormAddPegawai = ({ handleSubmit }: InjectedFormProps<FormData>) => {
  const [dataJabatan, setDataJabatan] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    getAllJabatan((data:any) => {
      setDataJabatan(data.data)
    })
    getAllUser((data:any) => {
      setDataUser(data.data)
    })
  }, [])
  
  const submit = (values: FormData) => {
    createPegawai(values, (data:any) => {
      if (data.status === 201) {
        alert("Data Pegawai Berhasil")
      }else{
        alert("Data Pegawai Gagal Disimpan")
      }
      window.location.reload()
    })
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className='mb-3'>
        <label htmlFor="user_id">User</label>
        <Field name="user_id" id="user_id" component="select"className='form-control' required>
          <option value="">Pilih User</option>
          {dataUser && dataUser.map((item:any) => (
            <option key={item._id} value={item._id}>{item.username}</option>
          ))}
        </Field>
      </div>
      <div className='mb-3'>
        <label htmlFor="kode_pegawai">Kode Pegawai</label>
        <Field name="kode_pegawai" id="kode_pegawai" component="input" type="text" className='form-control' />
      </div>
      <div className='mb-3'>
        <label htmlFor="nama_pegawai">Nama Pegawai</label>
        <Field name="nama_pegawai" id="nama_pegawai" component="input" type="text" className='form-control' />
      </div>
      <div className='mb-3'>
        <label htmlFor="tgl_lahir">Tanggal Lahir</label>
        <Field name="tgl_lahir" id="tgl_lahir" component="input" type="date" className='form-control' />
      </div>
      <div className='mb-3'>
        <label htmlFor="jabatan">Jabatan</label>
        <Field name="jabatan" id="jabatan" component="select" className='form-control'>
          <option value="">Pilih Jabatan</option>
          {dataJabatan && dataJabatan.map((item:any) => (
            <option key={item._id} value={item._id}>{item.jabatan}</option>
          ))}
        </Field>
      </div>
      <div className='mb-3'>
        <label htmlFor="hari_libur">Hari Libur</label>
        <Field name="hari_libur" id="hari_libur" component="input" type="text" className='form-control' />
      </div>
      <div className='mb-3'>
        <label htmlFor="shift">Shift</label>
        <Field name="shift" id="shift" component="input" type="number" parse={(val :any) => parseInt(val, 10)} inputMode="numeric" className='form-control' />
      </div>
      <div className='mb-3'>
        <label htmlFor="jam_istirahat">Jam Istirahat</label>
        <Field name="jam_istirahat" id="jam_istirahat" component="input" type="number" parse={(val :any) => parseInt(val, 10)} inputMode="numeric" className='form-control' />
      </div>
      <div className='mb-3'>
        <label htmlFor="jam_sholat">Jam Sholat</label>
        <Field name="jam_sholat" id="jam_sholat" component="input" type="number" parse={(val :any) => parseInt(val, 10)} inputMode="numeric" className='form-control' />
      </div>
      <div className='mb-3'>
        <label htmlFor="jam_break">Jam Break</label>
        <Field name="jam_break" id="jam_break" component="input" type="number" parse={(val :any) => parseInt(val, 10)} inputMode="numeric" className='form-control' />
      </div>
      <div className='mb-3'>
        <label htmlFor="jatah_cuti">Jatah Cuti</label>
        <Field name="jatah_cuti" id="jatah_cuti" component="input" type="number" parse={(val :any) => parseInt(val, 10)} inputMode="numeric" className='form-control' />
      </div>
      <div className='mb-3'>
        <label htmlFor="gaji_pokok">Gaji Pokok</label>
        <Field name="gaji_pokok" id="gaji_pokok" component="input" type="number" parse={(val :any) => parseInt(val, 10)} inputMode="numeric" className='form-control' />
      </div>
      <div className='mb-3'>
        <label htmlFor="tunjangan_jabatan">Tunjangan Jabatan</label>
        <Field name="tunjangan_jabatan" id="tunjangan_jabatan" component="input" type="number" parse={(val :any) => parseInt(val, 10)} inputMode="numeric" className='form-control' />
      </div>
      <div className='mb-3'>
        <label htmlFor="kode_sales">Kode Sales</label>
        <Field name="kode_sales" id="kode_sales" component="input" type="text" className='form-control' />
      </div>
      <div className='mb-3'>
        <label htmlFor="kode_toko">Kode Toko</label>
        <Field name="kode_toko" id="kode_toko" component="input" type="text" className='form-control' />
      </div>
      <div className='mb-3'>
        <label htmlFor="pin">PIN</label>
        <Field name="pin" id="pin" component="input" type="number" parse={(val :any) => parseInt(val, 10)} inputMode="numeric" className='form-control' />
      </div>
      <Button classname="btn btn-primary float-end" type="submit">Submit</Button>
    </form>
  );
};

export default reduxForm<FormData>({ form: 'FormAddPegawai' })(FormAddPegawai);
