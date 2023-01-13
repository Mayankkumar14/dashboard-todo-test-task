import { useState, useEffect } from 'react';

const useFetch = (url, options) => {

  const [data, setData] = useState(null);
  const [error, setAlert] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch(url, options)
      const result = await response.json();
      setData(result);
    } catch (error) {
      setAlert(error.message)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { error, data, loading, setData };
};

export default useFetch;