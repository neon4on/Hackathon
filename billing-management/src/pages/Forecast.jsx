import { useState, useEffect } from 'react';
import { fetchForecast } from '../api/api';

const Forecast = () => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const getForecast = async () => {
      try {
        const response = await fetchForecast();
        console.log('Fetched forecast:', response.data); // Debugging line
        setForecast(response.data);
      } catch (error) {
        console.error('Error fetching forecast:', error);
      }
    };
    getForecast();
  }, []);

  return (
    <div>
      <h1>
        Forecast
      </h1>
      {forecast.length > 0 ? (
        <div>
          <table>
            <thead>
              <th>
                <td>Date</td>
                <td>Predicted Amount</td>
              </th>
            </thead>
            <tbody>
              {forecast.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.predicted_amount?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>No forecast data found</h1>
      )}
    </div>
  );
};

export default Forecast;
