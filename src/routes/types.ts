export enum RoutesEnum {
  HOME = 'HOME',
  CAR_DETAILS = 'CAR_DETAILS',
  SCHEDULING = 'SCHEDULING',
  SCHEDULING_DETAILS = 'SCHEDULING_DETAILS',
  SCHEDULING_COMPLETE = 'SCHEDULING_COMPLETE',
}

export type AppRootParamList = {
  [key in keyof typeof RoutesEnum]: undefined;
};