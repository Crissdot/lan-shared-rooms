const backendDomain = process.env.REACT_APP_BACKEND_DOMAIN || 'http://localhost';
const backendEndpoint = '/api/v1';
const backendURL = backendDomain + backendEndpoint;

export const config = {
  backendDomain,
  backendURL,
  backendEndpoint,
  socketEndpoint: backendEndpoint + '/socket.io'
};
