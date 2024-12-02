import { create } from "zustand";
// import {persist} from 'zustand/middleware'
// import {immer} from "zustand/middleware/immer"
import { produce } from "immer";

export const useTaske = create(
  // persist(
    (set) => ({
      data: [ 
              {id: 0,flip: false,day: "الأحد", tasks: [{id: 0,task: "two", state: false}]},
              {id: 1,flip: false,day: "الإثنين", tasks: [{id: 0,task: "three", state: false}]},
              {id: 2,flip: false,day: "الثلاثاء", tasks: [{id: 0,task: "four", state: false}]},
              {id: 3,flip: false,day: "الأربعاء", tasks:[{id: 0,task: "five", state: false}]},
              {id: 4,flip: false,day: "الخميس", tasks:[{id: 0,task: "six", state: false}]},
              {id: 5,flip: false,day: "الجمعة", tasks: [{id: 0,task: "seven", state: false}]},
              {id: 6,flip: false,day: "السبت", tasks: [{id: 0,task: "one", state: false}, {id: 1,task: "two in sat", state: false}, {id: 2,task: "three in degre", state: false}, {id: 3,task: "one", state: false}, {id: 4,task: "two in sat", state: false}, {id: 5,task: "three in degre", state: false}, {id: 6,task: "one", state: false}, {id: 7,task: "two in sat", state: false}, {id: 8,task: "three in degre", state: false}, {id: 9,task: "one", state: false}, {id: 10,task: "two in sat", state: false}, {id: 11,task: "three in degre", state: false}]},
              {id: 7,flip: false,day: "تحديات الأسبوع", tasks: [{id: 0,task: "chang", state: false}]}
            ],
      stateTask: (dayId, taskId) => set(
        produce((draft) => {
          draft.data[dayId].tasks[taskId].state = !draft.data[dayId].tasks[taskId].state
        })
      ),
      stateFlip: (dayId) => set(
        produce((draft) => {
          draft.data[dayId].flip = !draft.data[dayId].flip
        })
      ),
      
      
      
    }), {
      name: "todolist-week"
    }
  // )
)