import MapTaskesClient from "../client/tasks";

const MapTaskes = () => {

  return(
    <div className="grid grid-cols-4 gap-5 w-11/12 mx-auto phone:grid-cols-1 phone:mb-8 phone:gap-0">
      <MapTaskesClient />
    </div>
  )
}

export default MapTaskes;