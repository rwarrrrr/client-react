import { Field, reduxForm, InjectedFormProps, change } from 'redux-form';
import Button from '../Elements/Button';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDetailLibur, updateLibur } from '../../Services/libur.service';
import moment from 'moment';

interface FormData {
  tgl_libur: Date;
  deskripsi: string;
  status_aktif: boolean;
}

interface MyFormProps {
  id: string;
}

type Props = InjectedFormProps<FormData, MyFormProps> & MyFormProps;

const FormUpdateLibur: React.FC<Props> = ({ handleSubmit, id }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        getDetailLibur(id, (data:any) => {
          dispatch(change('FormUpdateLibur', 'tgl_libur', moment(data.data.tgl_libur).format('YYYY-MM-DD') ))
          dispatch(change('FormUpdateLibur', 'deskripsi', data.data.deskripsi))
          dispatch(change('FormUpdateLibur', 'status_aktif', data.data.status_aktif))
        })
    }, [dispatch])

  const submit = (values: FormData) => {
    updateLibur(id,values, (data:any) => {
      if (data.status === 200) {
        alert("Data Hari Libur Berhasil")
      }else{
        alert("Data Hari Libur Gagal Disimpan")
      }
      window.location.reload()
    })
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className='mb-3'>
        <label htmlFor="tgl_libur">Tanggal</label>
        <Field name="tgl_libur" id="tgl_libur" component="input" type="date" className='form-control' />
      </div>
      <div className='mb-3'>
        <label htmlFor="deskripsi">Deskripsi</label>
        <Field name="deskripsi" id="deskripsi" component="input" type="text" className='form-control' />
      </div>
      <div className='mb-3'>
        <label htmlFor="status_aktif">Status Aktif</label><br />
        <Field name="status_aktif" id="status_aktif" component="input" type="checkbox" />
        <label className='ms-2'>Aktif</label>
      </div>
      <Button classname="btn btn-primary float-end" type="submit">Submit</Button>
    </form>
  );
};

export default reduxForm<FormData, MyFormProps>({ form: 'FormUpdateLibur' })(FormUpdateLibur);
