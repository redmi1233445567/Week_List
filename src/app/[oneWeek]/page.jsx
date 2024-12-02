"use client";
import NavBar from "../components/nav-bar";
import { useDayStore } from "../store/data";
import JSConfetti from "js-confetti";

export default function OneWeek({ params }) {
  const ind = params.oneWeek;
  const weeks = useDayStore((state) => state.weeks);

  let rating = weeks[ind].evaluation;
  if (rating < 50) {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ["😡"],
    });
  } else if (rating < 65 && rating >= 50) {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ["😐"],
    });
  } else if (rating < 75 && rating >= 65) {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ["😌"],
    });
  } else if (rating > 75) {
    const jsConfetti = new JSConfetti();

    jsConfetti.addConfetti();
  }

  return (
    <div>
      <NavBar />
      <h1 className={`text-white text-3xl font-bold w-full text-center my-7 ${rating < 50? "text-red-600": "text-white"}`}>التقيم: {rating}</h1>
      <h1 className={`text-white text-3xl font-bold w-full text-center my-7 ${rating < 50? "text-red-600": "text-white"}`}>الاسبوع: {weeks[ind].numberWeek}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-11/12 mx-auto md:grid-cols-3 xl:grid-cols-4 mb-5">
        {weeks[ind].daysWeek.map((it, index) => {
          return (
            <div
              key={index}
              className="h-[370px] mt-12 p-3 rounded-3xl bg-bgCard"
            >
              <div className="w-4/5 p-3 flex justify-between rounded-lg text-xl font-bold mt-3 mb-4 mx-auto text-center bg-bgNav text-white">
                <p>{it.dayName}</p>
                <p >{it.tasks.filter((go) => go.done).length} من {it.tasks.length} </p>
              </div>
              <ul className="py-3 px-4 bg-bgTaske rounded-b-3xl h-64 overflow-y-auto">
                {it.tasks.length != 0 ? (
                  it.tasks.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className={`relative group overflow-hidden text-lg  mt-2 mb-3 py-2 cursor-pointer ${
                          item.done ? "bg-bgTaskes" : "bg-red-800"
                        }`}
                      >
                        <p
                          className={`mx-3 text-darkblue ${
                            item.done ? "text-darkblue" : " text-white"
                          }`}
                        >
                          {item.task}
                        </p>
                        <div className="absolute w-1 h-full bg-bgText duration-300 -translate-y-20 group-hover:-translate-y-9" />
                      </li>
                    );
                  })
                ) : (
                  <p className="text-2xl text-white font-bold text-center">
                    يوم اجازة...
                  </p>
                )}
              </ul>
              
            </div>
          );
        })}
      </div>
    </div>
  );
}
