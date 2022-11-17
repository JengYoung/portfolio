export type LogType<T> = { id: number; type: keyof T; text: string };

export interface TerminalPropsInterface {
  delays: number[];
  data: LogType<typeof logColorsEnum>[];
  isActive: boolean;
  date: string;
}

export interface TerminalBodyCommonProp {
  isActive: boolean;
}

export interface TerminalBodyInterface<T> extends TerminalBodyCommonProp {
  delays: number[];
  data: LogType<T>[];
  date: string;
}

export interface TerminalBodyLogsInterface<T> extends TerminalBodyCommonProp {
  delays: number[];
  logs: TerminalBodyInterface<T>['data'];
  initDelay: number;
}

export enum logColorsEnum {
  event = '#ff00f5',
  wait = '#0DC0CB',
  ready = '#61C454',
  info = '#0DC0CB',
}
