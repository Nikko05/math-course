import React from 'react';

export default function ProfileTutor({profile}: {profile: {name: string, img: string, description: string}}) {
  return (
    <div className='w-full sm:w-2/5 lg:w-1/4 p-6 sm:p-10 flex flex-col justify-center items-center text-center'>
      <img src={profile.img} alt='userAvatar' className='w-32 h-32 mb-4 rounded-full object-cover shadow-sm' />
      <h2 className='text-2xl sm:text-3xl font-semibold mb-2'>{profile.name}</h2>
      <div className='text-sm sm:text-base text-neutral-400'>{profile.description}</div>
    </div>
  )
};
