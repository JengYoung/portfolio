import { ReactNode } from 'react';

const enum NavigatorDirections {
  LEFT = 'LEFT',
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  RIGHT = 'RIGHT',
}
export interface StyledNavigatorProps {
  navigate: boolean;
  direction: NavigatorDirections;
  delay: number;
  height: string;
}

export interface NavigatorProps {
  children: ReactNode;
  delay?: number;
  height?: string;
  directions: {
    [index: string]: NavigatorDirections;
  };
}

export interface RoutePageProps {
  height: string;
}

export default NavigatorDirections;
