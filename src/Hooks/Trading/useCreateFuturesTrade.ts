import { useState } from "react";
import { useNavs } from "../../Contexts/Navs_Context";
import { End_Points } from "../../Service/endPoints";
import http from "../../Service/httpService";

export const useCreateFuturesTrade = () => {
  const [symbol, setSymbol] = useState('');
  const [direction, setDirection] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  const [exitPrice, setExitPrice] = useState('');
  const [size, setSize] = useState('');
  const [currencyId, setCurrencyId] = useState('');
  const [setupId, setSetupId] = useState('');
  const [commission, setCommission] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [exitDate, setExitDate] = useState('');
  const [notes, setNotes] = useState('');
  const [images, setImages] = useState('');

  const { setAlert } = useNavs();

  // ✅ Função para converter datetime-local para ISO-8601
  const formatDateToISO = (dateString: string) => {
    if (!dateString) return undefined;
    return new Date(dateString).toISOString();
  };

  const createFuturesTrade = async () => {
    // Validações
    if (!symbol) {
      setAlert({ open: true, message: "Symbol is required", type: 'error' });
      return;
    }

    if (!direction) {
      setAlert({ open: true, message: "Direction is required", type: 'error' });
      return;
    }

    if (!entryPrice) {
      setAlert({ open: true, message: "Entry price is required", type: 'error' });
      return;
    }

    if (!exitPrice) {
      setAlert({ open: true, message: "Exit price is required", type: 'error' });
      return;
    }

    if (!size) {
      setAlert({ open: true, message: "Size is required", type: 'error' });
      return;
    }

    if (!currencyId) {
      setAlert({ open: true, message: "Currency is required", type: 'error' });
      return;
    }

    if (!setupId) {
      setAlert({ open: true, message: "Setup is required", type: 'error' });
      return;
    }

    if (!commission) {
      setAlert({ open: true, message: "Commission is required", type: 'error' });
      return;
    }

    if (!entryDate) {
      setAlert({ open: true, message: "Entry date is required", type: 'error' });
      return;
    }

    if (!exitDate) {
      setAlert({ open: true, message: "Exit date is required", type: 'error' });
      return;
    }

    try {
      const tradeData = {
        symbol: symbol.toUpperCase(),
        direction: direction.toUpperCase(),
        entryPrice: parseFloat(entryPrice),
        exitPrice: parseFloat(exitPrice),
        size: parseFloat(size),
        currencyId,
        setupId,
        commission: parseFloat(commission),
        entryDate: formatDateToISO(entryDate),
        exitDate: formatDateToISO(exitDate), 
        notes: notes || undefined,
        images: images || undefined,
      };

      const response = await http.post(
        End_Points.Create_Futures_Trade_Endpoint(),
        tradeData,
        { withCredentials: true }
      );

      setAlert({
        open: true,
        message: "Trade created successfully!",
        type: 'success',
      });

      // Limpar formulário
      setSymbol('');
      setDirection('');
      setEntryPrice('');
      setExitPrice('');
      setSize('');
      setCurrencyId('');
      setSetupId('');
      setCommission('');
      setEntryDate('');
      setExitDate('');
      setNotes('');
      setImages('');

      return response.data;

    } catch (error: any) {
      console.error('❌ Erro completo:', error);
      console.error('❌ Response data:', error.response?.data);
      
      const msg = error.response?.data?.message || error.message || "Something went wrong";
      
      setAlert({
        open: true,
        message: msg,
        type: 'error',
      });

      throw error;
    }
  };

  return {
    symbol, setSymbol,
    direction, setDirection,
    entryPrice, setEntryPrice,
    exitPrice, setExitPrice,
    size, setSize,
    currencyId, setCurrencyId,
    setupId, setSetupId,
    commission, setCommission,
    entryDate, setEntryDate,
    exitDate, setExitDate,
    notes, setNotes,
    images, setImages,
    createFuturesTrade
  };
};