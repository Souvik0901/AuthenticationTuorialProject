
const ProfileDetails = ({ profile }) => {



  const handleClick = async()=>{
    const response = await fetch('/api/profiles/'+ profile._id,{
      method : 'DELETE'
    })

    const json = await response.json()

  }



  return (
    <div className="workout-details">
      <h4>{profile.username}</h4>
      <p><strong>EmailID : </strong>{profile.email}</p>
      <p><strong>About : </strong>{profile.about}</p>
      <p><strong>Designation : </strong>{profile.designation}</p>
      <p><strong>Skills : </strong>{profile.skills}</p>
      <p><strong>Education : </strong>{profile.education}</p>
      <p><strong>Contact No. : </strong>{profile.contact}</p>
      <p><strong>Address : </strong>{profile.address}</p>
      <p><strong>SocialMedia : </strong>{profile.socialmedia}</p>
      <p>{profile.createdAt}</p>
      {/* <span className="material-symbols-outlined" onClick = {handleClick}>delete</span> */}
    </div>
  )
}

export default ProfileDetails