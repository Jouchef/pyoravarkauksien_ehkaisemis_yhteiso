import { useState } from "react"
import Map from "./Map"
import Notification from "./Notification"
import { PinFilter } from "./PinFilter"
import { BikeTheft, Filters } from "../types"
import styles from '../App.module.css'
import { LatLng } from "leaflet"
import ReportModal from "./ReportModal"
import { auth } from "../services/google_authentication"
import { signOut } from "firebase/auth"

const initialFilters: Filters = {
  bikeTheft: {
    label: 'Theft Locations',
    isChecked: true,
  },
  lockStation: {
    label: 'Lock Stations',
    isChecked: true,
  }
}

const HomePage = () => {
  const [reportMode, setReportMode] = useState<boolean>(false)
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [theftPosition, setTheftPosition] = useState<LatLng | null>(null)
  const [bikeThefts, setBikeThefts] = useState<BikeTheft[]>([])
  
  const reportHandler = () => {
    setReportMode(!reportMode)
    setTheftPosition(null)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: {
        ...prevFilters[name],
        isChecked: checked
      }
    }))
  }

  const user = auth.currentUser
  console.log(user)

  return (
    <div>
      <div className={styles['content-container']}>
          <PinFilter
          filters={filters}
          handleFilterChange={handleFilterChange}
          />
          <button className={`${styles['base-button']}`} id={styles['theft-button']} onClick={reportHandler}>{reportMode ? "Cancel" : "Report theft"}</button>
          <Notification message={"Place me where the theft happened"} visible={reportMode}/>
          <ReportModal theftPosition={theftPosition} setTheftPosition={setTheftPosition} bikeThefts={bikeThefts} setBikeThefts={setBikeThefts} />
          {user &&
            <div>
              <p>You are logged in as {user.email}</p>
              <button onClick={() => signOut(auth)}>logout</button>
            </div>
          }
      </div>
      <Map
          reportMode={reportMode}
          filters={filters}
          theftPosition={theftPosition}
          setTheftPosition={setTheftPosition}
          bikeThefts={bikeThefts}
          setBikeThefts={setBikeThefts}
      />
    </div>
  )
}

export default HomePage