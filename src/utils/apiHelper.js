import axios from 'axios';

// إنشاء apiHelper مع إعداد Authorization باستخدام Interceptor
const apiHelper = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor لإضافة Authorization Token لجميع الطلبات
apiHelper.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiHelper;
