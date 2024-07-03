import { saveAs } from 'file-saver';
import { useEffect, useRef, useState } from 'react';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const FilaSavePage = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [fileData, setFileData] = useState({fileType:"", fileData:""});


    const notifyError = (text) => {
        toast.error(text, {
            position: "bottom-center",
            autoClose: 3000,
            pauseOnHover: false,
            draggable: false,
        });
    };

    useEffect(() => {
        if(location.state !== null){
            setFileData({fileType: location.state.fileType, fileData: location.state.fileType === "json-radio"? JSON.stringify(location.state.fileData):location.state.fileData})
        }
    }, [])

    const handleSaveClick = () => {
        const content = location.state.fileType === "json-radio"? JSON.stringify(location.state.fileData):location.state.fileData;
        const fileName = location.state.fileType === "json-radio"? "jsonFile.json":location.state.fileType === "xml-radio"? "xmlFile.xml":"txtFile.txt";
        const fileType = location.state.fileType === "json-radio"? "application/json":location.state.fileType === "xml-radio"? "text/xml":"text/plain";

        const blob = new Blob([content], { type: fileType });
        saveAs(blob, fileName);
    };

    return (
        <>
            <div style={{ height: "100vh" }}>
                <div className='d-flex flex-column justify-content-center align-items-center my-4'>
                    <h2 className="text-center pt-5 fw-bold">CONVERTIFY.IO</h2>
                    <Link to="/" replace>Regresar</Link>
                </div>
                <Form>
                    <Container className="w-50 px-5">
                        <Row>
                            <Form.Control  as="textarea" value={fileData.fileData} rows={12} disabled />
                        </Row>
                        <Row xs="auto" className="justify-content-center mt-4">
                            <Button className="px-5" variant="danger" onClick={handleSaveClick}>Guardar</Button>
                        </Row>
                    </Container>
                </Form>
            </div>
            <ToastContainer />
        </>
    );
};

export default FilaSavePage;