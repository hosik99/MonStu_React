import axios from "axios";

export const connectSpring = axios.create( //axios 인스턴스 생성
    {
        baseURL: 'http://localhost:8080'
    }
)