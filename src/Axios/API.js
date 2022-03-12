import axios from 'axios';

const postData = async (URL, params = {}) => {
  const serverResponse = {status: false, data: {}, error: ''};
  try {
    const {data} = await axios.post(URL, params);
    serverResponse.status = true;
    serverResponse.data = await data;
  } catch (error) {
    serverResponse.error = error;
  }
  return serverResponse;
};

export default postData;
