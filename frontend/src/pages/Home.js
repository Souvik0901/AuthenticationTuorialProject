import { useEffect, useState} from "react"

import ProfileForm from "../components/ProfileForm"
import ProfileDetails from "../components/ProfileDetails"




const Home = () => {
 
  const [profiles, setProfiles] = useState(null)
 


  // for fetching the Profile details
  useEffect(()=> {
      const fetchProfiles = async () => {
        const response = await fetch('/api/profiles')
        const json = await response.json()
        

        if(response.ok){
          setProfiles(json)
        }
      } 

      fetchProfiles()   
     }, [])
  



  return (
    <div className="home">
      <div className="profiles">
        {profiles && profiles.map(profile =>(
           <ProfileDetails profile={profile} key= {profile._id}/>
        ))}
      </div>
      <ProfileForm/>
    </div>
  )
}

export default Home