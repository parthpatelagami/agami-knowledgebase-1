import axios from "axios";
import { AuthModel, UserModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;
const REACT_APP_API_URL =
import.meta.env.REACT_APP_API_URL || "http://localhost:3001";

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const LOGIN_URL = `${REACT_APP_API_URL}/knowledgebase/login`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    email,
    password,
  });
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  password: string,
  password_confirmation: string,
  otp:string
) {
  return axios.post(`${REACT_APP_API_URL}/knowledgebase/register`, {
    email,
    name: firstname,
    password,
    otp,
    companyId:1,
  });
}

export function getUserById(
  id: string,
) {
  return axios.post(`${REACT_APP_API_URL}/knowledgebase/getUserById`, {
    id,
  });
}

export function generateOTP(
  email: string,
) {
  return axios.post(`${REACT_APP_API_URL}/knowledgebase/generateotp`, {
    email,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  });
}
