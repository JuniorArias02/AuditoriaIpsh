import axios from "axios";
import { AUTH_USER } from "../config/auth";

export const autenticar = async (form) => {
  try {
    const res = await axios.post(AUTH_USER.AUTH, form);
    return res.data;
  } catch (err) {
    if (err.response?.data) {
      return err.response.data;
    }
    throw err;
  }
};
