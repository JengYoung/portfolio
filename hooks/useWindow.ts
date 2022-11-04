import { useEffect, useState } from 'react';

interface StateInterface {
  [idx: string]: any;
}

const useWindow = (props: string[]) => {
  const [windowState, setWindowState] = useState<StateInterface>({});

  useEffect(() => {
    const nowState = props.reduce(
      (acc: StateInterface, key) => ({
        ...acc,
        [key as string]: window[key as keyof typeof window],
      }),
      {}
    );

    setWindowState((state) => ({
      ...state,
      ...nowState,
    }));

    /**
     * @throw
     * 만약 이를 `props`를 설정해준다면, windowState에서 상태가 변경되었으니 리렌더링이 다시 발생하는데요.
     * 따라서 계속해서 다시 호출되고 무한 리렌더링이 발생하는 상황이 일어나서, 이를 제거합니다.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { windowState, setWindowState };
};

export default useWindow;
