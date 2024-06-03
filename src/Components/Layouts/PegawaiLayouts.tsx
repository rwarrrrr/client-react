import { useEffect, useState } from "react";
import Button from "../Elements/Button"
import Navbar from "./Navbar"
import { Modal } from "react-bootstrap";
import ExcelExport from "../Fragments/Excel";
import jsPDF from 'jspdf'
import autoTable from "jspdf-autotable";
import { getAllPegawai } from "../../Services/pegawai.service";
import TablePegawai from "../Fragments/TablePegawai";
import moment from "moment";
import FormAddPegawai from "../Fragments/FormAddPegawai";

const PegawaiLayouts = () => {
    const [data, setData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    
    const head = [
        {
            title: ''
        },
        {
            title : 'Tanggal Lahir'
        },
        {
            title : 'Nama Pegawai'
        },
        {
            title : 'Jabatan'
        },
        {
            title : 'Shift'
        },
        {
            title : 'Hari Libur'
        },
        {
            title : 'Kode Toko'
        },
        {
            title : 'Status'
        },
        {
            title : 'Aksi'
        }
    ]

    useEffect(() => {
        getAllPegawai((data:any) => {
            setData(data.data)
        })
    }, [])

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; 
        const orientation = "portrait"; 
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size)
    
        doc.setFontSize(15);
    
        const title = "PEGAWAI";
        const headers = [["TANGGAL LAHIR", "NAMA PEGAWAI", "JABATAN", "SHIFT", "HARI LIBUR", "KODE TOKO", "STATUS AKTIF"]];
    
        const datas = data.map(item=> [moment(item['tgl_lahir']).format('DD-MM-YYYY'), item['nama_pegawai'], item['jabatan']['jabatan'], item['shift'], item['hari_libur'], item['kode_toko'], item['status_aktif']]);
    
        let content = {
          startY: 50,
          head: headers,
          body: datas
        };
    
        doc.text(title, marginLeft, 40);
        autoTable(doc,content);
        doc.save("report.pdf")
    }


    return (
        <>
            <Navbar />
            
            <div className="container">
                <Button classname="btn btn-primary mt-5" onClick={() => setModalShow(true)}>Add</Button>
                <ExcelExport data={data} fileName="pegawai" />
                <Button classname="btn btn-info mt-5 ms-2" onClick={exportPDF}>Print</Button>
                <TablePegawai data={data} head={head} itemsPerPage={5} />
            </div>
            <AddModalPegawai
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

function AddModalPegawai(props:any) {
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
            Tambah Pegawai
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAddPegawai />
        </Modal.Body>
      </Modal>
    );
}

export default PegawaiLayouts