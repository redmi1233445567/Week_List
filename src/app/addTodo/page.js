"use client";
import Link from "next/link";
import Card from "../components/Card";
import { useDayStore } from "../store/data";
import { useRef } from "react";
import moment from "moment";
import JSConfetti from "js-confetti";

export default function Page() {
  const day = [
    "الاحد",
    "الاثنين",
    "الثلاثاء",
    "الاربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
    "تحديات الاسبوع",
  ];
  const days = useDayStore((state) => state.day);
  const addWeek = useDayStore((state) => state.addWeek);
  const deleteAll = useDayStore((state) => state.deleteAllDay);
  const setEvaluation = useDayStore((state) => state.setEvaluation);
  const ref0 = useRef();
  const ref00 = useRef();
  const area = useRef();
  const date = new Date();
  const numWeek = moment(date).week();

  const saveWeek = () => {
    if (
      ref0.current.value === "" ||
      // ref0.current.value <= numWeek ||
      ref0.current.value % 1 != 0
    ) {
      scroll({
        top: 0,
        behavior: "smooth",
      });
      ref0.current.classList.add("no");
    } else {
      if (ref0.current.classList.contains("no")) {
        ref0.current.classList.remove("no");
      }

      const weekarray = {
        numberWeek: ref0.current.value,
        weekDone: false,
        evaluation: 0,
        daysWeek: days,
        motivation: area.current.value,
      };
      addWeek(weekarray);
      setEvaluation(ref0.current.value);
      ref00.current.style.backgroundColor = "green";
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti({
        emojis: [ref0.current.value],
      });
    }
  };

  return (
    <div className=" h-full w-full m-0 py-10">
      <div className="w-full flex justify-center ">
        <input
          ref={ref0}
          type="number"
          placeholder={`اقل رقم للاسبوع هو ${numWeek + 1}`}
          className="p-3 appearance-none bg-inherit outline-white  text-white font-bold rounded-md"
        />
      </div>
      <textarea
        ref={area}
        placeholder="اكتب تحفيز لنفسك او تذكير"
        className="w-4/5 mx-auto my-5 block appearance-none bg-inherit outline-white focus:border-none text-white p-3"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-11/12 mx-auto md:grid-cols-3 xl:grid-cols-4 mb-5">
        {day.map((item, index) => {
          return (
            <Card
              key={index}
              dayy={item}
              days={days.filter((itemm) => itemm.dayName == item)}
            />
          );
        })}
      </div>
      <div className="w-full flex justify-center">
        <div
          onClick={saveWeek}
          className="p-2 bg-bgTaskes text-white font-bold text-2xl rounded-md hover:bg-bgNav transition-all hover:p-3 cursor-pointer ml-5"
        >
          حفظ الكل
        </div>
        <Link href="/">
          <div
            onClick={deleteAll}
            ref={ref00}
            className="p-2 bg-bgTaskes text-white font-bold text-2xl rounded-md hover:bg-bgNav transition-all hover:p-3 cursor-pointer"
          >
            رجوع
          </div>
        </Link>
      </div>
    </div>
  );
}
