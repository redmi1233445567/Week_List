"use client"

import moment from 'moment';
import { useTaske } from '../store/abdoStore';
import Image from 'next/image';
import pluse from './image/plus.png'
import Link from 'next/link';
import { useState } from 'react';
import deleteTask from "./image/delete.png"
import { useDayStore } from '../store/data';

const FocusDay = ({id}) => {
  
  const [word, setWord] = useState("")
  const add = () => {
    if(word.trim()){
      addTask(id, word)
      setWord("")
    }
  }
  const handleKeyDown = (event) => {
    const key = event.key;
    if (key === 'Enter' && word.trim()) {
      addTask(id, word)
      setWord("")
    }
  };
  
  const {weeks, stateTask, removeTask, addTask, removeAll} = useDayStore()
  
  const date = new Date()
  const numWeek = moment(date).week();
  const data = weeks.filter((item) => item.numberWeek == numWeek)

  const day = 6 - date.getDay()
  const hour = 24 - date.getHours()

  let rating = data[0].daysWeek[id].tasks.filter((item) => item.state === true).length / data[0].daysWeek[id].tasks.length * 100 | 0;
  let text;
  if(rating < 50) {
    text = "قوم شوف اللي وراك 😡"
  } else if(rating < 65 && rating >= 50) {
    text = "هعدهالك 😐"
  } else if(rating < 75 && rating >= 65) {
    text = "كويس نوعا ما 😌"
  } else if(rating < 85 && rating >= 75){
    text = "جامد 😊"
  } else if (rating >= 85) {
    text = "انت مفيش منك اتنين 🥰"
  }

  return(
    <div className="w-11/12 flex justify-center items-center phone:flex-col mx-auto">
      <div className="w-2/6 flex flex-col items-center justify-center phone:w-full h-[85vh] phone:h-fit">
        <div className="w-3/5 phone:flex phone:w-full phone:my-4 tall:flex tall:w-11/12 tall:items-center">
          <div className="click-no w-full bg-bgCard my-4 p-2 flex flex-col rounded-lg phone:my-0 phone:p-1 phone:ml-2 tall:my-2">
            <p className="w-4/5 p-2 rounded-lg text-xl font-bold mt-2 mb-4 mx-auto text-center bg-bgNav text-white phone:text-base phone:p-1">الإسبوع</p>
            <p className="w-3/5 p-2 rounded-lg text-xl font-bold mb-2 mx-auto text-center bg-bgNav text-white phone:text-base phone:p-1">{numWeek}</p>
          </div>
          <div className="click-no w-full bg-bgCard p-2 rounded-lg phone:my-auto phone:h-fit phone:p-1 tall:h-fit tall:mr-2">
            <p className="w-4/5 p-2 rounded-lg text-xl font-bold my-2 mx-auto text-center bg-bgNav text-white phone:text-base phone:p-1">{data[0].daysWeek[id].dayName}</p>
          </div>
        </div>
        <div className="w-3/5 phone:flex phone:w-full phone:mb-4 tall:flex tall:w-11/12">
          <div className="click-no w-full bg-bgCard my-4 p-2 rounded-lg phone:my-0 phone:p-1 phone:ml-2 tall:my-2">
            <p className="w-4/5 p-2 rounded-lg text-xl font-bold my-2 mx-auto text-center bg-bgNav text-white phone:text-base phone:p-1">الوقت المتبقي</p>
            <div className="flex flex-col items-center justify-center">
              <p className="text-darkblue text-2xl phone:text-base">{day} أيام</p>
              <p className="text-darkblue text-2xl phone:text-base">{hour} ساعات</p>
            </div>
          </div>
          <div className="click-no w-full bg-bgCard my-4 p-2 flex flex-col rounded-lg phone:my-0 phone:p-1  tall:mr-2">
            <p className="w-4/5 p-2 rounded-lg text-xl font-bold my-2 mx-auto text-center bg-bgNav text-white phone:text-base phone:p-1">{ data[0].daysWeek[id].tasks.filter((item) => item.state === true).length / data[0].daysWeek[id].tasks.length * 100 | 0 }%</p>
            <p className="w-3/5 p-2 rounded-lg text-xl font-bold mb-2 mx-auto text-center bg-bgNav text-white phone:text-base phone:p-1 tall:w-full">{text}</p>
          </div>
        </div>
        <div className="click-no w-3/5 bg-bgCard p-2 rounded-lg flex flex-col items-center phone:my-0 phone:w-2/5 phone:p-1">
          <p className="my-4 text-darkblue text-3xl phone:text-xl phone:my-2">{data[0].daysWeek[id].tasks.filter((item) => item.done === true).length}</p>
          <div className="w-2/4 h-1 bg-bgNav"/>
          <p className="my-4 text-darkblue text-3xl phone:text-xl phone:my-2">{data[0].daysWeek[id].tasks.length}</p>
        </div>
      </div>

      <div className="click-details w-4/6 bg-bgCard flex flex-col items-center h-[85vh] rounded-lg phone:w-full phone:my-4 phone:h-[60vh] phone:text-base">
        <div className="my-4 w-4/5 flex justify-center items-center">
          <input 
            type="text" 
            placeholder="أضف مهمه جديده" 
            className="p-2 outline-none ml-4 w-full text-xl text-darkblue phone:p-1 phone:text-lg"
            onChange={(e) => setWord(e.target.value)}
            value={word}
            onKeyDown={handleKeyDown} 
          />
          <Image 
            src={pluse}
            alt='add'
            className='click w-8 h-8 cursor-pointer phone:w-6 phone:h-6'
            onClick={add}
          />
        </div>
        <ul className="py-3 px-4 bg-bgTaske rounded-b-3xl h-[70%] overflow-y-auto w-4/5">
          {data[0].daysWeek[id].tasks.map((item, index) => {return(
            <li key={index} className="relative group overflow-hidden text-lg bg-bgTaskes mt-2 mb-3 py-2 flex justify-between items-center">
              <p onClick={() => stateTask(id, index)} className={`${item.done && "text-red-900 line-through"} click-task w-full cursor-pointer mx-3 text-darkblue text-xl phone:text-base`}>{item.task}</p>
              <Image 
                src={deleteTask}
                alt='removeTask'
                className="click w-5 h-5 ml-4 cursor-pointer phone:w-3 phone:h-3"
                onClick={() => removeTask(id, item.id)}
              />
              <div className="absolute w-1 h-full bg-bgText duration-300 -translate-y-12 group-hover:translate-y-0"/>
            </li>
          )})}
        </ul>
        <button 
          onClick={() => removeAll(id)}
          className="click-rubbish w-3/5 p-2 bg-bgTaske hover:bg-bgTaskes hover:text-bgRemove my-4 font-bold text-xl phone:p-1 phone:text-lg phone:my-4"
        >
          حذف الكل
        </button>
        <Link href="/" className="click-undo w-2/5 p-2 mb-4 bg-bgTaske hover:bg-bgTaskes hover:text-bgRemove font-bold text-center phone:p-1 phone:text-lg phone:mb-4">رجوع</Link>
      </div>
    </div>
  )
}

export default FocusDay;