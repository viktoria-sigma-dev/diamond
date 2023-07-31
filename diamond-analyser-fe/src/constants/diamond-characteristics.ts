import { AUTOCOMPLETE_TYPE, DiamondCharacteristic, IDiamondCharacteristicRequestData, NUMBER_TYPE } from '../types/diamond-characteristics';

export const CARAT_OPTIONS: string[] = [
  'Round',
  'Marquise',
  'Pear',
  'Oval',
  'Heart',
  'Emerald',
  'Princess',
  'Radiant',
  'Triangle',
  'Baguette',
  'Asscher',
  'Cushion',
];
export const COLOR_OPTIONS: string[] = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
export const CLARITY_GRADE: string[] = ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'SI3', 'I1', 'I2', 'I3'];
export const QUALITY_OPTIONS: string[] = ['Ideal', 'Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];
export const CERTIFICATE_OPTIONS: string[] = ['AGS', 'CEGL', 'CGI', 'CGL', 'DCLA', 'EGL Asia', 'EGL Intl.', 'EGL USA', 'GCAL', 'GIA', 'HRD', 'IGI'];

export const DIAMOND_CHARACTERISTICS: DiamondCharacteristic[] = [
  {
    id: 'cut',
    title: 'Shape of the diamond cut',
    type: AUTOCOMPLETE_TYPE,
    options: CARAT_OPTIONS,
    defaultValue: CARAT_OPTIONS[0],
    required: true,
  },
  {
    id: 'carat',
    title: 'Carat weight',
    type: NUMBER_TYPE,
    minValue: 0.08,
    maxValue: 9.99,
    defaultValue: 1.0,
    step: 0.01,
    required: true,
  },
  {
    id: 'color',
    title: 'Color grade',
    type: AUTOCOMPLETE_TYPE,
    options: COLOR_OPTIONS,
    defaultValue: COLOR_OPTIONS[0],
    required: true,
  },
  {
    id: 'clarity',
    title: 'Clarity grade',
    type: AUTOCOMPLETE_TYPE,
    options: CLARITY_GRADE,
    defaultValue: CLARITY_GRADE[0],
    required: true,
  },
  {
    id: 'make',
    title: 'Quality of the diamond, cut grade',
    type: AUTOCOMPLETE_TYPE,
    options: QUALITY_OPTIONS,
    required: false,
  },
  {
    id: 'certificate',
    title: 'Gemological laboratory that issued the grading report',
    type: AUTOCOMPLETE_TYPE,
    options: CERTIFICATE_OPTIONS,
    required: false,
  },
];

export const EMPTY_DIAMOND_DATA: IDiamondCharacteristicRequestData = {
  cut: '',
  carat: '',
  color: '',
  clarity: '',
};
