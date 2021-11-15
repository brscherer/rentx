import { CarDTO } from '../dtos/CarDTO'

export enum RoutesEnum {
  SPLASH = 'SPLASH',
  HOME = 'HOME',
  CAR_DETAILS = 'CAR_DETAILS',
  SCHEDULING = 'SCHEDULING',
  SCHEDULING_DETAILS = 'SCHEDULING_DETAILS',
  SCHEDULING_COMPLETE = 'SCHEDULING_COMPLETE',
  MY_CARS = 'MY_CARS',
}

export type RouteParams = { car: CarDTO, dates?: string[] }

export type AppRootParamList = {
  [key in keyof typeof RoutesEnum]: undefined | RouteParams;
};