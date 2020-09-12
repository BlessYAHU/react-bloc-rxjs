import { useState, useEffect } from 'react';

const useObservable = (observable: any, action : any = ()=>{}) => {
  const [state, setState] = useState();

  useEffect(() => {
    const sub = observable.subscribe((x: any)=>{
      action(x);
      setState(x);
    });
    return () => sub.unsubscribe();
  }, [observable]);

  return state;
};

export default useObservable;