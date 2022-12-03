import { atom } from 'recoil';

import { COLOR_SCHEME_DARK, COLOR_SCHEME_LIGHT } from '@utils/constants';

const COLOR_SCHEME_ATOM_KEY = 'common/color-scheme';

interface ColorSchemeAtomInterface {
  theme: null | typeof COLOR_SCHEME_DARK | typeof COLOR_SCHEME_LIGHT;
}

const ColorSchemeAtom = atom<ColorSchemeAtomInterface>({
  key: COLOR_SCHEME_ATOM_KEY,
  default: {
    theme: null,
  },
});

export default ColorSchemeAtom;
