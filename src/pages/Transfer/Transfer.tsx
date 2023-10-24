/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, NumberInput } from "@mantine/core";
import "./transfer.css";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/contstants";
import toast from "react-hot-toast";

const Transfer = () => {
  const [amount, setAmount] = useState<string | number>();
  const [phoneNumber, setPhoneNumber] = useState("");
  // const { user, isAuthenticated } = useAuthContext();
  let token = localStorage.getItem("token");
  token = token!.replace(/['"]+/g, "");

  const sendMoney = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/transfer`,
        {
          receiver: phoneNumber,
          amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
        toast.success(res.data.status);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="transfer">
      <h1 className="transfer-title">Send money to your friends</h1>
      <div className="transfer-input">
        <Input
          placeholder="Account number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <br />
        <NumberInput
          placeholder="Amount"
          value={amount}
          onChange={setAmount}
          hideControls
        />
      </div>
      <Button style={{ textAlign: "center" }} onClick={sendMoney}>
        Send
      </Button>
    </div>
  );
};

export default Transfer;
