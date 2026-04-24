import React from 'react';

export default function ProfileTutor({profile}: {profile: {name: string, img: string, description: string}}) {
  return (
    <div className='w-2/5 p-10 flex flex-col justify-center items-center'>
      <img src={profile.img} alt='userAvatar'/>
      <h2 className='text-3xl font-semibold'>{profile.name}</h2>
      <div className='text-center'>{profile.description}</div>
    </div>
  )
};
