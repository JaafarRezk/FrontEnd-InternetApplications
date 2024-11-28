import apiHelper from '../utils/apiHelper';

export const logIn = async (data) => {
    const response = await apiHelper.post('/auth/logIn', data);
    return response;
  };

  
export const logOut = async () => {
  const response = await apiHelper.post('/auth/logOut');
  return response.data;
};

export const register = async (data) => {
  const response = await apiHelper.post('/auth/register', data);
  return response.data;
};

