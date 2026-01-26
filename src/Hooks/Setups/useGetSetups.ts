import { useState, useEffect } from "react";
import { useNavs } from "../../Contexts/Navs_Context";
import http from "../../Service/httpService";
import { End_Points } from "../../Service/endPoints";

interface Setup {
  id: string;
  name: string;
  description: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const useGetSetups = () => {
  const [setups, setSetups] = useState<Setup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setAlert } = useNavs();

  const fetchSetups = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await http.get(
        End_Points.Get_All_Setups_Endpoint(),
        { withCredentials: true }
      );

      setSetups(response.data);

    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || "Failed to fetch setups";
      
      setError(msg);
      
      setAlert({
        open: true,
        message: msg,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Buscar automaticamente ao montar o componente
  useEffect(() => {
    fetchSetups();
  }, []);

  return {
    setups,
    loading,
    error,
    fetchSetups,
  };
};