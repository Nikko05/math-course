import React from 'react';

<<<<<<< HEAD
function Button({ btnData, onClick } : { btnData : { background: string, color: string, name: string, type: string, paddingY?: string, paddingX?: string, width?: string, textClass?: string }, onClick?: () => void }) {
=======
function Button({ btnData } : { btnData : { background: string, color: string, name: string, type: string, paddingY?: string, paddingX?: string, width?: string, textClass?: string }}) {
>>>>>>> cms
  const px = btnData.paddingX || 'px-5';
  const py = btnData.paddingY || 'py-1';
  const textClass = btnData.textClass || 'text-base';
  
  return (
<<<<<<< HEAD
    <button onClick={onClick} className={`${btnData.background} ${btnData.color} ${btnData.type} ${btnData.width || ''} border-blue-400 rounded-lg border-2 ${px} ${py} ${textClass} cursor-pointer whitespace-nowrap active:scale-95 transition-transform`}>
=======
    <button className={`${btnData.background} ${btnData.color} ${btnData.type} ${btnData.width || ''} border-blue-400 rounded-lg border-2 ${px} ${py} ${textClass} cursor-pointer whitespace-nowrap active:scale-95 transition-transform`}>
>>>>>>> cms
      {btnData.name}
    </button>
  )
}

export default Button