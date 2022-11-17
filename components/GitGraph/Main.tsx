import React from 'react';

import { Styled } from './styles';
import {
  CommitInterface,
  CommonBranchInterface,
  GitBranchInterface,
  GitGraphInterface,
} from './types';

function Branch({ type }: CommonBranchInterface) {
  return type === 'merged' ? <Styled.Branch.MergedBranch /> : <Styled.Branch.BasedBranch />;
}

function Commit({ type, children }: CommitInterface) {
  return type === 'merged' ? (
    <Styled.Branch.MergedCommit>{children}</Styled.Branch.MergedCommit>
  ) : (
    <Styled.Branch.BasedCommit>{children}</Styled.Branch.BasedCommit>
  );
}

function GitBranch({ type, period, children }: GitBranchInterface) {
  return (
    <Styled.Branch.MergedCommitContainer>
      <Branch type={type} />
      <Commit type={type}>
        <Styled.History.Dot main period={period} />
        <Styled.History.CommitMessage main>{children}</Styled.History.CommitMessage>
      </Commit>
    </Styled.Branch.MergedCommitContainer>
  );
}

function GitGraph({ shouldDraw, shouldShowHistory, nowExperience }: GitGraphInterface) {
  return (
    <Styled.Container>
      <Styled.Branch.Container draw={shouldDraw} shouldShowHistory={shouldShowHistory}>
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

Commit.defaultProps = {
  children: undefined,
};

GitBranch.defaultProps = {
  children: undefined,
};

export default GitGraph;
