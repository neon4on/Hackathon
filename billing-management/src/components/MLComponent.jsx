import { useEffect, useState } from 'react';
import axios from 'axios';

import styles from 'src/styles/components/MLComponent.module.scss';

const MLComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/ml');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.ML}>
      <h1>ML Data</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default MLComponent;
