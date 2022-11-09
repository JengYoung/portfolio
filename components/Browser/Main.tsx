import React, { useEffect, useState } from 'react';

import { ProjectInterface } from '@pages/experiences-and-projects';

import Gummy from '@components/Text/Gummy';

import { Styled } from './styles';

interface BrowserProps {
  project: ProjectInterface | null;
  projectIndex: number;
}

function Browser({ project, projectIndex }: BrowserProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(-1);

  const onClick = (idx: number) => {
    setActiveTabIndex(() => idx);
  };

  useEffect(() => {
    if (projectIndex >= 0) setActiveTabIndex(() => 0);
  }, [projectIndex]);

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Circles isActive={activeTabIndex === 0}>
          <Styled.Circle />
          <Styled.Circle />
          <Styled.Circle />
        </Styled.Circles>
        <Styled.TabsContainer>
          <Styled.TabsInner>
            {project?.contents?.map((content, idx) => (
              <Styled.Tab
                key={content.id}
                onClick={() => onClick(idx)}
                isLeftActive={idx === activeTabIndex + 1 && idx !== 0}
                isRightActive={idx === activeTabIndex - 1}
                isActive={idx === activeTabIndex}
              >
                <Styled.TabTitle isActive={idx === activeTabIndex || idx === activeTabIndex - 1}>
                  {content.title}
                </Styled.TabTitle>
              </Styled.Tab>
            ))}
            <Styled.Separator />
          </Styled.TabsInner>
        </Styled.TabsContainer>
      </Styled.Header>

      <Styled.Toolbar>
        <Styled.BarDescription>{project?.title}</Styled.BarDescription>
      </Styled.Toolbar>

      <Styled.Body intro={activeTabIndex === -1}>
        {project?.contents[activeTabIndex]?.descriptions.length && activeTabIndex !== -1 && (
          <Styled.BodyDescriptions>
            {project.contents[activeTabIndex]?.descriptions.map((description) => (
              <Styled.BodyDescription key={`description:${description}`}>
                {description}
              </Styled.BodyDescription>
            ))}
          </Styled.BodyDescriptions>
        )}

        {/* 
          NOTE: Initialized Screen View
          */}
        {projectIndex < 0 && (
          <>
            <Styled.InitText>왼쪽의 프로젝트를</Styled.InitText>
            <Styled.InitText>
              <strong>
                <Gummy texts="클릭" delay={0} options={{ infinite: true, isGummy: true }} />
              </strong>
              해주세요!
            </Styled.InitText>
          </>
        )}
      </Styled.Body>
    </Styled.Container>
  );
}

export default Browser;
