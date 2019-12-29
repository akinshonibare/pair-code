// imports
import axios from "axios";

// get code snippers from server
const getsnippets = () => {
  return axios.get("/api/snippets");
};

// exports
export { getsnippets };
