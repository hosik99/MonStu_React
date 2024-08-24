import axios from "axios";

export const connectSpring = axios.create({     //axios 생성
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터 추가
connectSpring.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // 로컬 저장소에서 토큰 가져오기
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // 헤더에 토큰 추가
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
