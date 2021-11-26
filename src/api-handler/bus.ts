import { apiHelper } from '../utils/api-helper';
import {
  IBusRoute
} from '@/types/api/bus';
const basePath = 'Bus';
export default {
  getOneCityAllBusRouteInfo(city: string) {
    return apiHelper.get<IBusRoute[]>(`${basePath}/Route/City/${city}`);
  },
}