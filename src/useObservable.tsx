import { useState, useEffect } from 'react';

const useObservable = (observable: any) => {
  const [state, setState] = useState();

  useEffect(() => {
    const sub = observable.subscribe(setState);
    return () => sub.unsubscribe();
  }, [observable]);

  return state;
};

export default useObservable;