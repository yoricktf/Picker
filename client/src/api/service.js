import axios from "axios";

const service = axios.create({

  // baseURL: "https://pickerapp.herokuapp.com/"
  baseURL: "http://localhost:5005/"

});

const errorHandler = err => {
  throw err;
};

const uploadImage = (file) => {
  return service
    .post("/auth/upload", file)
    .then(res => res.data)
    .catch(errorHandler);
};


export default {
  service,
  uploadImage,
};
