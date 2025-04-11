import axios from '../axios';

let chatbotService = {};

let sendMessage = (queryResult) => {
    return axios.post('api/dialogflow/sendmessage', { queryResult: queryResult });
}

chatbotService.sendMessage = sendMessage;

export default chatbotService;