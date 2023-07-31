import axios from '../rest';
import { IDiamondCharacteristicRequestData, ISimilarDiamondsRequestData } from '../types/diamond-characteristics';

const diamond = {
  calculate: (params: IDiamondCharacteristicRequestData) => axios.get(`/diamond/calculate`, { params }).then(({ data }) => data),
  getSimilar: (params: ISimilarDiamondsRequestData) => axios.get(`/diamond/get-similar-products`, { params }).then(({ data }) => data),
};

export default diamond;
