/* eslint-disable no-unused-vars */
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    c_name: "nisha",
    p_name: "speaker",
    quantity: 10,
    price: 100000,
  });

  useEffect(() => {
    const getOrders = async () => {
      const fetchOrders = await axios.get("http://localhost:5000/get-orders");

      setOrders(fetchOrders.data.orders);
    };
    getOrders();
  }, []);

  useEffect(() => {
    console.log(orders);
  }),
    [orders];

  const handleOrder = async () => {
    await axios.post("http://localhost:5000/new-order/", newOrder, {});
  };

  return (
    <>
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
          {orders.map((index, order) => {
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{order.c_name}</td>
              <td>{order.p_name}</td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
            </tr>;
          })}
        </tbody>
      </Table>

      <Button onClick={() => handleOrder()}>+</Button>
    </>
  );
}

export default App;
