import axios from "axios";
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useMutation } from "react-query";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router-dom";


const ConvertForm = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const delimitatorInput = useRef();
    const keyInput = useRef();
    const location = useLocation()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);

    const notifyError = (text) => {
        toast.error(text, {
            position: "bottom-center",
            autoClose: 3000,
            pauseOnHover: false,
            draggable: false,
        });
    };

    const { mutate } = useMutation((dataToConvert) => {
        setLoading(true)
        if((location.state.fileData.fileType === "text/plain" || location.state.fileData.fileType === "text/csv") && selectedOption === "json-radio"){
            const url = import.meta.env.VITE_API_URL + "txt-json"
            axios
                .post(url, dataToConvert, {headers: {'Content-Type': 'application/json' }})
                .then((res) => {
                    if (res.status === 200){
                    setLoading(false)
                    navigate("/save", {state:{fileType:selectedOption, fileData:res.data}})
                    }
                })
                .catch(({response}) => {
                    setLoading(false)
                    notifyError(response.data.error)
                })
        }else if(location.state.fileData.fileType === "application/json"){
            console.log(dataToConvert)
            const url = import.meta.env.VITE_API_URL + "json-txt"
            axios
                .post(url, dataToConvert, {headers: {'Content-Type': 'application/json' }})
                .then((res) => {
                    if (res.status === 200){
                    setLoading(false)
                    navigate("/save", {state:{fileType:selectedOption, fileData:res.data}})
                    }
                })
                .catch(({response}) => {
                    setLoading(false)
                    notifyError(response.data.error)
                })
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault();

        const keyValue = keyInput.current.value;
        let dataToConvert

        if (selectedOption == "") {
            // No ha seleccionado ninugún radio button
            notifyError("Debe seleccionar el formato a convertir");
        } else if (keyValue == "") {
            notifyError("Debe llenar todos los campos");

        } else if (location.state.fileData.fileType !== "text/plain" && location.state.fileData.fileType !== "text/csv") {
            const delimitatorValue = delimitatorInput.current.value;
            if (keyValue == "" || delimitatorValue == "") {
                notifyError("Debe llenar todos los campos");
            }
            else {
                dataToConvert = {
                    text: location.state.fileData.fileType === "application/json"?JSON.parse(location.state.fileData.fileText):'',
                    keyWord: keyInput.current.value,
                    separator: delimitatorInput.current.value
                    
                }
                mutate(dataToConvert)

            }
        } else {
            // Accion que manda la informacion
            dataToConvert = {
                text: location.state.fileData.fileText,
                keyWord: keyInput.current.value
            }
            mutate(dataToConvert)
        }
    };
    

    return (
        <>  
            {loading? <Loading/>:null}
            <div style={{ height: "100vh" }}>
                <h2 className="text-center py-5 fw-bold">CONVERTY.IO</h2>
                <Form onSubmit={handleSubmit}>
                    <Container className="w-50 p-5 rounded border">
                        <Row>
                            <Col>
                                <Form.Group controlId="formRadios">
                                    <Form.Label>Seleccione formato a convertir</Form.Label>
                                    <Form.Check
                                        disabled=
                                        {
                                            location.state.fileData.fileType === "application/json" ? true : false
                                        }
                                        type="radio"
                                        id="json-radio"
                                        label="JSON"
                                        name="group1"
                                        checked={selectedOption === 'json-radio'}
                                        onChange={() => setSelectedOption('json-radio')}
                                    />       

                                    <Form.Check
                                        disabled={location.state.fileData.fileType === "text/plain" ? true : (location.state.fileData.fileType === "text/csv" ? true : false)}
                                        type="radio"
                                        label="TXT"
                                        id="txt-radio"
                                        name="group1"
                                        checked={selectedOption === 'txt-radio'}
                                        onChange={() => setSelectedOption('txt-radio')}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                {location.state.fileData.fileType === "text/plain" || location.state.fileData.fileType === "text/csv"? false : true &&
                                    <Row>
                                        <Form.Group className="mb-3" controlId="delimitator">
                                            <Form.Label>Introduzca símbolo del delimitador</Form.Label>
                                            <Form.Control type="text" maxLength="1" ref={delimitatorInput} />
                                        </Form.Group>
                                    </Row>
                                }

                                <Row>
                                    <Form.Group className="mb-3" controlId="formKey">
                                        <Form.Label>Introduzca clave de cifrado</Form.Label>
                                        <Form.Control type="text" ref={keyInput} />
                                    </Form.Group>
                                </Row>
                            </Col>
                        </Row>
                        <Row xs="auto" className="justify-content-center mt-5">
                            <Button variant="danger" type="submit">
                                CONVERT
                            </Button>
                        </Row>
                    </Container>
                </Form>
            </div>
            <ToastContainer />
        </>
    )
}

export default ConvertForm