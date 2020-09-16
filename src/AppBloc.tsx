import randomNameRetriever from './randomNameRetriever';
import AddNameBloc from './AddNameBloc';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

const behaviorSubj$ = new BehaviorSubject({}); 
const subj = behaviorSubj$;

let viewList: never[] = [];
const appendList = (x: any)=> { 
    viewList = viewList.concat(x.data);
    behaviorSubj$.next(x);
};
const append = (x: any)=>{
    behaviorSubj$.next({data:viewList, isLoading: true});
    viewList = viewList.concat(x);
    behaviorSubj$.next({data:viewList, isLoading: false});
};

const AppBloc = ()=>{
  AddNameBloc.AddedName$.subscribe(append);
  randomNameRetriever.Subject$.subscribe((v)=> {
      appendList(v);
  });

  return {
      ListStream$: subj.pipe(map((x: any)=> x.data)),
      IsLoadingStream$: subj.pipe(map((x: any)=> x.isLoading)),
      GetMoreNames : ()=> randomNameRetriever.GetNames()
  };
}

export default AppBloc();