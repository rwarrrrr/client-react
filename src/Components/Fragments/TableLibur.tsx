import React, { useState } from 'react';
import { Table, Pagination, Modal } from 'react-bootstrap';
import Button from '../Elements/Button';
import { deleteLibur } from '../../Services/libur.service';
import FormUpdateLibur from './FormUpdateLibur';
import moment from 'moment';

interface DataItem {
  _id: number;
  tgl_libur: string;
  deskripsi: string;
  status_aktif: boolean;
}

interface HeadItem{
  title: string
}

interface TableLiburProps {
  data: DataItem[];
  head: HeadItem[];
  itemsPerPage: number;
}

const TableLibur: React.FC<TableLiburProps> = ({ data, head, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalId, setModalId] = useState('');

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (e:any) => {
    e.preventDefault();
    
    const jumlah = currentPage * itemsPerPage
    for (let i = 0; i < jumlah; i++) {
      const checked = e.target[`id-${i}`].checked;

      if(checked){
        const id = e.target[`id-${i}`].value;
        
         deleteLibur(id);
         window.location.reload()
      }
    } 
  };

  const handleModal = (e:any, item?:any) => {
    e.preventDefault();
    setModalId(item);
    setModalEditShow(true);
  }

  return (
    <>
      <div className='mt-3 mb-5 bg-light'>
        <form onSubmit={handleDelete}>
          <Table striped bordered hover className='shadow'>
            <thead>
              <tr className='text-center'>
                {head.map((item) => (
                  <th key={item.title}>{item.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item,index) => (
                <tr key={index}>
                  <td className='text-center p-0'>
                      <input type="checkbox" name={"id-"+index} id={"id-"+index} value={item?._id} />
                  </td>
                  <td>{moment(item.tgl_libur).format('DD-MM-YYYY')}</td>
                  <td>{item.deskripsi}</td>
                  <td>{item.status_aktif ? 'aktif' : 'non aktif'}</td>
                  <td className='text-center p-0'>
                    <Button classname="btn btn-warning mt-2 mb-2" onClick={(e:any) => handleModal(e, item?._id)}>Update</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className='row w-0 '>
            <div className='w-75'>
              {data.length > itemsPerPage && (
                <Pagination>
                <Pagination.Prev
                  onClick={() => handleClick(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {Array.from({ length: totalPages }, (_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handleClick(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handleClick(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
              )}              
            </div>
            <div className='w-25 justify-content-end d-flex'>
              <Button type="submit" classname="btn-danger">Delete</Button>
            </div>
          </div>
        </form>
      </div>
      
      <UpdateModalLibur
          show={modalEditShow}
          id={modalId}
          onHide={() => setModalEditShow(false)}
      />
    </>
  );
};

function UpdateModalLibur(props:any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Hari Libur
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormUpdateLibur id={props.id}/>
      </Modal.Body>
    </Modal>
  );
}

export default TableLibur;
