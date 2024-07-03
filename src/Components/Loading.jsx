import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  return (
    <div className='position-absolute top-0 mx-auto h-100 w-100 d-flex align-items-center justify-content-center' style={{backgroundColor: "rgba(0, 0, 0, 0.2)", zIndex:"2000", height:"100vh"}}>
      <Spinner variant="primary" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loading;