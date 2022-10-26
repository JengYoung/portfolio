import { getTypingAnimationTextArr } from '@utils/animations/typing';
import readonly from '@utils/readonly';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useInterval from './useInterval';

interface UseTypingTextParam {
  texts: readonly string[];
  delay: number;
}

/**
 *
 * @param
 * @returns { textsArr, textsArrIndex }
 * 이를 반환해주어야, 제대로 된 타이핑 효과를 줄 수 있습니다.
 * textsArr: 전체 초,중,성을 분리한 결과물을 각 배열에다 담아서 전달합니다.
 * textsArrIndex: 그래서 현재 어느 인덱스까지 순열했는지를 각 배열마다 알려줍니다. { isEnded: boolean; idx: number }
 */
const useTypingText = ({ texts, delay }: UseTypingTextParam) => {
  const textsArr: string[][] = readonly(
    texts.map((text) => [''].concat(getTypingAnimationTextArr(text)))
  );

  const [textsArrIndex, setTextsArrIndex] = useState(
    Array.from({ length: textsArr.length }, () => ({
      isEnded: false,
      idx: 0,
    }))
  );

  const nowFlagIndex = useMemo(() => {
    return textsArrIndex.filter(({ isEnded }) => isEnded).length;
  }, [textsArrIndex]);

  const timerCallback = useCallback(() => {
    setTextsArrIndex((state) =>
      state.map(({ isEnded, idx }, index) => ({
        isEnded,
        idx: idx + +(index === nowFlagIndex),
      }))
    );
  }, [nowFlagIndex]);

  const { timerId, savedCallback } = useInterval(timerCallback, delay);

  useEffect(() => {
    if (textsArrIndex.every(({ isEnded }) => isEnded)) {
      return;
    }

    const nowMaxLength = textsArr[nowFlagIndex].length - 1;

    if (textsArrIndex[nowFlagIndex].idx === nowMaxLength) {
      clearInterval(timerId.current as NodeJS.Timeout);
      timerId.current = null;

      setTextsArrIndex((state) =>
        state.map(({ isEnded, idx }) => ({
          isEnded: idx === nowMaxLength ? true : isEnded,
          idx,
        }))
      );
    }
  }, [nowFlagIndex, timerId, textsArr, textsArrIndex]);

  useEffect(() => {
    if (timerId.current) return;
    if (textsArrIndex.every(({ isEnded }) => isEnded)) {
      return;
    }

    savedCallback.current = timerCallback;
    setTimeout(() => {
      timerId.current = setInterval(savedCallback.current, 50);
    }, 500);

    return () => {
      clearInterval(timerId.current as NodeJS.Timeout);
    };

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [timerId, nowFlagIndex, savedCallback, timerCallback]);

  return {
    textsArr,
    textsArrIndex,
  };
};

export default useTypingText;