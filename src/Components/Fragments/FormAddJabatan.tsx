import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import Button from '../Elements/Button';
import { createJabatan } from '../../Services/jabatan.service';

interface FormData {
  jabatan: string;
}

const FormAddJabatan = ({ handleSubmit }: InjectedFormProps<FormData>) => {
  const submit = (values: FormData) => {
    createJabatan(values, (data:any) => {
      if (data.status === 201) {
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
      <Button classname="btn btn-primary float-end" type="submit">Submit</Button>
    </form>
  );
};

export default reduxForm<FormData>({ form: 'FormAddJabatan' })(FormAddJabatan);
