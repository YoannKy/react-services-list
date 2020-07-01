export enum serviceStatus {
  unknown = 'UNKNOWN',
  ok = 'OK',
  fail = 'FAIL',
}

export interface Service {
  name: string;
  url: string;
  addTime?: string;
  status?: serviceStatus;
}
