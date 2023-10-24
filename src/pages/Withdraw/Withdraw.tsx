/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, NumberInput } from "@mantine/core";
import axios from "axios";
import { BASE_URL } from "../../utils/contstants";
import { useState } from "react";
import toast from "react-hot-toast";

const Withdraw = () => {
  const [amount, setAmount] = useState<string | number>(0);
  // const { user, isAuthenticated } = useAuthContext();
  let token = localStorage.getItem("token");
  token = token!.replace(/['"]+/g, "");

  const withdrawMoney = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/withdraw`,
        {
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
      setAmount("");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }

    // if (res.data.statusCode === 400) {
    //   console.log("YESS");
    //   toast.error(res.data.message);
    // }
    // console.log(res.data);
    // console.log(amount);
  };
  return (
    <div className="transfer">
      <h1 className="transfer-title">Withdraw from your account</h1>
      <div className="transfer-input">
        <NumberInput placeholder="Amount" hideControls onChange={setAmount} />
      </div>
      <Button style={{ textAlign: "center" }} onClick={withdrawMoney}>
        Withdraw
      </Button>
    </div>
  );
};

export default Withdraw;
