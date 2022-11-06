import React, { useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';

import readonly from '@utils/readonly';

interface GummyOptions {
  isGummy?: boolean;
  infinite?: boolean;
}
interface GummyPropsInterface {
  texts: string;
  delay: number;
  options?: GummyOptions;
}

interface TextStateInterface {
  id: number;
  classNames: string[];
  value: string;
}

const Classes = readonly({
  gummy: 'text--gummy',
  default: 'text--default',
});

const Styled = {
  Container: styled.div`
    display: inline-block;
  `,

  GummyCharacter: styled.span<{ infinite?: boolean }>`
    display: inline-block;

    &.${Classes.default} {
      animation: gummy-text-rotated 1s ease-in-out;
    }
    &.${Classes.gummy} {
      animation: gummy-text-hover 1s infinite ease-in-out;
    }

    @keyframes gummy-text-hover {
      0% {
        transform: scaleX(1) scaleY(1);
      }
      20% {
        transform: scaleX(1.2) scaleY(0.8);
      }
      40% {
        transform: scaleX(0.9) scaleY(1.1) translateY(-0.5rem);
      }
      60% {
        transform: scaleX(1.05) scaleY(0.95) translateY(0);
      }
      80% {
        transform: scaleX(0.97) scaleY(1.03);
      }
      100% {
        transform: scaleX(1) scaleY(1);
      }
    }

    @keyframes gummy-text-rotated {
      0% {
        transform: scaleX(1) scaleY(1) rotate(0deg);
      }
      20% {
        transform: scaleX(1.1) scaleY(0.95) rotate(-5deg);
      }
      40% {
        transform: scaleX(0.95) scaleY(1.05) rotate(4deg);
      }
      60% {
        transform: scaleX(0.95) scaleY(1.05) rotate(-3deg);
      }
      80% {
        transform: scaleX(0.95) scaleY(1.05) rotate(2deg);
      }
      100% {
        transform: scaleX(1) scaleY(1) rotate(0deg);
      }
    }
  `,
};
/**
 * @description:
 * 마치 젤리처럼 통통 튀는 글자 애니메이션을 적용해준다.
 */
function Gummy({ texts, delay, options }: GummyPropsInterface) {
  const num = texts.length;

  const [textsState, setTextsState] = useState<TextStateInterface[]>(
    Array.from({ length: num }, (_, idx) => ({
      id: idx,
      classNames: [],
      value: texts[idx],
    }))
  );

  const addClassName = useCallback(
    (id: number, className: string) => {
      if (!options?.isGummy && className === Classes.gummy) return;
      setTextsState((state) =>
        state.map((textState) =>
          textState.id === id
            ? { ...textState, classNames: [...new Set([...textState.classNames, className])] }
            : textState
        )
      );
    },
    [options?.isGummy]
  );

  const removeClassName = useCallback(
    (id: number, className: string) => {
      if (!options?.isGummy || options.infinite) return;
      setTextsState((state) =>
        state.map((textState) =>
          textState.id === id
            ? {
                ...textState,
                classNames: [...new Set([...textState.classNames.filter((v) => v !== className)])],
              }
            : textState
        )
      );
    },
    [options?.isGummy, options?.infinite]
  );

  const onMouseEnter = (id: number) => {
    if (options?.isGummy) addClassName(id, Classes.gummy);
  };

  const onBlur = (id: number) => {
    if (options?.isGummy) removeClassName(id, Classes.gummy);
  };

  useEffect(() => {
    textsState.forEach((_, idx) => {
      setTimeout(() => {
        addClassName(idx, Classes.default);
      }, delay + 50 * idx);
    });

    if (options?.infinite) {
      textsState.forEach((_, idx) => {
        setTimeout(() => {
          addClassName(idx, Classes.gummy);
        }, 1000 + delay + 50 * idx);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addClassName, removeClassName, options?.infinite]);

  return (
    <Styled.Container>
      {textsState.map((text) => (
        <Styled.GummyCharacter
          key={text.id}
          className={text.classNames.join(' ')}
          onMouseLeave={() => onBlur(text.id)}
          onMouseEnter={() => onMouseEnter(text.id)}
          infinite={options?.infinite}
        >
          {text.value}
        </Styled.GummyCharacter>
      ))}
    </Styled.Container>
  );
}

Gummy.defaultProps = {
  options: {
    isGummy: true,
    infinite: false,
  },
};

export default Gummy;
