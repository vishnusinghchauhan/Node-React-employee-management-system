import axios from "axios";

const setAuthToken = () => {
  var token = localStorage.getItem('id_token')
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;