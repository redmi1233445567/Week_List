import FocusDay from "@/app/client/focus-day";

const theDay = ({params}) => {
  const id = params.theDay[8];
  return(
    <div className="w-100% flex h-dvh phone:h-fit">
      <FocusDay id={id}/>
    </div>
  )
}

export default theDay;