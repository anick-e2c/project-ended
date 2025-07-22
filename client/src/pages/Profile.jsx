import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets1';

const Profile = () => {

  const [selectedImg, setSelectedImg]  = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState('Martin Johnson');
  const [bio, setBio] = useState("Hi I Everuone, I am Using QuickChat");

  const handlerSubmit = async(e)=>{
    e.preventDefault();
    navigate('/');
  }

  return (
    <div>
        <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>  
          <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600
            flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
              {/*-----form to edit profile---------*/}
            <form onSubmit={handlerSubmit} className='flex flex-col gap-5 p-10 flex-1' > 
              <h3 className='text-lg'>Profile details</h3>
              <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
                <input onChange={(e)=>setSelectedImg(e.target.files[0])}
                  type="file" id='avatar' accept='.png, .jpeg, .jpg' className='' hidden/>
                  <img src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} alt="" 
                  className={`w-12 h-12 ${selectedImg && 'rounded-full'}`}/>
                  Upload profile image
              </label>
              <input onChange={(e)=>setName(e.target.value)} value={name} 
                type="text" required placeholder='Your name' 
                className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'
              />
              <textarea onChange={(e)=>setBio(e.target.value)} value={bio}
                placeholder="Write your profile bio" required 
                className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                role={4}></textarea>

                <button type="submit" className='bg-gradient-to-l from-purple-400 to-violet-600
                  p-2 text-white rounded-full text-lg cursor-pointer'>Save</button>
            </form>
            <img className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10' src={assets.logo_icon} alt="" />
          </div>
        </div>
    </div>
  )
}

export default Profile