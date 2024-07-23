import axios from 'axios';
import baseURL from '../config/apiConfig';

const service = '/community/chat';

const url = `${baseURL}${service}`;

const list = async user => {
  const response = await axios({
    url: `${url}/list`,
    method: 'GET',
  });

  return response.data;
};

const send = async chat => {
    const response = await axios({
      url: `${url}/save`,
      method: 'POST',
      data:{
        chat
      }
    });
  
    return response.data;
  };

const ChatService = {
  list,
  send,
};

export default ChatService;
