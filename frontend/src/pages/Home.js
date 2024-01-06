import { useEffect} from "react"




import ProfileForm from "../components/ProfileForm"




const Home = () => {

 
  

  useEffect(()=> {
      const fetchProfiles = async () => {
        const response = await fetch('/api/profiles')
        const json = await response.json()


      } 

      fetchProfiles()   
     }, [])
  



  return (
    <div className="home">
      <div className="profiles">
       
  
      </div>
      <ProfileForm/>
    </div>
  )
}

export default Home