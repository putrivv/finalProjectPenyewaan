import axios from "axios";

export const loginUser = async (formData: { email: string; password: string }) => {
  const response = await axios.post("https://final-project.aran8276.site/api/login", formData, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};
