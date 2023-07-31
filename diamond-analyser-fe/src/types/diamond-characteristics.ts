export const AUTOCOMPLETE_TYPE = 'autocomplete';
export const NUMBER_TYPE = 'number';
export type FieldType = typeof AUTOCOMPLETE_TYPE | typeof NUMBER_TYPE;

export interface ICommonDiamondCharacteristic {
  id: string;
  title: string;
  type: FieldType;
  required: boolean;
  defaultValue?: string | number;
}
export interface IAutocompleteDiamondCharacteristic extends ICommonDiamondCharacteristic {
  options: string[];
}
export interface INumericDiamondCharacteristic extends ICommonDiamondCharacteristic {
  minValue: number;
  maxValue: number;
  step: number;
}

export type DiamondCharacteristic = IAutocompleteDiamondCharacteristic | INumericDiamondCharacteristic;

export interface IDiamondCharacteristicRequestData {
  cut: string;
  carat: string;
  color: string;
  clarity: string;
  [key: string]: string;
}

export interface ISimilarDiamondsRequestData {
  cut: string;
  budget: number;
}
