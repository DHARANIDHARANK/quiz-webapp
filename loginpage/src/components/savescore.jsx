import axios from 'axios';

const saveScore = async (score) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  if (!token || !userId) {
    console.error('User is not logged in.');
    return;
  }

  try {
    const response = await axios.post(
      'http://localhost:3000/api/save-score',
      { score, userId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response.data.message);
  } catch (error) {
    if (error.response) {
      console.error('Error saving score:', error.response.data.message);
    } else if (error.request) {
      console.error('Error saving score: No response received from server.');
    } else {
      console.error('Error saving score:', error.message);
    }
  }
};

export default saveScore;
