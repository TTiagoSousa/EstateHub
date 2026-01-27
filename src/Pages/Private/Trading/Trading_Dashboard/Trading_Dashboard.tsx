import { lazy, Suspense, useState } from 'react';
import Global_Button from '../../../../Components/Buttons/Global_Button/Global_Button';
import './Trading_Dashboard.scss';
const Create_Trade_Form = lazy(() => import('../../../../Containers/Forms/Create_Trade_Form/Create_Trade_Form'));
import * as Color from '../../../../Styles/Colors';

const Trading_Dashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className='Trading_Dashboard'>
      <section className='Options'>
        <div className='Button_Field'>
          <Global_Button 
            text="Add new trade" 
            backgroundColor={Color.primary_color_dark}
            textColor={Color.gray}
            onClick={handleOpenForm}
            hoverDuration={0.5}
            hoverTextColor={Color.whitte}
          />
        </div>
      </section>

      {/* Formulário com Lazy Loading e Suspense */}
      {isFormOpen && (
        <Suspense fallback={<div>A carregar formulário...</div>}>
          <Create_Trade_Form
            isOpen={isFormOpen}
            onClose={handleCloseForm}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Trading_Dashboard;