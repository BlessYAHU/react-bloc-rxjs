import React, {useEffect} from "react";
import "./styles.css";
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import useObservable from './useObservable';
import randomNameRetriever from './randomNameRetriever';
import { FromEventTarget } from "rxjs/internal/observable/fromEvent";

const List = ({ items = [], loading = false }) => (
  <ul className={loading ? 'loading' : undefined}>
    {items.map(item => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

export default function App() {
  const names: any = useObservable(randomNameRetriever.Subject$);
  const buttonEl = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const clicky = fromEvent(buttonEl.current as FromEventTarget<HTMLButtonElement> , 'click').pipe(
      map((event: any)=> { 
        console.log('in map'); return [event.target.innerHTML]}))
        .subscribe((e)=>randomNameRetriever.GetNames());

    return () => clicky.unsubscribe();
  }, []);
  return (
    <div className="App">
      <h1>Random Name List</h1>
      <List items={names?.data} loading={names?.isLoading} />
      <button ref={buttonEl}  >More</button>
    </div>
    
  );
}
