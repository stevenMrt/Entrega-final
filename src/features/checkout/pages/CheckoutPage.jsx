import React, { useState } from 'react';
import { FaCreditCard, FaPaypal, FaLock, FaCheck } from 'react-icons/fa';

const CheckoutPage = ({ cartItems, total, onOrderComplete }) => {
  const [step, setStep] = useState(1);
  const [orderData, setOrderData] = useState({
    shipping: { name: '', address: '', city: '', phone: '' },
    payment: { method: 'card', cardNumber: '', expiry: '', cvv: '' }
  });

  const handleOrder = () => {
    const order = {
      id: Date.now(),
      items: cartItems,
      total,
      date: new Date().toLocaleDateString(),
      status: 'Confirmado'
    };
    localStorage.setItem('shop-stev-orders', JSON.stringify([order]));
    onOrderComplete();
    setStep(3);
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Envío</div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Pago</div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Confirmación</div>
        </div>

        {step === 1 && (
          <div className="checkout-step">
            <h2>Información de Envío</h2>
            <div className="form-row">
              <input placeholder="Nombre completo" />
              <input placeholder="Teléfono" />
            </div>
            <input placeholder="Dirección" />
            <input placeholder="Ciudad" />
            <button className="next-btn" onClick={() => setStep(2)}>
              Continuar al Pago
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="checkout-step">
            <h2>Método de Pago</h2>
            <div className="payment-methods">
              <div className="payment-option">
                <FaCreditCard /> Tarjeta de Crédito
              </div>
              <div className="payment-option">
                <FaPaypal /> PayPal
              </div>
            </div>
            <div className="form-row">
              <input placeholder="Número de tarjeta" />
              <input placeholder="MM/AA" />
              <input placeholder="CVV" />
            </div>
            <div className="order-summary">
              <h3>Resumen del Pedido</h3>
              <div className="total">Total: ${total.toFixed(2)}</div>
            </div>
            <button className="order-btn" onClick={handleOrder}>
              <FaLock /> Confirmar Pedido
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="checkout-step success">
            <FaCheck className="success-icon" />
            <h2>¡Pedido Confirmado!</h2>
            <p>Tu pedido ha sido procesado exitosamente.</p>
            <button onClick={() => window.location.href = '/'}>
              Volver al Inicio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;