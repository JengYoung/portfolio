import { ReactNode } from 'react';

import { atom, selector } from 'recoil';

const NAVIGATOR_ATOM_KEY = 'common/navigator';

interface HistoryInterface {
  key: string;
  element: ReactNode;
}

interface NavigatorAtomInterface {
  navigating: boolean;
  histories: HistoryInterface[];
  index: number;
}
const NavigatorAtom = atom<NavigatorAtomInterface>({
  key: NAVIGATOR_ATOM_KEY,
  default: {
    navigating: false,
    histories: [],
    index: 0,
  },
});

export const getLastHistory = selector({
  key: 'common/lastHistory',
  get: ({ get }): HistoryInterface | null => {
    const { histories } = get(NavigatorAtom);
    const historiesLength = histories.length;
    if (!historiesLength) return null;

    return histories[historiesLength - 1];
  },
});

export default NavigatorAtom;
