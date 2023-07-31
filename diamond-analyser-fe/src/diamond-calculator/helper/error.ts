import {
  AUTOCOMPLETE_TYPE,
  DiamondCharacteristic,
  IAutocompleteDiamondCharacteristic,
  INumericDiamondCharacteristic,
  NUMBER_TYPE,
} from '../../types/diamond-characteristics';

const isAutocompleteValid = (item: IAutocompleteDiamondCharacteristic, value: string): boolean => {
  return item.options.includes(value) ?? false;
};

const isNumberValid = (item: INumericDiamondCharacteristic, value: number): boolean => {
  return value >= item.minValue && item.maxValue >= value;
};

export const getTextFieldErrorText = (item: DiamondCharacteristic, value: string): string => {
  if (!item.required) {
    return '';
  }

  if (item.type === AUTOCOMPLETE_TYPE) {
    return isAutocompleteValid(item as IAutocompleteDiamondCharacteristic, value as string) ? '' : 'Please select any value from this dropdown';
  }
  if (item.type === NUMBER_TYPE) {
    const numberItem: INumericDiamondCharacteristic = item as INumericDiamondCharacteristic;
    return isNumberValid(numberItem, Number(value)) ? '' : `Enter any value from ${numberItem.minValue} to ${numberItem.maxValue}`;
  }

  return 'This value is required';
};
