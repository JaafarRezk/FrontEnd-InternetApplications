import apiHelper from '../utils/apiHelper';

export const fetchGroups = async () => {
    try {
      const response = await apiHelper.get('/MyGroups');
      console.log(response.data); 
      if (response.data && response.data.success) {
        return response.data.data; 
      } else {
        throw new Error('Failed to fetch groups');
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
      throw new Error('Failed to fetch groups');
    }
  };
  
  export const createGroup = async (groupName) => {
    try {
      const response = await apiHelper.post('/createGroup', { name: groupName });  // إرسال اسم المجموعة
      return response.data;
    } catch (error) {
      console.error('Error creating group:', error);
      throw new Error('Failed to create group');
    }
  };
  

  export const addFilesToGroup = async (groupId, selectedFileIds) => {
    const payload = {
      group_id: groupId,   // ID المجموعة
      files_ids: selectedFileIds,  // إرسال معرّفات الملفات كـ array (بدون JSON.stringify هنا إذا كان يتم التعامل مع المصفوفات مباشرة)
    };
  
    try {
      const response = await apiHelper.post(`/addFilesToGroup`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding files to group:', error.response?.data || error.message);
      throw new Error('Failed to add files to group');
    }
  };
  
  
  
  



export const addUserToGroup = async (groupId, email) => {
  const response = await apiHelper.post(``, { email });
  return response.data; // Updated group data
};


