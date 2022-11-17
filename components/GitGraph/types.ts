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
