import Pusher from "pusher-js";

// جلب التوكين من التخزين المحلي
const token = localStorage.getItem("token");

if (!token) {
  console.error("Token is not found in localStorage. Please login.");
}

const pusherClient = new Pusher("2bd542e901b01838f4a7", {
  cluster: "eu",
  authEndpoint: "http://localhost:8000/broadcasting/auth", // تأكد من أن النقطة تعمل
  auth: {
    headers: {
      Authorization: `Bearer ${token}`, // تمرير التوكين مع الطلب
    },
  },
});

// تسجيل الأخطاء أثناء الاتصال بـ Pusher
pusherClient.connection.bind("error", (err) => {
  console.error("Pusher connection error:", err);
});

export default pusherClient;
