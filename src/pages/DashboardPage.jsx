import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Modal, Form } from "react-bootstrap";
import { FaPlusSquare, FaTrashAlt, FaEdit, FaSave } from "react-icons/fa";
import { toast } from "sonner";

const DashboardPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [kamars, setKamars] = useState([]);
  const [kamar, setKamar] = useState({
    nama: "",
    tipe: "",
    harga: "",
    deskripsi: "",
  });
  const [show, setShow] = useState(false);

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

  const handleClose = () => {
    setShow(false);
    setEditIndex(null);
  };

  const handleShow = (index) => {
    setShow(true);
    setEditIndex(index);
    if (index !== null) {
      setKamar({ ...kamars[index] });
    } else {
      setKamar({ nama: "", tipe: "", harga: "", deskripsi: "" });
      setEditIndex(null);
    }
    console.log(editIndex);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setKamar((prevKamar) => ({
      ...prevKamar,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      kamar.nama === "" ||
      kamar.tipe === "" ||
      kamar.harga === "" ||
      kamar.deskripsi === ""
    ) {
      return toast.error("Semua form harus diisi!");
    }

    console.log(editIndex);

    if (editIndex !== null) {
      console.log("tidak null");
      const updatedKamars = kamars.map((item, index) =>
        index === editIndex ? kamar : item
      );
      setKamars(updatedKamars);
      toast.success(`Berhasil Update Data Kamar ${kamar.nama} (Update)!)`);
    } else {
      console.log("null");
      const newKamar = {
        nama: kamar.nama,
        tipe: kamar.tipe,
        harga: kamar.harga,
        deskripsi: kamar.deskripsi,
      };
      setKamars([...kamars, newKamar]);
      toast.success(`Berhasil Tambah Data Kamar ${kamar.nama}`);
    }

    setKamar({ nama: "", tipe: "", harga: "", deskripsi: "" });
    handleClose();
  };

  const handleDeleteKamar = (index) => {
    toast.success(
      `Berhasil Menghapus Data Kamar ${kamars[index].nama} (Update)!`
    );
    const updatedKamars = kamars.filter((_, i) => i !== index);
    setKamars(updatedKamars);
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-3 border-bottom fw-bold">Dashboard</h1>
      <Row className="mb-4">
        <Col md={10}>
          <Card className="h-100 justify-content-center">
            <Card.Body>
              <h4>Selamat Datang,</h4>
              <h1 className="mb-3 display-6 fw-bold">{user?.username}</h1>
              <p className="mb-0">Kamu sudah login sejak:</p>
              <p className="mb-0 fw-bold lead ">{formatDate(user?.loginAt)}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card>
            <Card.Body>
              <p>Bukti sedang ngantor:</p>
              <img
                src="https://via.placeholder.com/150"
                className="img-fluid rounded"
                alt="tidak ada gambar"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <h1 className="mb-3 border-bottom fw-bold">Daftar Kamar</h1>
      <p>Grand Atma saat ini memiliki jenis kamar yang eksotis.</p>
      <button
        type="button"
        className="btn btn-success"
        onClick={() => handleShow(null)}>
        <FaPlusSquare /> Tambah Kamar
      </button>
      {kamars.map((kamar, index) => (
        <div key={index}>
          <Row className="mt-2 mb-4">
            <Col>
              <Card className="h-100 justify-content-center">
                <Card.Body>
                  <div className="row">
                    <div className="col-auto">
                      <Card.Img
                        variant="top"
                        className="img-fluid rounded"
                        style={{ width: "300px" }}
                        src={
                          kamar.tipe === "Standard"
                            ? "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            : kamar.tipe === "Superior"
                            ? "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            : "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        }
                      />
                    </div>
                    <div className="col">
                      <h4>{kamar.nama}</h4>
                      <p>{kamar.deskripsi}</p>
                      <hr className="mb-4" />
                      <p>
                        Tipe Kamar: <strong>{kamar.tipe}</strong> &#xb7; Harga :{" "}
                        <strong>{kamar.harga}</strong>
                      </p>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteKamar(index)}>
                        <FaTrashAlt /> Hapus Kamar
                      </button>
                      <button
                        className="btn btn-primary mx-2"
                        onClick={() => handleShow(index)}>
                        <FaEdit /> Edit Kamar
                      </button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      ))}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>Tambah Kamar</Modal.Title>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}></button>
          </Modal.Header>
          <Modal.Body className="mb-4">
            <Form.Group>
              <Form.Label>Nama Kamar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nama Kamar"
                name="nama"
                value={kamar.nama}
                onChange={(e) => handleOnChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipe Kamar</Form.Label>
              <Form.Select
                name="tipe"
                onChange={(e) => handleOnChange(e)}
                value={kamar.tipe}>
                <option defaultValue="">Pilih Tipe</option>
                <option value="Standard">Standard</option>
                <option value="Superior">Superior</option>
                <option value="Luxury">Luxury</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Harga Kamar</Form.Label>
              <Form.Control
                type="number"
                placeholder="Harga Kamar"
                name="harga"
                value={kamar.harga}
                onChange={(e) => handleOnChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Deskripsi Kamar</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="deskripsi"
                value={kamar.deskripsi}
                onChange={(e) => handleOnChange(e)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <FaSave /> Simpan
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};
export default DashboardPage;
