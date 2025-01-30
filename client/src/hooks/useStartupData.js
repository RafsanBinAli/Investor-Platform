import { useState, useEffect } from 'react';
import { fetchStartupData } from '../api/startupApi';

export const useStartupData = () => {
  const [startupData, setStartupData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchStartupData();
        setStartupData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { startupData, isLoading, error };
};