import { useState, useEffect } from "react";
import { useNavs } from "../../Contexts/Navs_Context";
import http from "../../Service/httpService";
import { End_Points } from "../../Service/endPoints";

interface Currency {
  id: string;
  short_code: string;
  name: string;
}

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setAlert } = useNavs();

  const fetchCurrencies = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await http.get(
        End_Points.Get_All_Currencies_Endpoint(),
        { withCredentials: true }
      );

      setCurrencies(response.data);

    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || "Failed to fetch currencies";
      
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
    fetchCurrencies();
  }, []);

  return {
    currencies,
    loading,
    error,
    fetchCurrencies, // Para recarregar manualmente se necessário
  };
};