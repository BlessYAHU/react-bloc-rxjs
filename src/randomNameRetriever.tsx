import {ajax} from 'rxjs/ajax';
import {BehaviorSubject, empty} from 'rxjs';
import {map, switchMap, startWith} from 'rxjs/operators';


//const name$ = of(source);
const api =(count: any)=> `https://randomuser.me/api/?results=5&seed=rx${count}-react&nat=us&inc=name&noinfo`;
const getName = (user: any) => `${user.name.first} ${user.name.last}`;
let count = 0;
const create = ()=> {
const behaviorSubj$ = new BehaviorSubject('More'); 
const subj = behaviorSubj$.pipe(switchMap(
  (x: string)=> { 
    console.log('hey -' + x +'-'); 
    if(x === "More") {
      console.log('returning ajax');
      count+=1;
      return ajax
      .getJSON(api(count))
      .pipe(map((data: any) => {
        console.log("%o", data.results);
        return {
          data:   data.results.map(getName),
          isLoading: false
        };
      }),
      startWith({
        data:   [],
        isLoading: true
      })); 
    }
    return empty();
  }
)); 
  return {
    Subject$ : subj,
    GetNames : ()=> {
      console.log('in more');
      behaviorSubj$.next('More');
    }
  }
}

export default create();
 
