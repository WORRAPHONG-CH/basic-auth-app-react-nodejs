import React from 'react';

// Define input props for inputForm
interface InputFormProps {
    name?:string,
    type: string,
    placeholder?: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void // function return void
}

// define props Functional Component with props above
const InputForm:React.FC<InputFormProps> = 
    // Object Destructuring 
    ({name,type,placeholder,value,onChange}) =>{  
    
  return (
    <div className='w-full'>
        <input 
        type={type} 
        name={name} 
        value={value} 
        placeholder={placeholder} 
        onChange={onChange}
        className='my-1 pl-2 outline-none w-full rounded-md mx-2'
        required/>
    </div>
  )
}
export default InputForm