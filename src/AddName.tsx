import React, { useEffect } from "react";
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { FromEventTarget } from "rxjs/internal/observable/fromEvent";
import AddNameBloc  from './AddNameBloc';

export default function AddName() {

  const buttonEl = React.useRef<HTMLButtonElement>(null);
  const inputEl = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const clicky = fromEvent(buttonEl.current as FromEventTarget<HTMLButtonElement> , 'click').pipe(
      map((event: any)=> { 
        console.log('in map'); return [event.target.innerHTML]}))
        .subscribe((e: any)=>{
           AddNameBloc.Add(inputEl.current?.value || '');
        });
    return clicky.unsubscribe;
  }, []);
   return (
       <div>
            <input type="text" placeholder="Type Name" id="name-field" ref={inputEl}  />
            <button ref={buttonEl}  >+</button>
       </div>
   ) 
}
