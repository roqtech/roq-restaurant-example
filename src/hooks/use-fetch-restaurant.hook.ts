import { useCallback, useEffect, useState } from "react";

export const useFetchRestaurant = (id: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/restaurants/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    refetch();
  }, []);
  return { data, isLoading, refetch, error };
};
