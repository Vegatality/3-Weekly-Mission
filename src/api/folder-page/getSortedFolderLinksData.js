import { BASE_URL } from '../instance/instance-api';

const GET_FOLDER_LINKS_DATA_API = '/api/users/1/links';

const getSortedFolderLinksData = async folderId => {
  try {
    console.log('🚀 ~ file: getSortedFolderLinksData.js:6 ~ getSortedFolderLinksData ~ folderId:', folderId);
    const queryStrings = folderId === 'total' ? '' : `?folderId=${folderId}`;
    const response = await fetch(`${BASE_URL}${GET_FOLDER_LINKS_DATA_API}${queryStrings}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.dir(data);
    return data;
  } catch (error) {
    console.error('🚀 ~ file: getSortedFolderLinksData.js:11 ~ getSortedFolderLinksData ~ error:', error);
  }
};

export { getSortedFolderLinksData };
