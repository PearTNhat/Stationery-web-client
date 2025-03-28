import { http } from '~/utils/http';
import { AxiosError } from 'axios';

const apiGetUserInfo = async ({ token }: { token: string | null }) => {
  try {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    console.log(config);
    const response = await http.get('/users/info', config);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response.data; // Return server error response if available
    }
    return (error as Error).message; // Avoid undefined error
  }
};

const apiChangePassword = async ({
  email,
  oldPassword,
  newPassword,
}: {
  email: string;
  oldPassword: string;
  newPassword: string;
}) => {
  try {
    const response = await http.post('/users/change-password', {
      email,
      oldPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response.data; // Return server error response if available
    }
    return (error as Error).message; // Avoid undefined error
  }
};

export { apiGetUserInfo, apiChangePassword };
