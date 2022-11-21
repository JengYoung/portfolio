import { StaticBubbleInterface } from '@components/Metaball/types';

import { isDesktopSize, isTabletSize } from '@utils/viewports';

type GetStaticBubble = (width: number, height: number) => Omit<StaticBubbleInterface, 'ctx'>[];

const getDesktopStaticBubbles: GetStaticBubble = (width, height) => [
  {
    x: width * 0.1,
    y: height * 0.1,
    r: width * 0.2,
    to: {
      x: width * 0.1,
      y: height * 0.1,
    },
    v: [0, 0],
  },

  {
    x: width * 0.9,
    y: height * 0.8,
    r: width * 0.1,
    to: {
      x: width * 0.9,
      y: height * 0.8,
    },
    v: [0, 0],
  },

  {
    x: width * 0.15,
    y: height * 0.8,
    r: width * 0.1,
    to: {
      x: width * 0.15,
      y: height * 0.8,
    },
    v: [0, 0],
  },

  {
    x: width * 0.8,
    y: height * 0.4,
    r: width * 0.02,
    to: {
      x: width * 0.8,
      y: height * 0.4,
    },
    v: [0, 0],
  },

  {
    x: width * 0.6,
    y: height * 0.02,
    r: 30,
    to: {
      x: width * 0.6,
      y: height * 0.02,
    },
    v: [0, 0],
  },

  {
    x: width * 0.9,
    y: height * -0.3,
    r: width * 0.25,
    to: {
      x: width * 0.9,
      y: height * -0.3,
    },
    v: [1, 0.2],
  },
];

const getTabletStaticBubbles: GetStaticBubble = (width, height) => [
  {
    x: width * 0.1,
    y: height * 0.1,
    r: width * 0.2,
    to: {
      x: width * 0.1,
      y: height * 0.1,
    },
    v: [0, 0],
  },

  {
    x: width * 0.9,
    y: height * 0.9,
    r: width * 0.1,
    to: {
      x: width * 0.9,
      y: height * 0.9,
    },
    v: [0, 0],
  },

  {
    x: width * 0.05,
    y: height * 0.4,
    r: width * 0.05,
    to: {
      x: width * 0.05,
      y: height * 0.4,
    },
    v: [0, 0],
  },

  {
    x: width * 0.9,
    y: height * 0.5,
    r: width * 0.1,
    to: {
      x: width * 0.9,
      y: height * 0.5,
    },
    v: [0, 0],
  },

  {
    x: width * 0.7,
    y: height * 0.05,
    r: 30,
    to: {
      x: width * 0.4,
      y: height * 0.05,
    },
    v: [1, 0.2],
  },

  {
    x: width * 0.9,
    y: height * -0.2,
    r: width * 0.35,
    to: {
      x: width * 0.9,
      y: height * -0.2,
    },
    v: [0, 0],
  },
];

const getMobileStaticBubbles: GetStaticBubble = (width, height) => [
  {
    x: width * 0.1,
    y: height * 0.1,
    r: width * 0.2,
    to: {
      x: width * 0.1,
      y: height * 0.1,
    },
    v: [0, 0],
  },

  {
    x: width * 0.95,
    y: height * 0.85,
    r: width * 0.05,
    to: {
      x: width * 0.9,
      y: height * 0.85,
    },
    v: [0, 0],
  },

  {
    x: width * 0.05,
    y: height * 0.9,
    r: width * 0.11,
    to: {
      x: width * 0.05,
      y: height * 0.9,
    },
    v: [0, 0.2],
  },

  {
    x: width * 0.45,
    y: height * 0.05,
    r: width * 0.05,
    to: {
      x: width * 0.45,
      y: height * 0.05,
    },
    v: [0, 0],
  },

  {
    x: width * 0.9,
    y: height * 0.15,
    r: width * 0.1,
    to: {
      x: width * 0.9,
      y: height * 0.15,
    },
    v: [0, 0],
  },
];

const getStaticBubbles: GetStaticBubble = (width, height) => {
  if (isDesktopSize(width)) {
    return getDesktopStaticBubbles(width, height);
  }
  if (isTabletSize(width)) {
    return getTabletStaticBubbles(width, height);
  }

  return getMobileStaticBubbles(width, height);
};

export default getStaticBubbles;
