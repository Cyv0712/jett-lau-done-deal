import { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [bikes, setBikes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    brand: '', model: '', type: '', year: '', mileage: '', price: '', 
    description: '', issues: '', engineSize: '', engineConfig: '', 
    power: '', transmission: '', fuelCapacity: ''
  });
  const [imageFile, setImageFile] = useState(null);

  const fetchBikes = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/bikes');
      const data = await res.json();
      setBikes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchBikes();
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else alert('Incorrect password');
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) data.append('image', imageFile);

    try {
      await fetch('http://localhost:5000/api/bikes', {
        method: 'POST',
        body: data
      });
      setShowModal(false);
      fetchBikes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bike?')) {
      try {
        await fetch(`http://localhost:5000/api/bikes/${id}`, { method: 'DELETE' });
        fetchBikes();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <Form onSubmit={handleLogin} style={{ width: '300px', backgroundColor: '#171717', padding: '30px', borderRadius: '12px' }}>
          <h3 className="text-white text-center mb-4">Admin Login</h3>
          <Form.Group className="mb-3">
            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Button type="submit" variant="danger" className="w-100">Login</Button>
        </Form>
      </Container>
    );
  }

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '100vh', backgroundColor: '#0a0a0a' }}>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="text-white">Admin Dashboard</h2>
          <Button variant="danger" onClick={() => setShowModal(true)}><FaPlus className="me-2" />Add New Bike</Button>
        </div>

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Model</th>
              <th>Year</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bikes.map(bike => (
              <tr key={bike._id}>
                <td>{bike.brand}</td>
                <td>{bike.model}</td>
                <td>{bike.year}</td>
                <td>{bike.price}</td>
                <td>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(bike._id)}><FaTrash /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" className="admin-modal" contentClassName="bg-dark text-white">
          <Modal.Header closeButton closeVariant="white">
            <Modal.Title>Add New Bike</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <div className="row g-3">
                {Object.keys(formData).map(key => (
                  <div className="col-md-6" key={key}>
                    <Form.Group>
                      <Form.Label className="text-capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Form.Label>
                      <Form.Control as={key === 'description' || key === 'issues' ? 'textarea' : 'input'} name={key} value={formData[key]} onChange={handleInputChange} required className="bg-dark text-white border-secondary" />
                    </Form.Group>
                  </div>
                ))}
                <div className="col-md-12">
                  <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} required className="bg-dark text-white border-secondary" />
                  </Form.Group>
                </div>
              </div>
              <Button type="submit" variant="danger" className="mt-4 w-100">Save Bike</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default Admin;
