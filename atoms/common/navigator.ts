import { ReactNode } from 'react';

import { atom } from 'recoil';

const NAVIGATOR_ATOM_KEY = 'common/navigator';

export enum DirectionsEnum {
  LEFT = 'left',
  UP = 'up',
  RIGHT = 'right',
  BOTTOM = 'bottom',
}

interface NavigatorAtomInterface {
  navigating: boolean;
  reversed: boolean;
  prevPage: ReactNode | null;
  prevKey: string;
}

const NavigatorAtom = atom<NavigatorAtomInterface>({
  key: NAVIGATOR_ATOM_KEY,
  default: {
    navigating: false,
    reversed: false,
    prevPage: null,
    prevKey: '',
  },
});

export default NavigatorAtom;
