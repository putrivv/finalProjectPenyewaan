import axios from "axios";

export const loginUser = async (formData: { email: string; password: string }) => {
  const response = await axios.post("https://api-penyewaan.aran8276.site/api/login", formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const registerUser = async (formData: { 
  name: string; 
  email: string; 
  password: string; 
  password_confirmation: string; 
}) => {
  const response = await axios.post("https://api-penyewaan.aran8276.site/api/register", formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const forgotPassword = async (formData: { email: string }) => {
  const response = await axios.post("https://api-penyewaan.aran8276.site/api/forgot-password", formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};