/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Form, FormControl } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import process from "process";

function App() {
  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

  console.log(REACT_APP_SERVER_URL);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const customerName = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      await axios
        .get(`${REACT_APP_SERVER_URL}get-orders`)
        .then((fetchedOrders) => setOrders(fetchedOrders.data.orders))
        .catch((err) => {
          console.error(`Error fetching orders: ${err}`);
        });
    };

    getOrders();

    const getProducts = async () => {
      await axios
        .get(`${SERVER_URL}get-products`)
        .then((fetchedProducts) => setProducts(fetchedProducts.data.products))
        .catch((err) => {
          console.error(`Error fetching products: ${err}`);
        });
    };

    getProducts();
  }, []);

  useEffect(() => {
    setTotalPrice(
      selectedProduct !== null ? selectedProduct.p_price * quantity : 0
    );
  }, [quantity, selectedProduct]);

  useEffect(() => {
    setSelectedProduct(null);
    setQuantity(1);
    setTotalPrice(0);
  }, [isModalOpen]);

  const handleNewOrder = async () => {
    if (
      customerName.current !== null &&
      customerName.current.value.trim() !== "" &&
      selectedProduct !== null
    ) {
      await axios
        .post("http://localhost:5000/new-order/", {
          c_name: customerName.current.value.trim(),
          p_name: selectedProduct.p_name,
          quantity: parseInt(quantity),
          o_price: parseInt(totalPrice),
        })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <div
        style={{
          width: "100dvw",
          height: "100dvh",
        }}>
        <Table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Customer</td>
              <td>Product</td>
              <td>Quantity</td>
              <td>Total Price</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.c_name}</td>
                  <td>{order.p_name}</td>
                  <td>{order.quantity}</td>
                  <td>{order.o_price}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <Button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: "1rem",
            right: "1rem",
            borderRadius: "0.6rem",
            padding: "0.5rem 0.8rem",
          }}
          onClick={() => setIsModalOpen((prev) => !prev)}>
          +
        </Button>
      </div>

      {isModalOpen && (
        <Form.Group
          controlId="formNewOrder"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "0.01rem solid #bfbfbf",
            borderRadius: "0.4rem",
            backgroundColor: "white",
            width: "20rem",
            height: "max-content",
            padding: "1rem 0 1rem 0",
          }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 1rem 0.5rem 1rem",
              borderBottom: "0.01rem solid #bfbfbf",
            }}>
            <span>New Order</span>
            <span
              style={{
                cursor: "pointer",
                backgroundColor: "#bfbfbf",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "0.4rem",
                padding: "0.25rem 0.65rem",
              }}
              onClick={() => setIsModalOpen(false)}>
              X
            </span>
          </div>
          <div
            style={{
              padding: "0 1rem",
            }}>
            <Form.Label>Customer Name</Form.Label>
            <FormControl
              type="text"
              placeholder="Eg. John Doe"
              ref={customerName}
            />
          </div>
          <div
            style={{
              padding: "0 1rem",
            }}>
            <Form.Select
              tyle={{ width: "100%" }}
              onChange={(e) => {
                setSelectedProduct(
                  ...products.map((product, index) => {
                    if (e.target.value.toLowerCase() === product.p_name) {
                      return product;
                    }
                    return null;
                  })
                );
              }}>
              <option selected={true} disabled={true}>
                Product Name
              </option>
              {products.map((product, index) => {
                return (
                  <option key={index}>
                    {product.p_name.charAt(0).toUpperCase() +
                      product.p_name.slice(1)}
                  </option>
                );
              })}
            </Form.Select>
          </div>

          <div
            style={{
              padding: "0 1rem",
            }}>
            <Form.Label>Quantity</Form.Label>
            <FormControl
              type="number"
              min={1}
              placeholder="Eg. 1"
              defaultValue={1}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "0 1rem",
            }}>
            <span>Total Price</span>
            <span>{totalPrice ?? 0}</span>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              padding: "0 1rem",
            }}>
            <Button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "0.6rem",
                padding: "0.5rem 0.8rem",
              }}
              onClick={handleNewOrder}>
              Add Order
            </Button>
          </div>
        </Form.Group>
      )}
    </>
  );
}

export default App;
