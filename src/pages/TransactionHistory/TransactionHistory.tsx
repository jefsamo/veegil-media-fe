import { Table } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/contstants";

type User = {
  _id: string;
  amount: number;
  recipient: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  sender: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
};

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user")!);
  // console.log(currentUser._id);
  let token = localStorage.getItem("token");
  token = token!.replace(/['"]+/g, "");

  useEffect(() => {
    const getHistory = async () => {
      const res = await axios.get(`${BASE_URL}/transactions`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(res.data);
      // console.log(transactions);
    };
    getHistory();
  }, [transactions]);

  const rows = transactions.map((transaction: User) => (
    <Table.Tr key={transaction._id}>
      <Table.Td>{`${transaction.sender.firstName} ${transaction.sender.lastName}`}</Table.Td>
      <Table.Td>{`${transaction.recipient.firstName} ${transaction.recipient.lastName}`}</Table.Td>
      <Table.Td>
        {`${currentUser._id === transaction.sender._id ? "-" : "+"}`}
        {transaction.amount}
      </Table.Td>
      <Table.Td>{transaction.createdAt}</Table.Td>
    </Table.Tr>
  ));
  return (
    <div className="history">
      <h1
        className="history-title"
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        Transaction History
      </h1>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>From</Table.Th>
            <Table.Th>Recipient</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows.length > 0 ? rows : "No transactions"}</Table.Tbody>
      </Table>
    </div>
  );
};

export default TransactionHistory;
