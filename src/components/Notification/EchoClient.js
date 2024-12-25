import Echo from "laravel-echo";
import Pusher from "pusher-js";
import apiHelper from "../../utils/apiHelper"; 

const EchoClient = new Echo({
  broadcaster: "pusher",
  key: "2bd542e901b01838f4a7",
  cluster: "eu", 
  forceTLS: true,
  authEndpoint: "http://127.0.0.1:8000/api/broadcasting/auth",
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  },
  authorizer: (channel) => {
    return {
      authorize: (socketId, callback) => {
        apiHelper
          .post("/broadcasting/auth", {
            socket_id: socketId,
            channel_name: channel.name,
          })
          .then((response) => {
            callback(false, response.data);
          })
          .catch((error) => {
            console.error("Authorization error:", error.response || error);
            callback(true, error.response || error);
          });
      },
    };
  },
});

EchoClient.connector.pusher.connection.bind("error", (err) => {
  console.error("Pusher connection error:", err);
});

export default EchoClient;
