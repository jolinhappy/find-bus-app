import {
  DirectionType,
  DutyStatusType,
  BusStatusType,
  MessageType,
  A2EventType,
  BusRouteType,
  StopBoarding,
  StopStatusType
} from '@/types/enum';

// 路線資料
export interface IBusRoute {
  RouteUID: string;
  RouteID: string;
  HasSubRoutes: boolean;
  Operators: IRouteOperator[],
  AuthorityID: string;
  ProviderID: string;
  SubRoutes: IBusSubRoute[];
  BusRouteType: BusRouteType;
  RouteName: INameType;
  DepartureStopNameZh?: string;
  DepartureStopNameEn?: string;
  DestinationStopNameZh?: string;
  DestinationStopNameEn?: string;
  TicketPriceDescriptionZh?: string;
  TicketPriceDescriptionEn?: string;
  FareBufferZoneDescriptionZh?: string;
  FareBufferZoneDescriptionEn?: string;
  RouteMapImageUrl?: string;
  City?: string;
  CityCode?: string;
  UpdateTime: Date | string;
  VersionID: number;
}

// 單站站牌資料
export interface IBusStop {
  StopUID: string;
  StopID: string;
  AuthorityID: string;
  StopName: INameType;
  StopPosition: IPointType;
  StopAddress?: string;
  Bearing?: string;
  StationID?: string;
  StationGroupID: string;
  StopDescription?: string;
  City?: string;
  CityCode?: string;
  LocationCityCode?: string;
  UpdateTime: Date | string;
  VersionID: number;
}

// 站位資訊
export interface IBusStation {
  StationUID: string;
  StationID: string;
  StationName: INameType;
  StationPosition: IPointType;
  StationAddress: string;
  StationGroupID: string;
  Stops?: IStationStop[];
  LocationCityCode?: string;
  Bearing?: string;
  UpdateTime: Date | string;
  VersionID: number;
}

// 路線站序
export interface IBusStopOfRoute {
  RouteUID: string;
  RouteID: string;
  RouteName: INameType;
  Operators?: IRouteOperator;
  SubRouteUID: string;
  SubRouteID: string;
  SubRouteName: INameType;
  Direction?: DirectionType;
  city?: string;
  cityCode?: string;
  Stops: IStop[];
  UpdateTime: Date | string;
  VersionID: number;
}

export interface IRouteOperator {
  OperatorID: string;
  OperatorName: INameType;
  OperatorCode: string;
  OperatorNo: string;
}

// 路線圖
export interface IBusShape {
  RouteUID: string;
  RouteID: string;
  RouteName: INameType;
  SubRouteUID: string;
  SubRouteID ?: string;
  SubRouteName?: INameType;
  Direction: DirectionType;
  Geometry: string;
  EncodedPolyline: string;
  UpdateTime: Date | string;
  VersionID: number;
}

export interface IStop {
  StopUID: string;
  StopID: string;
  StopName: INameType;
  StopBoarding?: StopBoarding;
  StopSequence: number;
  StopPosition: IPointType;
  StationID?: string;
  StationGroupID: string;
  LocationCityCode?: string;
}

export interface IStationStop {
  StopUID: string;
  StopID: string;
  StopName: INameType;
  RouteUID: string;
  RouteID: string;
  RouteName: INameType;
  }

export interface IRouteOperator {
  OperatorID: string;
  OperatorName:INameType;
  OperatorCode: string;
  OperatorNo: string;
}

export interface IBusSubRoute {
  SubRouteUID: string;
  SubRouteID: string;
  OperatorIDs: string[];
  SubRouteName: INameType;
  Headsign?: string;
  HeadsignEn?: string;
  Direction: DirectionType;
  FirstBusTime: string;
  LastBusTime: string;
  HolidayFirstBusTime?: string;
  HolidayLastBusTime?: string;
}


export interface IBusA1Data {
  PlateNumb: string;
  OperatorID?: string;
  RouteUID?: string;
  RouteID?: string;
  RouteName?: INameType,
  SubRouteUID?: string;
  SubRouteID?: string;
  SubRouteName?: INameType
  Direction: DirectionType;
  BusPosition?: IPointType;
  Speed?: number;
  Azimuth?: number;
  DutyStatus?: DutyStatusType;
  BusStatus?: BusStatusType;
  MessageType?: MessageType;
  GPSTime: Date | string,
  TransTime?:  Date | string,
  SrcRecTime?:  Date | string,
  SrcTransTime?:  Date | string,
  SrcUpdateTime?:  Date | string,
  UpdateTime:  Date | string,
}


export interface INameType {
  Zh_tw: string;
  En: string;
}

export interface IPointType {
  PositionLon?: number;
  PositionLat?: number;
  GeoHash?: string;
}

export interface IBusA2Data {
  PlateNumb: string;
  OperatorID?: string;
  RouteUID?: string;
  RouteID?: string;
  RouteName?: INameType;
  SubRouteUID?: string;
  SubRouteID?: string;
  SubRouteName?: INameType;
  Direction: DirectionType;
  StopUID?: string;
  StopID?: string;
  StopName?: INameType;
  StopSequence?: number;
  MessageType?: MessageType;
  DutyStatus?: DutyStatusType;
  BusStatus?: BusStatusType
  A2EventType: A2EventType,
  GPSTime: Date | string;
  TransTime?: Date | string;
  SrcRecTime?: Date | string;
  SrcTransTime?: Date | string;
  SrcUpdateTime?: Date | string;
  UpdateTime: Date | string;
}

export interface IBusN1EstimateTime {
  PlateNumb?: string;
  StopUID?: string;
  StopID?: string;
  StopName?: INameType;
  RouteUID?: string;
  RouteID?: string;
  RouteName?: INameType;
  SubRouteUID?: string;
  SubRouteID?: string;
  SubRouteName?: INameType;
  Direction: DirectionType;
  // 到站時間預估(秒) [當StopStatus値為2~4或PlateNumb値為-1時，EstimateTime値為null; 當StopStatus値為1時， EstimateTime値多數為null，僅部分路線因有固定發車時間，故EstimateTime有値; 當StopStatus値為0時，EstimateTime有値。] ,
  EstimateTime?: number;
  StopCountDown?: number;
  CurrentStop?: string;
  DestinationStop?: string
  StopSequence?: number;
  StopStatus?: StopStatusType;
  MessageType?: MessageType;
  NextBusTime?: Date | string;
  IsLastBus?: boolean;
  Estimates?: IEstimate[];
  DataTime?: Date | string;
  TransTime?: Date | string;
  SrcRecTime?: Date | string;
  SrcTransTime?: Date | string;
  SrcUpdateTime?: Date | string;
  UpdateTime: Date | string;
}

export interface IEstimate {
  PlateNumb ?: string;
  EstimateTime?: number;
  IsLastBus?: boolean
  VehicleStopStatus?: A2EventType;
}

export interface IOperator {
  ProviderID?: string;
  OperatorID?: string;
  OperatorName: INameType;
  OperatorPhone?: string;
  OperatorEmail?: string;
  OperatorUrl?: string;
  ReservationUrl?: string;
  ReservationPhone?: string;
  OperatorCode?: string;
  AuthorityCode?: string;
  SubAuthorityCode?: string;
  OperatorNo?: string;
  UpdateTime: Date | string;
}