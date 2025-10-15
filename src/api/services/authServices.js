import axios from "axios";
import { AUTH_USER } from "../config/auth";

export const autenticar = async (form) => {
	const res = await axios.post(AUTH_USER.AUTH, form);
	return res.data;
  };
  
  