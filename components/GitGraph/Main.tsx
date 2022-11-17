import React from 'react';

import { Styled } from './styles';
import { GitGraphInterface } from './types';

function GitGraph({ shouldDraw, shouldShowHistory, nowExperience }: GitGraphInterface) {
  return (
    <Styled.Container>
      <Styled.Branch.Container draw={shouldDraw} shouldShowHistory={shouldShowHistory}>
        <Styled.Branch.MergedCommitContainer>
          <Styled.Branch.MergedBranch />
          <Styled.Branch.MergedCommit>
            <Styled.History.Dot main period={nowExperience.period.end} />
            <Styled.History.CommitMessage main>{nowExperience.title}</Styled.History.CommitMessage>
          </Styled.Branch.MergedCommit>
        </Styled.Branch.MergedCommitContainer>

        {nowExperience.contents.map((content) => (
          <Styled.History.Container key={content}>
            <Styled.History.Dot />
            <Styled.History.CommitMessage>{content}</Styled.History.CommitMessage>
            <Styled.History.Line />
          </Styled.History.Container>
        ))}

        <Styled.Branch.MergedCommitContainer>
          <Styled.Branch.BasedBranch />
          <Styled.Branch.BasedCommit>
            <Styled.History.Dot main period={nowExperience.period.start} />
            <Styled.History.CommitMessage main />
          </Styled.Branch.BasedCommit>
        </Styled.Branch.MergedCommitContainer>
      </Styled.Branch.Container>
    </Styled.Container>
  );
}

export default GitGraph;
