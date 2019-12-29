import axios from "axios";

const getToken = user => {
  return axios.post("/api/twilio/token", {
    user: `${user.name}-${user.id}`
  });
};

export { getToken };
