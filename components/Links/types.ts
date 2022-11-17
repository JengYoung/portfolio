interface ImagePropsInterface<T> {
  src: T;
  alt: T;
}

export interface LinkPropsInterface<T> {
  iconSrc: T;
  href: T;
  name: T;
}

export interface ImageSizeOption<T> {
  size: {
    width: T;
    height: T;
  };
  objectFit?: 'cover' | 'contain';
  bg?: string;
}

export interface LinksImageInterface<T> {
  image: ImagePropsInterface<T>;
  links: LinkPropsInterface<T>[];
  imageOptions: ImageSizeOption<T>;
}
