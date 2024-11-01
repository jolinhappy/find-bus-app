import axios from 'axios';
import qs from 'qs';

const baseURL = 'https://tdx.transportdata.tw/api/basic/v2';
const axiosInstance = axios.create({
  baseURL,
});

const getAuthorizationHeader = async () => {
  const parameter = {
    grant_type: 'client_credentials',
    client_id: 'jolinhappy1990-71000e55-bdc3-4bb5',
    client_secret: '521e33a3-2e20-4e29-a021-f89f338399a8',
  };
  const auth_url = `https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token`;
  try {
    const res = await axios({
      method: 'POST',
      url: auth_url,
      data: qs.stringify(parameter),
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    });
    const accessToken = res.data;
    return {
      authorization: `Bearer ${accessToken.access_token}`,
    };
  } catch (err) {
    return err;
  }
};

const initializeApiHelper = async () => {
  const authorization = await getAuthorizationHeader();
  const GMTString = new Date().toUTCString();
  if (authorization) {
    axiosInstance.interceptors.request.use(
      (config) => {
        config.headers = {
          ...(authorization || {}),
          'X-Date': GMTString,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        };
        return config;
      },
      (err) => Promise.reject(err)
    );
  }
};

initializeApiHelper();

export const apiHelper = axiosInstance;
