
import {BehaviorSubject, empty} from 'rxjs';
import {map, filter, switchMap, startWith} from 'rxjs/operators';
import AddName from './AddName';


const behaviorSubj$ = new BehaviorSubject({}); 
const subj = behaviorSubj$;
// .pipe(switchMap(
//   (x: any)=> { 
//     console.log('hey -' + x +'-'); 
//     if(x.Command === "Add") {
//     }

//     return empty();
//   }));

const NameData = {
    // todo: rename to descriptive steam?
    AddedName$ : subj.pipe(filter((x: any) => x.Command === 'Add'), map((x: any)=> x.Value)),
    Add : (newName: string) => {
        behaviorSubj$.next({Command: 'Add', Value: newName});
    }
    
};

export default NameData;