import { ICurrency } from '../../types/curency';
import { DEFAULT_CURRENCY } from '../../constants/currency';

export const formatPrice = (price: number, currency: ICurrency = DEFAULT_CURRENCY) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: 2,
  });

  return formatter.format(price).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
