import React, {useEffect} from "react";
import "./styles.css";
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { FromEventTarget } from "rxjs/internal/observable/fromEvent";
import useObservable from './useObservable';

import List from './List';
import AddName from './AddName';
import AppBloc from './AppBloc';

export default function App() {
  const viewList = useObservable(AppBloc.ListStream$);
  const isLoading = useObservable(AppBloc.IsLoadingStream$);
  const buttonEl = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const clicky = fromEvent(buttonEl.current as FromEventTarget<HTMLButtonElement> , 'click').pipe(
      map((event: any)=> { 
        console.log('in map'); return [event.target.innerHTML]}))
        .subscribe((e)=>{
          AppBloc.GetMoreNames();
        });

    return clicky.unsubscribe;
  }, []);
  return (
    <div className="App">
      <h1>Random Name List</h1>
      <AddName ></AddName>
      <List items={viewList} loading={isLoading} />
      <button ref={buttonEl}  >More</button>
    </div>
    
  );
}
