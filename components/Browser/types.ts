import { IconTextPropsInterface } from '@components/Link/types';

type AssetType = {
  type: string;
  src: string;
};
interface BaseContentsInterface {
  id: number;
  type: string;
  title: string;
  descriptions: string[];
  background: AssetType;
  links: IconTextPropsInterface[];
}

interface IntroContents extends BaseContentsInterface {
  skills: string[];
}

interface DetailContents extends BaseContentsInterface {
  images?: { src: string; alt: string; contents?: string }[];
}

export interface ProjectInterface {
  id: number;
  title: string;
  period: {
    start: string;
    end: string;
  };
  thumbnail: AssetType;
  contents: (IntroContents | DetailContents)[];
  techStacks: string[];
}

export interface BrowserProps {
  project: ProjectInterface | null;
  projectIndex: number;
}
