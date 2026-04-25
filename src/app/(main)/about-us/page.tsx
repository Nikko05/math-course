import React from 'react';
import ProfileTutor from '@/components/ProfileTutor';

const user = {
  name: 'John Carver',
  img: './avatar.png',
  description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem adipisci error itaque quibusdam earum! Eum quibusdam pariatur sed aut nemo, corporis, earum harum aspernatur ipsum provident dicta iste porro incidunt soluta totam, quaerat adipisci. Molestias ad doloribus quas qui, consectetur reiciendis esse repellendus iste corporis hic expedita sapiente neque sint!'
};

export default function AboutUs() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-7xl'>O nas</h1>
      <div className='flex justify-center items-center'>
        <ProfileTutor profile={user}/>
        <ProfileTutor profile={user}/>
        <ProfileTutor profile={user}/>
      </div>
    </div>
  );
};