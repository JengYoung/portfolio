import { atom } from 'recoil';

export enum ButtonActionTypeEnum {
  red = 'ANGRY',
  orange = 'SHAKING',
  green = 'FULL_SCREEN',
}

export type TerminalModeType = ButtonActionTypeEnum | null;

export interface TerminalAtomStateInterface {
  mode: TerminalModeType;
  loading: boolean;
}

const IntroTarminalAtom = atom<TerminalAtomStateInterface>({
  key: 'intro/terminal',
  default: {
    mode: null,
    loading: false,
  },
});

export default IntroTarminalAtom;
