import React, { useState } from 'react';
import './Create_Trade_Form.scss';
import Simple_Input_And_Lable from '../../../Components/Inputs/Simple_Input_And_Lable/Simple_Input_And_Lable';
import Global_Button from '../../../Components/Buttons/Global_Button/Global_Button';
import * as Color from '../../../Styles/Colors';
import Simple_Selector_And_Label from '../../../Components/Selectors/Simple_Selector_And_Label/Simple_Selector_And_Label';
import { useCreateFuturesTrade } from '../../../Hooks/Trading/useCreateTrade';
import { useCurrencies } from '../../../Hooks/Currency/useGetCurrencies';
import { useGetSetups } from '../../../Hooks/Setups/useGetSetups'; 

interface AddTradeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TradeFormData) => void;
}

export interface TradeFormData {
  symbol: string;
  quantity: number;
  price: number;
}

const Create_Trade_Form: React.FC<AddTradeFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const { 
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
    createFuturesTrade
  } = useCreateFuturesTrade();

  const { currencies, loading } = useCurrencies();
  const { setups, loading: loadingSetups } = useGetSetups();

  const handleCreateClick = async () => {
    await createFuturesTrade();
    onClose();
  };

  if (!isOpen) return null;

  const currencyOptions = currencies.map(currency => ({
    value: currency.id,
    label: currency.short_code,
  }));

  const setupOptions = setups.map(setup => ({
    value: setup.id,
    label: setup.name,
  }));

  return (
    <>
      <div className="Form_Background" onClick={onClose} />
      
      <div className="Create_Trade_Form">
        <div className="Form_Header">
          <h2>Add trade</h2>
          <button className="Close_Button" onClick={onClose}>
            ✕
          </button>
        </div>

        <form>
          {/* Linha 1 */}
          <Simple_Input_And_Lable 
            label_text='Symbol'
            size='small'
            type='text'
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder='Ex: BTCUSDT'
            textAlign='left'
          />

          <div className="Direction_Buttons">
            <label>Direction</label>
            <div className="buttons_container">
              <button
                type="button"
                className={`direction_button long ${direction === 'long' ? 'active' : ''}`}
                onClick={() => setDirection('long')}
              >
                Long
              </button>
              <button
                type="button"
                className={`direction_button short ${direction === 'short' ? 'active' : ''}`}
                onClick={() => setDirection('short')}
              >
                Short
              </button>
            </div>
          </div>

          {/* Linha 2 */}
          <Simple_Selector_And_Label 
            label_text="Currency"
            options={currencyOptions}
            value={currencyId}
            onChange={(value) => setCurrencyId(String(value))}
            size={'small'}
            disabled={loading}
            placeholder='Select currency'
            textAlign='left'
          />

          <Simple_Selector_And_Label 
            label_text="Setup"
            options={setupOptions}
            value={setupId}
            onChange={(value) => setSetupId(String(value))}
            size={'small'}
            disabled={loadingSetups}
            placeholder='Select setup'
            textAlign='left'
          />

          {/* Linha 3 */}
          <Simple_Input_And_Lable 
            label_text='Entry price'
            size='small'
            type='number'
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            placeholder='0.00'
            step='0.01'
          />

          <Simple_Input_And_Lable 
            label_text='Exit price'
            size='small'
            type='number'
            value={exitPrice}
            onChange={(e) => setExitPrice(e.target.value)}
            placeholder='0.00'
            step='0.01'
          />

          {/* Linha 4 */}
          <Simple_Input_And_Lable 
            label_text='Size'
            size='small'
            type='number'
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder='0.00'
            step='0.01'
          />

          <Simple_Input_And_Lable 
            label_text='Commission'
            size='small'
            type='number'
            value={commission}
            onChange={(e) => setCommission(e.target.value)}
            placeholder='0.00'
            step='0.01'
          />

          {/* Linha 5 */}
          <Simple_Input_And_Lable 
            label_text='Entry date'
            size='small'
            type='datetime-local'
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
          />

          <Simple_Input_And_Lable 
            label_text='Exit date'
            size='small'
            type='datetime-local'
            value={exitDate}
            onChange={(e) => setExitDate(e.target.value)}
          />
          
          {/* Botão */}
          <div className="Button_Container">
            <Global_Button 
              backgroundColor={Color.blue}
              textColor={Color.whitte}
              text='Create Trade'
              onClick={handleCreateClick}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Create_Trade_Form;