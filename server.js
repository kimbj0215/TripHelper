const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// File upload setup using multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API 키 확인
if (!process.env.GEMINI_API_KEY) {
    console.error("오류: GEMINI_API_KEY가 .env 파일에 설정되지 않았습니다.");
    process.exit(1);
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// API Endpoint
app.post('/api/generate-plan', upload.single('image'), async (req, res) => {
    try {
        const { type, destination, duration, budget } = req.body;
        
        // ✨✨✨ 바로 이 부분이 핵심입니다! ✨✨✨
        // 최신 라이브러리에 맞는 최신 모델 이름을 사용합니다.
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        // ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨

        let prompt;
        const imageParts = [];

        if (type === 'text') {
            if (!destination || !duration || !budget) {
                return res.status(400).json({ error: 'Missing required text fields' });
            }
            prompt = `
                여행 계획을 짜줘. 여행지는 '${destination}', 기간은 '${duration}', 1인당 총 예산은 '${budget}'이야.
                아래 JSON 형식에 맞춰서 응답해줘. 다른 말은 아무것도 하지 말고 JSON 데이터만 응답해야 해.
                - destination: 여행지 이름
                - day: "1일차 (YYYY-MM-DD)" 형식. 날짜는 임의로 지정.
                - time: "오전", "점심", "오후", "저녁"
                - description: 활동 제목 (예: 에펠탑 방문)
                - details: 활동에 대한 구체적인 설명, 팁, 예상 비용 등 (1~2줄)

                [
                  {
                    "destination": "${destination}",
                    "day": "1일차",
                    "activities": [
                      {"time": "오전", "description": "활동1", "details": "설명1"},
                      {"time": "점심", "description": "활동2", "details": "설명2"},
                      {"time": "오후", "description": "활동3", "details": "설명3"},
                      {"time": "저녁", "description": "활동4", "details": "설명4"}
                    ]
                  }
                ]
            `;
            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();
            
            const jsonResponse = text.replace(/```json/g, "").replace(/```/g, "").trim();
            const plan = JSON.parse(jsonResponse);
            return res.json({ plan });

        } else if (type === 'image') {
            if (!req.file) {
                return res.status(400).json({ error: 'Missing image file' });
            }
            const imagePart = {
                inlineData: {
                    data: req.file.buffer.toString("base64"),
                    mimeType: req.file.mimetype,
                },
            };
            imageParts.push(imagePart);

            prompt = `
                이 사진을 보고 여기가 어디인지, 그리고 어떤 곳인지 알려줘. 그 다음, 이곳을 중심으로 2박 3일 여행 계획을 짜줘.
                아래 JSON 형식에 맞춰서 응답해줘. 다른 말은 아무것도 하지 말고 JSON 데이터만 응답해야 해.
                - destination: 사진 속 여행지 이름
                - day: "1일차", "2일차", "3일차"
                - time: "오전", "점심", "오후", "저녁"
                - description: 활동 제목
                - details: 활동에 대한 구체적인 설명 및 팁 (1~2줄)
                
                [
                  {
                    "destination": "사진 속 장소",
                    "day": "1일차",
                    "activities": [
                      {"time": "오전", "description": "활동1", "details": "설명1"},
                      {"time": "점심", "description": "활동2", "details": "설명2"}
                    ]
                  }
                ]
            `;

            const result = await model.generateContent([prompt, ...imageParts]);
            const response = result.response;
            const text = response.text();

            const jsonResponse = text.replace(/```json/g, "").replace(/```/g, "").trim();
            const plan = JSON.parse(jsonResponse);
            return res.json({ plan });

        } else {
            return res.status(400).json({ error: 'Invalid type specified' });
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ error: 'Failed to generate travel plan' });
    }
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

