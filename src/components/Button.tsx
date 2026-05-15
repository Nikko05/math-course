import React from 'react';

function Button({ btnData } : { btnData : { background: string, color: string, name: string, type: string, paddingY?: string, paddingX?: string, width?: string, textClass?: string }}) {
  const px = btnData.paddingX || 'px-5';
  const py = btnData.paddingY || 'py-1';
  const textClass = btnData.textClass || 'text-base';
  
  return (
    <button className={`${btnData.background} ${btnData.color} ${btnData.type} ${btnData.width || ''} border-blue-400 rounded-lg border-2 ${px} ${py} ${textClass} cursor-pointer whitespace-nowrap active:scale-95 transition-transform`}>
      {btnData.name}
    </button>
  )
}

export default Button