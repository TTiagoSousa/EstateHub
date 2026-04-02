import Simple_Input_And_Label from '../../../Components/Inputs/Simple_Input_And_Lable/Simple_Input_And_Lable';
import Simple_Selector_And_Label from '../../../Components/Selectors/Simple_Selector_And_Label/Simple_Selector_And_Label';
import './Compound_Interest_Calculator.scss';

const Compound_Interest_Calculator = () => {
  
  const contributionFrequencyOptions = [
    { value: 'mensal', label: 'Mensal' },
    { value: 'trimestral', label: 'Trimestral' },
    { value: 'semestral', label: 'Semestral' },
    { value: 'anual', label: 'Anual' },
  ];

  return (
    <div className='Compound_Interest_Calculator'>
      <section className='Compound_Interest_Calculator_Form'>
        <form action="">

          <div className='Form_Grid'>
            <div className="Input_Field">
              <Simple_Input_And_Label 
                placeholder='Capital inicial (€)'
                infoText='Montante que investes no início. Ex: 10 000 €'
                showInfo={true}
                type='number'
              />
            </div>
            <div className="Input_Field">
              <Simple_Input_And_Label 
                placeholder='Taxa de juro anual (%)'
                infoText='Rendimento anual esperado em percentagem. Ex: 7% para um ETF global'
                showInfo={true}
              />
            </div>
            <div className="Input_Field">
              <Simple_Input_And_Label 
                placeholder='Período (anos)'
                infoText='Durante quantos anos pretendes manter o investimento. Ex: 20'
                showInfo={true}
              />
            </div>
            <div className="Input_Field">
              <Simple_Selector_And_Label
                options={contributionFrequencyOptions}
                placeholder='Contribuição periódica (€)'
                infoText='Montante que investes no início. Ex: 10 000 €'
                showInfo={true}
              />
            </div>
            <div className="Input_Field">
              <Simple_Input_And_Label 
                placeholder='Frequência das contribuições'
                infoText='Com que regularidade fazes os depósitos adicionais. Ex: Mensal, Trimestral, Anual'
                showInfo={true}
              />
            </div>
            <div className="Input_Field">
              <Simple_Input_And_Label 
                placeholder='Frequência de capitalização'
                infoText='Quantas vezes por ano os juros são reinvestidos. Ex: Mensal = juros compostos 12x/ano'
                showInfo={true}
              />
            </div>
            <div className="Input_Field">
              <Simple_Input_And_Label 
                placeholder='Comissão de negociação (%)'
                infoText='Custo cobrado pela corretora por cada transação. Ex: 0,10% por ordem'
                showInfo={true}
              />
            </div>
            <div className="Input_Field">
              <Simple_Input_And_Label 
                placeholder='Taxa de despesas do fundo (%)'
                infoText='Custo anual de gestão do fundo ou ETF (TER). Ex: 0,20% para um ETF de baixo custo'
                showInfo={true}
              />
            </div>
            <div className="Input_Field">
              <Simple_Input_And_Label 
                placeholder='Taxa de inflação (%)'
                infoText='Inflação média anual estimada para ajustar o valor real do retorno. Ex: 2,5%'
                showInfo={true}
              />
            </div>
          </div>

        </form>
      </section>
    </div>
  );
};

export default Compound_Interest_Calculator;