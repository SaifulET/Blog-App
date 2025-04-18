
const Loader = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
    <div className="spinner-border text-success" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <div className="text-success fw-bold small fs-3">Loading...</div>
  </div>
    );
};

export default Loader;