import axios from "axios";
import { BASE_URL } from "../utils/contstants";
interface ILogin {
  email: string;
  password: string;
}

export const login = async ({ email, password }: ILogin) => {
  try {
    const user = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};
