import React from 'react';

import { Styled } from './styles';
import { GitBranchInterface, GitGraphInterface } from './types';

function GitBranch({ type, period, children }: GitBranchInterface) {
  return (
    <Styled.Branch.MergedCommitContainer>
      <Styled.Branch.Inner type={type} />
      <Styled.Branch.Commit type={type}>
        <Styled.History.Dot main period={period} />
        <Styled.History.CommitMessage main>{children}</Styled.History.CommitMessage>
      </Styled.Branch.Commit>
    </Styled.Branch.MergedCommitContainer>
  );
}

function GitGraph({ shouldDraw, shouldShowHistory, nowExperience }: GitGraphInterface) {
  return (
    <Styled.Container>
      <Styled.Branch.Container shouldDraw={shouldDraw} shouldShowHistory={shouldShowHistory}>
        <GitBranch type="merged" period={nowExperience.period.end}>
          {nowExperience.title}
        </GitBranch>

        {nowExperience.contents.map((content) => (
          <Styled.History.Container key={content}>
            <Styled.History.Dot />
            <Styled.History.CommitMessage>{content}</Styled.History.CommitMessage>
            <Styled.History.Line />
          </Styled.History.Container>
        ))}

        <GitBranch type="based" period={nowExperience.period.start} />
      </Styled.Branch.Container>
    </Styled.Container>
  );
}

GitBranch.defaultProps = {
  children: undefined,
};

export default GitGraph;
