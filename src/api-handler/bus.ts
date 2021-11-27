import { apiHelper } from '../utils/api-helper';
import {
  IBusRoute,
  IBusN1EstimateTime,
  IBusStopOfRoute,
  IOperator,
  IBusStop,
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
  getBusStopOfRoutesByBusStop(city: string, stopName: string) {
    return apiHelper.get<IBusStopOfRoute[]>(`${basePath}/StopOfRoute/City/${city}?$filter=Stops/any(c: c/StopName/Zh_tw eq '${stopName}')`);
  },
  getRouteInfo(city: string, routeName: string) {
    return apiHelper.get<IBusRoute[]>(`${basePath}/Route/City/${city}/${routeName}`);
  },
  getBusOperatorInfo(city: string, operatorName: string) {
    return apiHelper.get<IOperator[]>(`${basePath}/Operator/City/${city}?$filter=OperatorName/Zh_tw eq '${operatorName}'`);
  },
  getOneBusStopInfo(city: string, stopName: string) {
    return apiHelper.get<IBusStop[]>(`${basePath}/Stop/City/${city}?$filter=StopName/Zh_tw eq '${stopName}'`);
  }
}