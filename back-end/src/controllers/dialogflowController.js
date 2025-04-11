// controllers/dialogflowController.js
import { destinationService } from '../services';
import { SessionsClient } from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const sessionClient = new SessionsClient();
const projectId = process.env.DIALOGFLOW_PROJECT_ID;

// Hàm xử lý webhook của Dialogflow
const handledialogflowWebhook = async (req, res) => {
    try {
        const { queryResult } = req.body;
        if (!queryResult) {
            return res.status(400).json({ error: 'Missing queryResult or session' });
        }

        const intentName = req.body.queryResult.intent.displayName;
        let response = {};
        let data = {};

        // Kiểm tra xem `queryResult` và `parameters` có tồn tại không trước khi truy cập
        if (!queryResult || !queryResult.parameters) {
            console.error("No parameters found in queryResult.");
            return res.json({ fulfillmentText: 'Có lỗi xảy ra khi xử lý yêu cầu.' });
        }

        const district = req.body.queryResult.parameters.districts;

        // Kiểm tra và lấy tham số `destination` từ `ask-destination_context`
        let destination = '';
        if (req.body.queryResult.parameters.destination) {
            destination = req.body.queryResult.parameters.destination;
        } else {
            return res.json({
                fulfillmentText: 'Xin lỗi, tôi không thể tìm thấy điểm đến bạn'
            })
        }


        if (intentName === 'askDestination') {
            data.name = await destinationService.getName(destination);
            response = data ? {
                fulfillmentText: `${data.name}. Có thể là điểm đến bạn muốn tìm.`
            } : {
                fulfillmentText: 'Xin lỗi, tôi không thể tìm thấy điểm đến bạn muốn.'
            };
        }

        if (intentName === 'askLocation') {
            if (!destination) {
                return res.json({
                    fulfillmentText: 'Không tìm thấy thông tin của điểm đến.'
                });
            }
            // Gọi hàm lấy địa chỉ từ service
            data.location = await destinationService.getLocation(destination);
            data.name = await destinationService.getName(destination);
            response = data ? {
                fulfillmentText: `${data.name} nằm ở vị trí ${data.location}`
            } : {
                fulfillmentText: 'Xin lỗi, tôi không thể tìm thấy địa chỉ của điểm đến.'
            };
        }

        if (intentName === 'askTime') {
            if (!destination) {
                return res.json({
                    fulfillmentText: 'Không tìm thấy thông tin của điểm đến.'
                });
            }
            // Gọi hàm lấy thời gian từ service
            data.time = await destinationService.getTime(destination);
            data.name = await destinationService.getName(destination);
            response = data ? {
                fulfillmentText: `Khung giờ mở cửa của ${data.name} là: ${data.time}`
            } : {
                fulfillmentText: 'Xin lỗi, tôi không thể tìm thấy thời gian mở cửa của điểm đến.'
            };
        }

        if (intentName === 'askPrice') {
            if (!destination) {
                return res.json({
                    fulfillmentText: 'Không tìm thấy thông tin của điểm đến.'
                });
            }
            // Gọi hàm lấy giá từ service
            data.price = await destinationService.getPrice(destination);
            data.name = await destinationService.getName(destination);
            response = data ? {
                fulfillmentText: `Giá vé vào cửa của ${data.name} là: ${data.price}`
            } : {
                fulfillmentText: 'Xin lỗi, tôi không thể tìm thấy giá vé của điểm đến.'
            };
        }

        if (intentName === 'askAdvantage') {
            if (!destination) {
                return res.json({
                    fulfillmentText: 'Không tìm thấy thông tin của điểm đến.'
                });
            }
            // Gọi hàm lấy ưu điểm từ service
            data.advantage = await destinationService.getAdvantage(destination);
            data.name = await destinationService.getName(destination);
            response = data ? {
                fulfillmentText: `Ưu điểm của ${data.name} là: ${data.advantage}`
            } : {
                fulfillmentText: 'Xin lỗi, tôi không thể tìm thấy ưu điểm của điểm đến.'
            };
        }

        if (intentName === 'askWeakness') {
            if (!destination) {
                return res.json({
                    fulfillmentText: 'Không tìm thấy thông tin của điểm đến.'
                });
            }
            // Gọi hàm lấy nhược điểm từ service
            data.weakness = await destinationService.getWeakness(destination);
            data.name = await destinationService.getName(destination);
            response = data ? {
                fulfillmentText: `Nhược điểm của ${data.name} là: ${data.weakness}`
            } : {
                fulfillmentText: 'Xin lỗi, tôi không thể tìm thấy nhược điểm của điểm đến.'
            };
        }

        if (intentName === 'askDescription') {
            if (!destination) {
                return res.json({
                    fulfillmentText: 'Không tìm thấy thông tin của điểm đến.'
                });
            }
            data.description = await destinationService.getDescription(destination);
            data.name = await destinationService.getName(destination);
            response = data ? {
                fulfillmentText: `${data.name}: ${data.description}`
            } : {
                fulfillmentText: 'Xin lỗi, tôi không thể tìm thấy mô tả của điểm đến.'
            }
        }

        if (intentName === 'askNumberPosts') {
            if (!destination) {
                return res.json({
                    fulfillmentText: 'Không tìm thấy thông tin của điểm đến.'
                });
            }
            data.numberposts = await destinationService.getNumberPosts(destination);
            data.name = await destinationService.getName(destination);
            response = data ? {
                fulfillmentText: `${data.name} có ${data.numberposts} lượt đánh giá`
            } : {
                fulfillmentText: 'Xin lỗi, tôi không thể tìm thấy số lượng đánh giá của điểm đến.'
            }
        }

        if (intentName === 'askRate') {
            if (!destination) {
                return res.json({
                    fulfillmentText: 'Không tìm thấy thông tin của điểm đến.'
                });
            }
            data.rate = await destinationService.getRate(destination) || 0;
            data.name = await destinationService.getName(destination);
            data.numberposts = await destinationService.getNumberPosts(destination) || 0;
            response = data ? {
                fulfillmentText: `${data.name} được ${data.rate} sao dựa trên ${data.numberposts} lượt đánh giá`
            } : {
                fulfillmentText: 'Xin lỗi, tôi không thể tìm thấy đánh giá của điểm đến.'
            }
        }

        if (intentName === 'askImage') {
            if (!destination) {
                return res.json({
                    fulfillmentText: 'Không tìm thấy thông tin của điểm đến.'
                });
            }
            data.image = await destinationService.getImage(destination);
            data.name = await destinationService.getName(destination);

            response = data.image && data.name ? {
                fulfillmentMessages: data.image.map((img) => ({
                    "card": {
                        "title": data.name,
                        "subtitle": "Hình ảnh",
                        "imageUri": img,  // Đường dẫn ảnh
                        "buttons": [
                            {
                                "text": "Xem thêm",
                                "postback": img
                            }
                        ]
                    }
                }))
            } : {
                fulfillmentText: 'Xin lỗi, tôi không thể tìm thấy hình ảnh của điểm đến.'
            };
        }

        if (intentName === 'askDestinationFromDistrict') {
            if (!district) {
                return res.json({
                    fulfillmentText: 'Không tìm thấy thông tin của quận/huyện.'
                });
            }
            data.destinations = await destinationService.getDestinationFromDistrict(district);
            response = data.destinations.length > 0 ? {
                fulfillmentMessages: data.destinations.map((des) => ({
                    "card": {
                        "title": des.name,
                        "subtitle": "Điểm đến",
                        "imageUri": des.images && des.images.length > 0 ? des.images[0].link : '', // Lấy hình ảnh đầu tiên nếu có
                        "buttons": [
                            {
                                "text": "Xem chi tiết",
                                "postback": des.name
                            }
                        ]
                    }
                }))
            } : {
                fulfillmentText: 'Xin lỗi, tôi không thể tìm thấy điểm đến từ quận/huyện bạn muốn.'
            };
        }

        return res.json(response);  // Trả về response cho Dialogflow
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: e.message });
    }
};

const dialogflowSender = async (req, res) => {
    // controllers/dialogflowController.js

    const sessionClient = new SessionsClient();

    const sessionId = uuidv4();

    // Handle Dialogflow webhook
    const sessionPath = sessionClient.projectAgentSessionPath(process.env.DIALOGFLOW_PROJECT_ID, sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: req.body.queryResult.queryText, // User input from Dialogflow
                languageCode: 'vi-VN',
            },
        },
    };

    try {
        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;

        res.json({
            data: result.fulfillmentText, // Response from Dialogflow
        });
    } catch (error) {
        console.error('Error during Dialogflow request:', error);
        res.status(500).json({ error: 'Error processing request' });
    }
};


export default {
    handledialogflowWebhook,
    dialogflowSender
};
