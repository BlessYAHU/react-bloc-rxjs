import React, {useEffect, useState} from "react";
import { fromEvent } from 'rxjs';
import {map, reduce } from 'rxjs/operators';
import { FromEventTarget } from "rxjs/internal/observable/fromEvent";
import NameData  from './NameData';

export default function AddName() {

  const buttonEl = React.useRef<HTMLButtonElement>(null);
  const inputEl = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    // const inputChange = fromEvent(inputEl.current as FromEventTarget<HTMLInputElement> , 'change')
    // .pipe(map((event: any )=> [event.target.value])) //,reduce((current : string,x: any[]) => current + x[0]))
    // .subscribe((e)=>{
    //     console.log(e);
    // });

    const clicky = fromEvent(buttonEl.current as FromEventTarget<HTMLButtonElement> , 'click').pipe(
      map((event: any)=> { 
        console.log('in map'); return [event.target.innerHTML]}))
        .subscribe((e: any)=>{
           NameData.Add(inputEl.current?.value || '');
           console.log(inputEl.current?.value); 
        });
    return () => {
        // inputChange.unsubscribe();
        clicky.unsubscribe();
    }
  }, []);
   return (
       <div>
            <input type="text" placeholder="Type Name" id="name-field" ref={inputEl}  />
            <button ref={buttonEl}  >X</button>
       </div>
   ) 
}
