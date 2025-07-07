import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true, // important for sending refreshToken cookies
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const isTokenExpired = error.response?.status === 403;

    if (isTokenExpired && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.get('http://localhost:3001/api/users/refresh', {
          withCredentials: true,
        });

        const newToken = res.data.token;
        localStorage.setItem("authToken", newToken);

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        console.log("Refresh token failed", err);
        localStorage.removeItem("authToken");
        localStorage.removeItem("usuarioLogado");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;