import apiHelper from '../utils/apiHelper';



const handleApiError = (error) => {
  // إذا كان الخطأ يحتوي على استجابة من الخادم
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  // إذا كان الخطأ مشكلة في الاتصال
  if (error.message) {
    return `Network error: ${error.message}`;
  }
  // رسالة افتراضية في حالة عدم تحديد السبب
  return 'An unexpected error occurred. Please try again.';
};

const handleSuccessMessage = (message) => {
  console.log(message);
};


export const uploadFiles = async (files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files[]', file));

  try {
    const response = await apiHelper.post('/file/uploadFiles', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    handleSuccessMessage('Files uploaded successfully.');
    return response.data.data;
  } catch (error) {
    console.error('Error uploading files:', error);
    throw new Error(handleApiError(error));
  }
};


  export const fetchMyFiles = async (page = 1) => {
    const response = await apiHelper.get(`/file/getMyFiles?page=${page}`);
    return response.data.data;
  };
  
  export const fetchAllFiles = async (page = 1) => {
    const response = await apiHelper.get(`/file/getAllFiles?page=${page}`);
    return response.data.data; 
  };

  export const checkInFiles = async (fileIds) => {
    try {
      const response = await apiHelper.post('/file/checkInMultipleFiles', { fileIds });
      return response.data.data;
    } catch (error) {
      console.error('Error checking in files:', error);
      throw error;
    }
  };

  export const checkOutFile = async (id, file) => {
    try {
      const formData = new FormData();
      formData.append('id', id);  // تأكد من تمرير المعرف بشكل صحيح
      formData.append('file', file);
  
      const response = await apiHelper.post('/file/checkOut', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      return response.data.data;
    } catch (error) {
      console.error('Error checking out file:', error);
      throw new Error(error.response?.data?.message || 'Failed to check out file.');
    }
  };
  