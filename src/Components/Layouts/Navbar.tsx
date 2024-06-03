import { useEffect, useState } from "react";
import Button from "../Elements/Button"
import { Collapse, Offcanvas } from "react-bootstrap";
import menuBar from '../../assets/menu-bar.png'
import { Link } from "react-router-dom";
import { useNotLogin } from "../../Hooks/useNotLogin";

const Navbar = () => {
    const [show, setShow] = useState(false);
  
    const login = useNotLogin();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    return (
        <>
        <div className="navbar navbar-expand-lg navbar-light bg-light shadow rounded p-3 mb-3 ">            
            <div className=" flex-grow-1">
                <Button onClick={handleShow} classname="col-1 rounded ">
                    <img src={menuBar} className="col-md-3" />
                </Button>
            </div>
            <Button classname="btn-danger" onClick={handleLogout} >Logout</Button>            
        </div>

        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Navigation />
            </Offcanvas.Body>
        </Offcanvas>
        </>
    )
}

const Navigation = () => {
    const [open, setOpen] = useState(false);
    return (
        <>            
            <div className="list-group list-group-flush ">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link active">Home</Link>
                        <hr />
                    </li>
                    <li className="nav-item">
                        <a 
                            className="nav-link text-dark"
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                        >Master</a>         
                        <hr />
                        <Collapse in={open}>
                            <ul className="flex-column">
                                <li className="nav-item ml-3 ">
                                    <a href="/master/pegawai" className="nav-link ml-3">Master Pegawai</a>    
                                    <hr />
                                </li>
                                <li className="nav-item ml-3 ">
                                    <Link to="/master/jabatan" className="nav-link ml-3">Master Jabatan</Link>   
                                    <hr />
                                </li>
                                <li className="nav-item ml-3 ">
                                    <a href="/master/libur" className="nav-link ml-3">Master Hari Libur</a>    
                                    <hr />
                                </li>
                            </ul>
                        </Collapse>
                    </li>     
                    <li className="nav-item">
                        <a className="nav-link disabled" aria-current="page" href="#">Disable</a>
                        <hr />
                    </li>      
                </ul>

            </div>
        </>
    )
}

export default Navbar