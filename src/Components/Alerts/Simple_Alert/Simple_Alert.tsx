import React, { useRef, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import type { Toast as ToastType } from 'primereact/toast';
import './Simple_Alert.scss';
import { useNavs } from '../../../Contexts/Navs_Context';

const Simple_Alert: React.FC = () => {
  const toast = useRef<ToastType>(null);
  const { alert, setAlert } = useNavs();

  useEffect(() => {
    if (alert.open) {
      // Mapeia 'warning' para 'warn' (formato do PrimeReact)
      const severity = alert.type === 'warning' ? 'warn' : alert.type;
      
      toast.current?.show({
        severity: severity as 'success' | 'error' | 'warn' | 'info',
        summary: alert.type.charAt(0).toUpperCase() + alert.type.slice(1),
        detail: alert.message,
        life: 2000,
      });
      // Reseta o alerta após exibir
      setAlert({ ...alert, open: false });
    }
  }, [alert, setAlert]);

  return (
    <div className='Simple_Alert'>
      <Toast ref={toast} />
    </div>
  );
};

export default Simple_Alert;

