"use client"

import Image from "next/image";
import round from "./image/loop.png"
import moment from 'moment';
import { useDayStore } from "../store/data";
import Link from "next/link";
import todo from "./image/todo.png"

const MapTaskesClient = () => {

  const {weeks, stateTask, stateFlip, obj} = useDayStore();

  const date = new Date()
  const numWeek = moment(date).week();
  // localStorage.clear()

  let data = weeks.filter((item) => item.numberWeek == numWeek)
  if (data.length === 0) {
    data = weeks.push(obj)
    data = weeks.filter((item) => item.numberWeek == numWeek)
  }


  return(
    <>
      {data[0].daysWeek.map((item, indexDay) => 
        <div key={indexDay} className={`${item.flip && "flip"} click-details card relative mt-12 h-[370px] phone:mt-8`}>
          <div className="face p-3 rounded-3xl h-full absolute w-full bg-bgCard">
            <div className="flex items-center justify-center">
              <Link href={`/theDay/query=${indexDay}&${item.dayName}`}>
                <Image src={todo} alt="todo" className="click w-12 h-12"/>
              </Link>
              <p className="w-4/5 p-3 rounded-lg text-xl font-bold mt-3 mb-4 mx-auto text-center bg-bgNav text-white">{item.dayName}</p>
              <Image src={round} alt="round" onClick={() => stateFlip(indexDay)} className="click w-12 h-12 cursor-pointer hover:animate-spin " />
            </div>
            <ul className="py-3 px-4 bg-bgTaske rounded-b-3xl h-64 overflow-y-auto">
                {item.tasks.map((item, index) => {return(
                  <li key={index} onClick={() => stateTask(indexDay, index)} className="click-task relative group overflow-hidden text-lg bg-bgTaskes mt-2 mb-3 py-2 cursor-pointer">
                    <p className={`${item.done && "text-red-900 line-through"} mx-3 text-darkblue`}>{item.task}</p>
                    <div className="absolute w-1 h-full bg-bgText duration-300 -translate-y-20 group-hover:-translate-y-9"/>
                  </li>
                )})}
            </ul>
          </div>
          <div className="face back p-3 absolute bg-bgCard rounded-3xl top-0 lef-0 w-full h-full">
            <div className="w-full h-5/6 flex flex-col rounded-3xl items-center text-4xl mt-16">
              <p className="my-4 text-darkblue">{item.tasks.filter((item) => item.done === true).length}</p>
              <div className="w-2/4 h-1 bg-bgNav"/>
              <p className="my-4 text-darkblue">{item.tasks.length}</p>
              <div className="w-full relative p-2 flex justify-center items-center">
                <p className="bg-bgNav p-2 w-full rounded-xl text-center text-white font-bold">{ item.tasks.filter((item) => item.done === true).length / item.tasks.length * 100 | 0 }%</p>
              </div>
            </div>
            <Image src={round} alt="round" onClick={() => stateFlip(indexDay)} className="click w-12 h-12 cursor-pointer hover:animate-spin absolute top-4 left-4"/>
          </div>
        </div>
      )}
    </>
  )
}

export default MapTaskesClient;