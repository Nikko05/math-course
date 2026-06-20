import React from 'react'

type InputProps = {
  inputData: {
    name: string,
    placeholder: string,
    paddingY:string,
    paddingX:string,
    fontSize?:string,
    label: string,
    type: string,
  }
}

export default function Input({inputData: {name, placeholder, paddingY, paddingX, fontSize, label, type}}: InputProps) {
  return (
    <div className='flex flex-col w-full'>
      <label htmlFor={name} className='text-sm pb-1'>
        <span>{label}</span>
      </label>
      <input type={type} className={`border rounded-md border-blue-100/10 bg-blue-50/5 opacity-80 w-full ${paddingY} ${paddingX} ${fontSize}`} placeholder={placeholder}/>
    </div>
  )
}
