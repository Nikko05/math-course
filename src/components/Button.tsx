import React from 'react';

function Button({ btnData } : { btnData : { background: string, color: string, name: string, type: string, paddingY: string, paddingX: string, width?: string }}) {
  return (
    <button className={`${btnData.background} ${btnData.color} ${btnData.name} ${btnData.type} ${btnData.width} border-blue-400 rounded-lg border-2 pl-5 pr-5 pt-0.5 pb-0.5 cursor-pointer`}>{btnData.name}</button>
  )
}

export default Button