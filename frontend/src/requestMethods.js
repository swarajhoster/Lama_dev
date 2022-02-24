import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTFmZGNiMzAzNWYxYjUyMGE4ZDcyYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NTQzODQ3OSwiZXhwIjoxNjQ1Njk3Njc5fQ.067w4HUnha69Bb4cOfMTpeZB83ojCOK3Yss_VsOYVZ8`;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
