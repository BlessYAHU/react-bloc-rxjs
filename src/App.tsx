import React, {useEffect} from "react";
import "./styles.css";
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import useObservable from './useObservable';
import randomNameRetriever from './randomNameRetriever';
import NameData from './NameData';
import AddName from './AddName';
import { FromEventTarget } from "rxjs/internal/observable/fromEvent";

const List = ({ items = [], loading = false }) => (
  <ul className={loading ? 'loading' : undefined}>
    {items.map(item => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

  let viewList: never[] = [];
export default function App() {
  const appendList = (x: any)=> viewList = viewList.concat(x.data);
  const names: any = useObservable(randomNameRetriever.Subject$, appendList);
  const append = (x: any)=>{
    console.log(x);
     viewList = viewList.concat(x);
  };
  const newName: any = useObservable(NameData.AddedName$, append);
  const buttonEl = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const clicky = fromEvent(buttonEl.current as FromEventTarget<HTMLButtonElement> , 'click').pipe(
      map((event: any)=> { 
        console.log('in map'); return [event.target.innerHTML]}))
        .subscribe((e)=>{
          randomNameRetriever.GetNames();
        });

    return () => clicky.unsubscribe();
  }, []);
  return (
    <div className="App">
      <h1>Random Name List</h1>
      <AddName ></AddName>
      <List items={viewList} loading={names?.isLoading} />
      <button ref={buttonEl}  >More</button>
    </div>
    
  );
}
