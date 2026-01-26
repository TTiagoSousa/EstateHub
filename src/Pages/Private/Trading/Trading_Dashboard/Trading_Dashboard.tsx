import { lazy, Suspense, useState } from 'react';
import Global_Button from '../../../../Components/Buttons/Global_Button/Global_Button';
import './Trading_Dashboard.scss';
const Create_Trade_Form = lazy(() => import('../../../../Containers/Forms/Create_Trade_Form/Create_Trade_Form'));

const Trading_Dashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleSubmitTrade = (data: any) => {
    console.log('Trade adicionado:', data);
    // Aqui podes fazer o que quiseres com os dados:
    // - Enviar para API
    // - Guardar no estado global
    // - Mostrar notificação de sucesso
    // etc.
  };

  return (
    <div className='Trading_Dashboard'>
      <section className='Options'>
        <div className='Button_Field'>
          <Global_Button 
            text="Add new trade" 
            backgroundColor="#ef4444"
            textColor="#fff"
            onClick={handleOpenForm}
          />
        </div>
      </section>

      {/* Formulário com Lazy Loading e Suspense */}
      {isFormOpen && (
        <Suspense fallback={<div>A carregar formulário...</div>}>
          <Create_Trade_Form
            isOpen={isFormOpen}
            onClose={handleCloseForm}
            onSubmit={handleSubmitTrade}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Trading_Dashboard;