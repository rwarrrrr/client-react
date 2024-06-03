import { Field, reduxForm, InjectedFormProps, change } from 'redux-form';
import Button from '../Elements/Button';
import { getDetailJabatan, updateJabatan } from '../../Services/jabatan.service';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface FormData {
  jabatan: string;
  status_aktif: boolean;
}

interface MyFormProps {
  id: string;
}

type Props = InjectedFormProps<FormData, MyFormProps> & MyFormProps;

const FormUpdateJabatan: React.FC<Props> = ({ handleSubmit, id }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        getDetailJabatan(id, (data:any) => {
          dispatch(change('FormUpdateJabatan', 'jabatan', data.data.jabatan))
          dispatch(change('FormUpdateJabatan', 'status_aktif', data.data.status_aktif))
        })
    }, [dispatch])

  const submit = (values: FormData) => {
    updateJabatan(id,values, (data:any) => {
      if (data.status === 200) {
        alert("Data Jabatan Berhasil")
      }else{
        alert("Data Jabatan Gagal Disimpan")
      }
      window.location.reload()
    })
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className='mb-3'>
        <label htmlFor="jabatan">Jabatan</label>
        <Field name="jabatan" id="jabatan" component="input" type="text" className='form-control' />
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

export default reduxForm<FormData, MyFormProps>({ form: 'FormUpdateJabatan' })(FormUpdateJabatan);
