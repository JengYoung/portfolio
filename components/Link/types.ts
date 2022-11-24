export interface LinkInterface {
  href: string;
  iconSrc: string;
  alt: string;
}

export interface IconLinkStyleInterface {
  width: string;
  height: string;
}

export interface TextLinkInterface extends IconTextLinkStyleInterface {
  text: string;
}

export interface IconTextLinkStyleInterface {
  bgColor: string;
  iconSize: string;
}

export type IconLinkPropsInterface = IconLinkStyleInterface & LinkInterface;
export type IconTextPropsInterface = TextLinkInterface & LinkInterface;
