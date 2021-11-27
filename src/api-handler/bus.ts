import { apiHelper } from '../utils/api-helper';
import {
  IBusRoute,
  IBusN1EstimateTime,
  IBusStopOfRoute,
} from '@/types/api/bus';
const basePath = 'Bus';
export default {
  getOneCityAllBusRouteInfo(city: string) {
    return apiHelper.get<IBusRoute[]>(`${basePath}/Route/City/${city}`);
  },
  getBusEstimatedTimeOfArrival(city: string, routeName: string) {
    return apiHelper.get<IBusN1EstimateTime[]>(`${basePath}/EstimatedTimeOfArrival/City/${city}/${routeName}`);
  },
  getBusStopOfRoute(city: string, routeName: string) {
    return apiHelper.get<IBusStopOfRoute[]>(`${basePath}/StopOfRoute/City/${city}/${routeName}`);
  },
  getRouteInfo(city: string, routeName: string) {
    return apiHelper.get<IBusRoute[]>(`${basePath}/Route/City/${city}/${routeName}`);
  }
}