import React from 'react';

import { StyledGitGraph } from './styles';
import { GitGraphInterface } from './types';

function GitGraph({ shouldDraw, shouldShowHistory, nowExperience }: GitGraphInterface) {
  return (
    <StyledGitGraph.Container>
      <StyledGitGraph.Branch.Container draw={shouldDraw} shouldShowHistory={shouldShowHistory}>
        <StyledGitGraph.Branch.MergedCommitContainer>
          <StyledGitGraph.Branch.MergedBranch />
          <StyledGitGraph.Branch.MergedCommit>
            <StyledGitGraph.History.Dot main period={nowExperience.period.end} />
            <StyledGitGraph.History.CommitMessage main>
              {nowExperience.title}
            </StyledGitGraph.History.CommitMessage>
          </StyledGitGraph.Branch.MergedCommit>
        </StyledGitGraph.Branch.MergedCommitContainer>

        {nowExperience.contents.map((content) => (
          <StyledGitGraph.History.Container key={content}>
            <StyledGitGraph.History.Dot />
            <StyledGitGraph.History.CommitMessage>{content}</StyledGitGraph.History.CommitMessage>
            <StyledGitGraph.History.Line />
          </StyledGitGraph.History.Container>
        ))}

        <StyledGitGraph.Branch.MergedCommitContainer>
          <StyledGitGraph.Branch.BasedBranch />
          <StyledGitGraph.Branch.BasedCommit>
            <StyledGitGraph.History.Dot main period={nowExperience.period.start} />
            <StyledGitGraph.History.CommitMessage main />
          </StyledGitGraph.Branch.BasedCommit>
        </StyledGitGraph.Branch.MergedCommitContainer>
      </StyledGitGraph.Branch.Container>
    </StyledGitGraph.Container>
  );
}

export default GitGraph;
