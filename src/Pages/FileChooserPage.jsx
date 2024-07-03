import { useRef, useState } from 'react';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FileChooserPage = () => {

    const navigate = useNavigate()
    const fileInputRef = useRef(null)
    const [fileData, setFileData] = useState({fileText:"", fileType:""});


    const notifyError = (text) => {
        toast.error(text, {
            position: "bottom-center",
            autoClose: 3000,
            pauseOnHover: false,
            draggable: false,
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const allowedFileTypes = ['application/json', 'text/plain', 'text/csv'];

        if (file && allowedFileTypes.includes(file.type)) {
            // File is valid, do something with it
            const reader = new FileReader();
            reader.onload = () => {
                const fileData = reader.result;
                setFileData({fileText: fileData, fileType:file.type})
            };
            reader.readAsText(file);
        }
    };

    function handleClick(e){
        e.preventDefault()
        const file = fileInputRef.current.files[0];
        const allowedFileTypes = ['application/json', 'text/plain', 'text/csv'];

        if (!file) {
            // No hay archivo subido
            notifyError("Debe seleccionar un archivo");
        }
        else if (!allowedFileTypes.includes(file.type)) {
            // Tipo de archivo invalido
            notifyError("Archivo no válido");
        }
        else {
            // Archivo valido
            navigate("/convert", {state:{fileData}});
        }
    }

    return (
        <>
            <div style={{ height: "100vh" }}>
                <h2 className="text-center pt-5 fw-bold">CONVERTIFY.IO</h2>
                <h5 className="text-center py-4">Seleccione documento a convertir</h5>
                <Form>
                    <Container className="w-50 px-5">
                        <Row>
                            <Form.Control type="file" accept=".json, .txt, .csv" onChange={handleFileChange} ref={fileInputRef}/>
                            <Form.Control className="mt-4" as="textarea" value={fileData.fileText} rows={12} disabled />
                        </Row>
                        <Row xs="auto" className="justify-content-center mt-4">
                            <Button onClick={handleClick} className="px-5" variant="danger" type="submit">
                                GO
                            </Button>
                        </Row>
                    </Container>
                </Form>
            </div>
            <ToastContainer />
        </>
    );
};

export default FileChooserPage;