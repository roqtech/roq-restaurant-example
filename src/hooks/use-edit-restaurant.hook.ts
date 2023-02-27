import { useCallback, useState } from "react";

export const useEditRestaurant = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const edit = useCallback((id: string, restaurant: any) => {
    setLoading(true);
    setError(null);
    fetch(`/api/restaurants/${id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurant),
    })
      .then((res) => res.json())
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { isLoading, edit, error };
};
