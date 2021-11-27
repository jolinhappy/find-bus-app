export enum DirectionType {
  Outbound = 0,
  Return = 1,
  Loop = 2,
  Unknow = 3,
}

export enum DutyStatusType {
  Normal = 0,
  Start = 1,
  End = 2,
}

export enum BusStatusType {
  Normal = 0,
  Accident = 1,
  Fault = 2,
  TrafficJam = 3,
  Emergency = 4,
  GasUp = 5,
  LocationUnknown = 90,
  WayUnKnow = 91,
  RouteOffset = 98,
  NonOperation = 99,
  Full = 100,
  Rent = 101,
  Unknown = 255,
}

export enum MessageType {
  Unknown = 0,
  Regular = 1,
  Irregular = 2,
}

export enum A2EventType {
  Pulling = 0,
  Departure = 1,
}

export enum BusRouteType {
  CityBus = 11,
  HightwayBus = 12,
  NationalHighwayBus = 13,
  ShuttleBus = 14,
}

export enum StopBoarding {
  GetOff = -1,
  GetOffOn = 0,
  GetOn = 1
}

// [0:'正常',1:'尚未發車',2:'交管不停靠',3:'末班車已過',4:'今日未營運'] 
export enum StopStatusType {
  Normal = 0,
  NoDeparture = 1,
  NonStop = 2,
  LastBusPassed = 3,
  NonOperation = 4,

}