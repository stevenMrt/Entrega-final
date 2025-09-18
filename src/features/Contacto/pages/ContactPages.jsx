import React, { useState } from "react";
import emailjs from "emailjs-com";
import './ContactPage.css';
const ContactPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    celular: "",
    message: "",
  });

  const [status, setStatus] = useState(""); 
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_ulr1xi3",      
        "template_vfg3s2o",     
        {
          email: formData.email,
          celular: formData.celular, 
          message: formData.message,
        },
        "ocFkgBpw8e1Q8nkBP"       
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          setStatus("Mensaje enviado correctamente");
          setFormData({ email: "", celular: "", message: "" }); 
        },
        (error) => {
          console.error("FAILED...", error.text);
          setStatus(" Error al enviar, intenta de nuevo");
        }
      );
  };

  return (
    <div style={{ padding: "1rem" }} className="form-container">
      <h2 className="tituloContacto">Contacto</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div style={{ marginBottom: "1rem" }} className="form-group">
          <label htmlFor="email">Email:</label><br />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }} className="form-group">
          <label htmlFor="celular">Celular:</label><br />
          <input
            type="tel"
            id="celular"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }} className="form-group">
          <label htmlFor="message">Mensaje:</label><br />
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
      {status && <p style={{ marginTop: "1rem", textAlign: "center" }}>{status}</p>}
    </div>
  );
};

export default ContactPage;