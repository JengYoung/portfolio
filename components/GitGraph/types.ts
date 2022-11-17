import { ReactNode } from 'react';

export interface CommonBranchInterface {
  type: 'merged' | 'based';
}

export interface CommitInterface extends CommonBranchInterface {
  children: ReactNode;
}

export interface GitBranchInterface extends CommitInterface {
  period: string;
}

export interface GitGraphExperienceInterface {
  title: string;
  period: {
    start: string;
    end: string;
  };
  contents: string[];
}

export interface GitGraphInterface {
  shouldDraw: boolean;
  shouldShowHistory: boolean;
  nowExperience: GitGraphExperienceInterface;
}
