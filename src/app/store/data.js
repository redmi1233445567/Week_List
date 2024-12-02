import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";
import moment from "moment";

const date = new Date()
const numWeek = moment(date).week()

export const useDayStore = create(
  persist(
    (set) => ({
      day: [
        { dayName: "الاحد",flip: false, tasks: [] },
        { dayName: "الاثنين",flip: false, tasks: [] },
        { dayName: "الثلاثاء",flip: false, tasks: [] },
        { dayName: "الاربعاء",flip: false, tasks: [] },
        { dayName: "الخميس",flip: false, tasks: [] },
        { dayName: "الجمعة",flip: false, tasks: [] },
        { dayName: "السبت",flip: false, tasks: [] },
        { dayName: "تحديات الاسبوع",flip: false, tasks: [] },
      ],
      addDay: (item) =>
        set((state) => {
          let all = state.day;
          let count = 0;

          for (let i = 0; i < all.length; i++) {
            if (all[i].dayName === item.dayName) {
              count = 1;
            }
          }

          if (count == 1) {
            for (let i = 0; i < all.length; i++) {
              if (all[i].dayName == item.dayName) {
                all[i].tasks = [...all[i].tasks, item.tasks[0]];
              }
            }
          } else {
            all = [...all, item];
          }

          return { day: all };
        }),

      deleteOne: (item, index) =>
        set((state) => {
          let all = state.day;

          for (let i = 0; i < all.length; i++) {
            if (all[i].dayName === item) {
              console.log(all[i].tasks[index]);
              let test = all[i].tasks[index].task;
              all[i].tasks = all[i].tasks.filter((one) => one.task != test);
              console.log(all[i]);
            }
          }

          return { day: all };
        }),

      deleteAllDay: () =>
        set(() => ({
          day: [
            { dayName: "الاحد",flip: false, tasks: [] },
            { dayName: "الاثنين",flip: false, tasks: [] },
            { dayName: "الثلاثاء",flip: false, tasks: [] },
            { dayName: "الاربعاء",flip: false, tasks: [] },
            { dayName: "الخميس",flip: false, tasks: [] },
            { dayName: "الجمعة",flip: false, tasks: [] },
            { dayName: "السبت",flip: false, tasks: [] },
            { dayName: "تحديات الاسبوع",flip: false, tasks: [] },
          ],
        })),

      weeks: [],
      addWeek: (item) =>
        set((state) => {
          let all = state.weeks;
          let count = 0;

          for (let i = 0; i < all.length; i++) {
            if (all[i].numberWeek === item.numberWeek) {
              count = 1;
            }
          }

          if (count == 1) {
            for (let i = 0; i < all.length; i++) {
              if (all[i].numberWeek == item.numberWeek) {
                all[i] = item;
              }
            }
          } else {
            all = [...all, item];
          }

          return { weeks: all };
        }),
      thisWeek: () =>
        set((state) => {
          const arr = state.weeks.filter(
            (item) => item.numberWeek === state.numWeek()
          );
          return console.log(arr);
        }),
      obj: {
        numberWeek: numWeek,
        evaluation: 0,
        daysWeek: [
          { dayName: "الاحد",flip: false, tasks: [] },
          { dayName: "الاثنين",flip: false, tasks: [] },
          { dayName: "الثلاثاء",flip: false, tasks: [] },
          { dayName: "الاربعاء",flip: false, tasks: [] },
          { dayName: "الخميس",flip: false, tasks: [] },
          { dayName: "الجمعة",flip: false, tasks: [] },
          { dayName: "السبت",flip: false, tasks: [] },
          { dayName: "تحديات الاسبوع",flip: false, tasks: [] },
        ],
      },
      stateTask: (dayId, taskId) =>
        set(
          produce((draft) => {
            const data = draft.weeks.filter((item) => item.numberWeek == numWeek)
            data[0].daysWeek[dayId].tasks[taskId].done = !data[0].daysWeek[dayId].tasks[taskId].done
          })
        ),
      stateFlip: (dayId) =>
        set(
          produce((draft) => {
            const data = draft.weeks.filter((item) => item.numberWeek == numWeek)
            data[0].daysWeek[dayId].flip = !data[0].daysWeek[dayId].flip
          })
        ),
      removeTask: (dayId, taskId) =>
        set((state) =>
          produce(state, (draft) => {
            const data = draft.weeks.filter((item) => item.numberWeek == numWeek)
            data[0].daysWeek[dayId].tasks = data[0].daysWeek[dayId].tasks.filter(
              (task) => task.id !== taskId
              );
          })
      ),
      addTask: (dayId, word) => set(
        produce((draft) => {
          const data = draft.weeks.filter((item) => item.numberWeek == numWeek)
          data[0].daysWeek[dayId].tasks = [...data[0].daysWeek[dayId].tasks, {id: Date.now(), task: word, state: false}]
        })
      ),
      removeAll: (dayId) => set(
        produce((draft) => {
          const data = draft.weeks.filter((item) => item.numberWeek == numWeek)
          data[0].daysWeek[dayId].tasks = []
        })
      ),

        setEvaluation: (item) =>
          set((state) => {
            let all = state.weeks;
  
            for (let i = 0; i < all.length; i++) {
              if (all[i].numberWeek === item) {
                const done = all[i].daysWeek[0].tasks.filter((one) => one.done).length + all[i].daysWeek[1].tasks.filter((one) => one.done).length + all[i].daysWeek[2].tasks.filter((one) => one.done).length + all[i].daysWeek[3].tasks.filter((one) => one.done).length + all[i].daysWeek[4].tasks.filter((one) => one.done).length + all[i].daysWeek[5].tasks.filter((one) => one.done).length + all[i].daysWeek[6].tasks.filter((one) => one.done).length + all[i].daysWeek[7].tasks.filter((one) => one.done).length;
                const alltask = all[i].daysWeek[0].tasks.length + all[i].daysWeek[1].tasks.length + all[i].daysWeek[2].tasks.length + all[i].daysWeek[3].tasks.length + all[i].daysWeek[4].tasks.length + all[i].daysWeek[5].tasks.length + all[i].daysWeek[6].tasks.length + all[i].daysWeek[7].tasks.length 
                all[i].evaluation = done / alltask * 100
              }
            }

            return { weeks: all };
          }),
    }),
    {
      name: "week",
    }
  )
);
