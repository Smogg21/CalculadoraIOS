import {useRef, useState} from 'react';

enum Operator {
  add,
  subtract,
  multiply,
  divide,
}

export const useCalculator = () => {
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  const lastOperation = useRef<Operator>();

  const clean = () => {
    setNumber('0');
    setPrevNumber('0');
  };

  const deleteOperation = (numberString: string) => {
    if (numberString.length === 1) {
      setNumber('0');
      return;
    }
    if (numberString.includes('-') && numberString.length === 2) {
      setNumber('0');
      return;
    }
    setNumber(numberString.slice(0, -1));
  };
  const toggleSign = () => {
    if (number.includes('-')) {
      return setNumber(number.replace('-', ''));
    }
    setNumber('-' + number);
  };

  const buildNumber = (numberString: string) => {
    if (number.includes('.') && numberString === '.') {
      return;
    }
    if (number.startsWith('0') || number.startsWith('-0')) {
      // Punto deciamal
      if (numberString === '.') {
        return setNumber(number + numberString);
      }
      //Evaluar si es otro cero, y hay un punto
      if (numberString === '0' && number.includes('.')) {
        return setNumber(number + numberString);
      }
      //Evaluar si es diferente de cero, y no tiene un punto, que el número remplace el 0
      if (numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString);
      }
      //Evitar el 00000000}
      if (numberString === '0' && !number.includes('.')) {
        return;
      }
      return setNumber(number + numberString);
    }

    setNumber(number + numberString);
  };

  const setLastNumber = () => {
    if (number.endsWith('.')) {
      setPrevNumber(number.slice(0, -1));
    } else {
      setPrevNumber(number);
    }
    setNumber('0');
  };

  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  };

  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  };

  const subtractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.subtract;
  };

  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  };

  return {
    //Properties
    number,
    prevNumber,
    //Methods
    buildNumber,
    toggleSign,
    clean,
    deleteOperation,
    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,
  };
};
