import { useEffect, useState } from "react";
import Button from "../Elements/Button"
import TableJabatan from "../Fragments/TableJabatan"
import Navbar from "./Navbar"
import { getAllJabatan } from "../../Services/jabatan.service";
import { Modal } from "react-bootstrap";
import FormAddJabatan from "../Fragments/FormAddJabatan";
import ExcelExport from "../Fragments/Excel";
import jsPDF from 'jspdf'
import autoTable from "jspdf-autotable";

const JabatanLayouts = () => {
    const [data, setData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    
    const head = [
        {
            title: ''
        },
        {
            title: 'Jabatan'
        },
        {
            title : 'Status Aktif'
        },
        {
            title : 'Aksi'
        }
    ]

    useEffect(() => {
        getAllJabatan((data:any) => {
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
    
        const title = "JABATAN";
        const headers = [["JABATAN", "STATUS AKTIF"]];
    
        const datas = data.map(item=> [item['jabatan'], item['status_aktif']]);
    
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
                <ExcelExport data={data} fileName="jabatan" />
                <Button classname="btn btn-info mt-5 ms-2" onClick={exportPDF}>Print</Button>
                <TableJabatan data={data} head={head} itemsPerPage={5} />
            </div>
            <AddModalJabatan
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

function AddModalJabatan(props:any) {
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
            Tambah Jabatan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAddJabatan />
        </Modal.Body>
      </Modal>
    );
}

export default JabatanLayouts