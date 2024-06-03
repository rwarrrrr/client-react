import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import Button from '../Elements/Button';
import { createLibur } from '../../Services/libur.service';

interface FormData {
  tgl_libur: string;
  deskripsi: string;
}

const FormAddLibur = ({ handleSubmit }: InjectedFormProps<FormData>) => {
  const submit = (values: FormData) => {
    createLibur(values, (data:any) => {
      if (data.status === 201) {
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
      <Button classname="btn btn-primary float-end" type="submit">Submit</Button>
    </form>
  );
};

export default reduxForm<FormData>({ form: 'FormAddLibur' })(FormAddLibur);
