export interface LinkInterface {
  href: string;
  iconSrc: string;
  alt: string;
}

export interface IconLinkStyleInterface {
  width: string;
  height: string;
}

export interface IconLinkPropsInterface extends IconLinkStyleInterface {
  href: string;
  iconSrc: string;
  alt: string;
}

export interface IconTextPropsInterface extends IconTextLinkStyleInterface {
  href: string;
  iconSrc: string;
  alt: string;
  text: string;
}

export interface IconTextLinkStyleInterface {
  bgColor: string;
  iconSize: string;
}
