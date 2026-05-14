import { useState, useEffect, useMemo } from 'react';
import { Container, Table, Button, Form, Modal, Row, Col } from 'react-bootstrap';
import { FaTrash, FaPlus, FaMotorcycle, FaMoneyBillWave, FaChartLine, FaSignOutAlt, FaCheck } from 'react-icons/fa';
import { apiUrl } from '../config/api';

// Parse price strings like "₱450,000" → 450000
const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  return parseFloat(String(priceStr).replace(/[^0-9.]/g, '')) || 0;
};

// Format numbers with commas: 1000 -> 1,000
const formatWithCommas = (val) => {
  if (!val) return '';
  // Remove existing commas and non-digits
  const cleanNum = val.toString().replace(/[^0-9]/g, '');
  if (!cleanNum) return val;
  return Number(cleanNum).toLocaleString();
};

const EMPTY_FORM = {
  combinedIdentity: '', // Format: BRAND MODEL ENGINE_SIZE
  edition: '',
  type: '', year: '', mileage: '', price: '',
  description: '', issues: '', engineConfig: '',
  power: '', transmission: '', fuelCapacity: '',
  brand: '', model: '', engineSize: '' // These will be auto-populated
};

const Admin = () => {
  // Persist auth across hot-reloads using sessionStorage (expires when tab is closed)
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('adminAuth') === 'true'
  );
  const [password, setPassword] = useState('');
  const [bikes, setBikes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [imageFiles, setImageFiles] = useState([]);
  const [view, setView] = useState('Available');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBikes = async () => {
    try {
      const res = await fetch(apiUrl('/api/bikes'));
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
    if (password === 'admin123') {
      sessionStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // 1. Negative Number Validation
    const numericFields = ['year', 'mileage', 'price', 'power', 'fuelCapacity'];
    if (numericFields.includes(name)) {
      const numValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
      if (numValue < 0) return; // Prevent negative numbers
    }

    // 2. Character Limit Validation (50 chars for short fields)
    const longFields = ['description', 'issues'];
    if (!longFields.includes(name) && value.length > 50) {
      return; // Cap at 50 characters
    }

    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e) => setImageFiles(Array.from(e.target.files));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    // ── Automatic Mapping Logic ──
    const parts = formData.combinedIdentity.trim().split(/\s+/);
    let brand = '';
    let model = '';
    let engineSize = '';

    if (parts.length >= 3) {
      brand = parts[0];
      engineSize = parts[parts.length - 1];
      model = parts.slice(1, -1).join(' ');
    } else if (parts.length === 2) {
      brand = parts[0];
      model = parts[1];
    } else if (parts.length === 1) {
      brand = parts[0];
    }

    const data = new FormData();
    // Append auto-mapped fields
    data.append('brand', brand);
    data.append('model', model);
    const cleanEngineSize = engineSize.toUpperCase().replace('CC', '').trim();
    data.append('engineSize', `${formatWithCommas(cleanEngineSize)} CC`);
    
    // Append rest of the form
    Object.keys(formData).forEach((key) => {
      if (!['brand', 'model', 'engineSize', 'combinedIdentity'].includes(key)) {
        let value = formData[key];
        // Auto-format numeric strings with commas
        if (['price', 'mileage'].includes(key)) {
          value = formatWithCommas(value);
        }
        data.append(key, value);
      }
    });
    
    imageFiles.forEach((file) => data.append('images', file));

    try {
      const res = await fetch(apiUrl('/api/bikes'), { method: 'POST', body: data });
      if (!res.ok) throw new Error(await res.text());
      setShowModal(false);
      setFormData(EMPTY_FORM);
      setImageFiles([]);
      fetchBikes();
    } catch (err) {
      console.error('Failed to add bike:', err);
      alert('Failed to save bike. Check the console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bike?')) {
      try {
        await fetch(apiUrl(`/api/bikes/${id}`), { method: 'DELETE' });
        fetchBikes();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleMarkAsSold = async (id) => {
    if (window.confirm('Mark this bike as sold?')) {
      try {
        await fetch(apiUrl(`/api/bikes/${id}/sold`), { method: 'PATCH' });
        fetchBikes();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Analytics — derived from bikes array
  const stats = useMemo(() => {
    const availableBikes = bikes.filter(b => b.status === 'Available');
    const soldBikes = bikes.filter(b => b.status === 'Sold');
    const count = availableBikes.length;
    const totalInventoryValue = availableBikes.reduce((sum, b) => sum + parsePrice(b.price), 0);
    const totalIncome = soldBikes.reduce((sum, b) => sum + parsePrice(b.price), 0);
    return { count, totalInventoryValue, totalIncome, availableBikes, soldBikes };
  }, [bikes]);

  // ── Login Screen ──
  if (!isAuthenticated) {
    return (
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div style={{ width: '340px', backgroundColor: '#171717', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="text-center mb-4">
            <FaMotorcycle style={{ fontSize: '2.5rem', color: 'var(--accent-color)', marginBottom: '12px' }} />
            <h3 className="text-white mb-1">Admin Panel</h3>
            <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Jett Lau Done Deal</p>
          </div>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ backgroundColor: '#0a0a0a', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px' }}
              />
            </Form.Group>
            <Button type="submit" variant="danger" className="w-100" style={{ padding: '12px', fontWeight: '600', letterSpacing: '1px' }}>
              LOGIN
            </Button>
          </Form>
        </div>
      </Container>
    );
  }

  // ── Dashboard ──
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '100vh', backgroundColor: '#0a0a0a' }}>
      <Container>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 className="text-white mb-1">Admin Dashboard</h2>
            <p className="text-secondary mb-0" style={{ fontSize: '0.9rem' }}>Manage your motorcycle inventory</p>
          </div>
          <div className="d-flex gap-3">
            <Button
              variant="outline-secondary"
              onClick={handleLogout}
              className="d-flex align-items-center gap-2"
              style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'white' }}
            >
              <FaSignOutAlt /> Logout
            </Button>
            <Button variant="danger" onClick={() => setShowModal(true)} className="d-flex align-items-center gap-2">
              <FaPlus /> Add New Bike
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <Row className="g-4 mb-5">
          {[
            {
              icon: <FaMotorcycle style={{ fontSize: '1.8rem', color: 'var(--accent-color)' }} />,
              label: 'Bikes in Stock',
              value: stats.count,
              sub: 'units available',
            },
            {
              icon: <FaMoneyBillWave style={{ fontSize: '1.8rem', color: '#34d399' }} />,
              label: 'Total Inventory Value',
              value: `₱${stats.totalInventoryValue.toLocaleString()}`,
              sub: 'combined price of all available units',
            },
            {
              icon: <FaChartLine style={{ fontSize: '1.8rem', color: '#60a5fa' }} />,
              label: 'Total Income',
              value: `₱${stats.totalIncome.toLocaleString()}`,
              sub: 'total value of sold units',
            },
          ].map((card) => (
            <Col md={4} key={card.label}>
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '24px',
                  transition: 'border-color 0.3s',
                }}
              >
                <div className="d-flex justify-content-between align-items-start mb-3">
                  {card.icon}
                </div>
                <div className="text-secondary mb-1" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{card.label}</div>
                <div className="text-white fw-bold" style={{ fontSize: '1.8rem', letterSpacing: '-0.02em' }}>{card.value}</div>
                <div className="text-secondary" style={{ fontSize: '0.78rem', marginTop: '4px' }}>{card.sub}</div>
              </div>
            </Col>
          ))}
        </Row>

        {/* View Selector */}
        <div className="d-flex justify-content-between align-items-center mb-4 mt-5">
          <h4 className="text-white mb-0">{view === 'Available' ? 'Available Inventory' : 'Sold Units'}</h4>
          <Form.Group style={{ width: '200px' }}>
            <Form.Select 
              value={view} 
              onChange={(e) => setView(e.target.value)}
              className="bg-dark text-white border-secondary"
            >
              <option value="Available">Available Inventory</option>
              <option value="Sold">Sold Units</option>
            </Form.Select>
          </Form.Group>
        </div>

        {view === 'Available' ? (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Brand</th>
                <th>Model</th>
                <th>Type</th>
                <th>Year</th>
                <th>Price</th>
                <th style={{ width: '150px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats.availableBikes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-secondary py-4">No bikes in inventory. Add one to get started.</td>
                </tr>
              ) : (
                stats.availableBikes.map((bike) => (
                  <tr key={bike._id}>
                    <td>{bike.brand}</td>
                    <td>{bike.model}</td>
                    <td>{bike.type}</td>
                    <td>{bike.year}</td>
                    <td>{bike.price}</td>
                    <td style={{ textAlign: 'center' }}>
                      <div className="d-flex justify-content-center gap-2">
                        <Button variant="outline-success" size="sm" onClick={() => handleMarkAsSold(bike._id)} title="Mark as Sold">
                          <FaCheck />
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(bike._id)} title="Delete">
                          <FaTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        ) : (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Brand</th>
                <th>Model</th>
                <th>Type</th>
                <th>Year</th>
                <th>Price</th>
                <th style={{ width: '80px', textAlign: 'center' }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {stats.soldBikes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-secondary py-4">No units have been sold yet.</td>
                </tr>
              ) : (
                stats.soldBikes.map((bike) => (
                  <tr key={bike._id}>
                    <td>{bike.brand}</td>
                    <td>{bike.model}</td>
                    <td>{bike.type}</td>
                    <td>{bike.year}</td>
                    <td>{bike.price}</td>
                    <td style={{ textAlign: 'center' }}>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(bike._id)}>
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}

        {/* Add Bike Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" contentClassName="bg-dark text-white">
          <Modal.Header closeButton closeVariant="white">
            <Modal.Title>Add New Bike</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* ── Custom Identity Inputs ── */}
                <div className="col-md-12">
                  <Form.Group>
                    <Form.Label className="text-secondary" style={{ fontSize: '0.85rem' }}>
                      Motorcycle Identity <span className="text-accent ms-1">*</span>
                    </Form.Label>
                    <Form.Control
                      placeholder="BRAND MODEL ENGINE_SIZE (e.g. KAWASAKI Z 1000)"
                      name="combinedIdentity"
                      value={formData.combinedIdentity}
                      onChange={handleInputChange}
                      required
                      className="bg-dark text-white border-secondary"
                    />
                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>Format: [BRAND] [MODEL] [ENGINE SIZE]</small>
                  </Form.Group>
                </div>
                <div className="col-md-12">
                  <Form.Group>
                    <Form.Label className="text-secondary" style={{ fontSize: '0.85rem' }}>Edition (Optional)</Form.Label>
                    <Form.Control
                      placeholder="e.g. R Edition, HP Edition"
                      name="edition"
                      value={formData.edition}
                      onChange={handleInputChange}
                      className="bg-dark text-white border-secondary"
                    />
                  </Form.Group>
                </div>

                {/* ── Rest of the Form ── */}
                {Object.keys(formData).map((key) => {
                  const isHidden = ['brand', 'model', 'engineSize', 'combinedIdentity', 'edition'].includes(key);
                  if (isHidden) return null;

                  const isRequired = ['type', 'year', 'mileage', 'price'].includes(key);
                  
                  const placeholders = {
                    type: 'e.g. Adventure, Sport, Touring',
                    year: 'e.g. 2023',
                    mileage: 'e.g. 15000 (just the number)',
                    price: 'e.g. 850000 (just the number)',
                    description: 'Detailed overview of the bike...',
                    issues: 'Press Shift+Enter to separate into bullets',
                    engineConfig: 'e.g. Inline-4, Boxer, V-Twin',
                    power: 'e.g. 136 (in HP)',
                    transmission: 'e.g. 6-Speed Manual',
                    fuelCapacity: 'e.g. 20 (in Liters)'
                  };

                  return (
                    <div className="col-md-6" key={key}>
                      <Form.Group>
                        <Form.Label className="text-capitalize text-secondary" style={{ fontSize: '0.85rem' }}>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                          {isRequired && <span className="text-accent ms-1">*</span>}
                        </Form.Label>
                        <Form.Control
                          as={key === 'description' || key === 'issues' ? 'textarea' : 'input'}
                          name={key}
                          value={formData[key]}
                          onChange={handleInputChange}
                          required={isRequired}
                          placeholder={placeholders[key] || ''}
                          className="bg-dark text-white border-secondary"
                          rows={key === 'description' || key === 'issues' ? 3 : undefined}
                          type={['year'].includes(key) ? 'number' : 'text'}
                        />
                        {key === 'issues' && (
                          <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                            * Press <kbd style={{backgroundColor: '#333'}}>Shift</kbd> + <kbd style={{backgroundColor: '#333'}}>Enter</kbd> to create separate bullet points.
                          </small>
                        )}
                      </Form.Group>
                    </div>
                  );
                })}
                <div className="col-md-12">
                  <Form.Group>
                    <Form.Label className="text-secondary" style={{ fontSize: '0.85rem' }}>Photos</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleFileChange}
                      multiple
                      accept="image/*"
                      required
                      className="bg-dark text-white border-secondary"
                    />
                    {imageFiles.length > 0 && (
                      <small className="text-secondary mt-1 d-block">
                        {imageFiles.length} photo{imageFiles.length > 1 ? 's' : ''} selected
                      </small>
                    )}
                  </Form.Group>
                </div>
              </div>
              <Button
                type="submit"
                variant="danger"
                className="mt-4 w-100"
                disabled={isSubmitting}
                style={{ padding: '12px', fontWeight: '600', letterSpacing: '1px' }}
              >
                {isSubmitting ? 'Saving...' : 'SAVE BIKE'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default Admin;
