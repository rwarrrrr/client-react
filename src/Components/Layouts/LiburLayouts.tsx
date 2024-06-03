import { useEffect, useState } from "react";
import { getAllLibur } from "../../Services/libur.service";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Modal } from "react-bootstrap";
import Button from "../Elements/Button";
import ExcelExport from "../Fragments/Excel";
import TableLibur from "../Fragments/TableLibur";
import FormAddLibur from "../Fragments/FormAddLibur";
import Navbar from "./Navbar";

const LiburLayouts = () => {
    const [data, setData] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const head = [
        {
            title: ''
        },
        {
            title: 'Tanggal'
        },
        {
            title: 'Deskripsi'
        },
        {
            title: 'Status'
        },
        {
            title: 'Aksi'
        }
    ]

    useEffect(() => {
        getAllLibur((data:any) => {
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
    
        const title = "LIBUR";
        const headers = [["TANGGAL", "DESKRIPSI", "STATUS"]];
    
        const datas = data.map(item=> [item['tgl_libur'], item['deskripsi'], item['status_aktif']]);
    
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
                <ExcelExport data={data} fileName="libur" />
                <Button classname="btn btn-info mt-5 ms-2" onClick={exportPDF}>Print</Button>
                <TableLibur data={data} head={head} itemsPerPage={5} />
            </div>

            <AddModalLibur
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

function AddModalLibur(props:any) {
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
            Tambah Hari Libur
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAddLibur />
        </Modal.Body>
      </Modal>
    );
}

export default LiburLayouts