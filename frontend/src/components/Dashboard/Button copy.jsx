import React from 'react'

function Button({width , color , bgColor , text , size , borderRadius}) {
  return (
    <button
    type='button'
    style={{backgroundColor:bgColor , color , borderRadius}}
    className={`text-${size} w-${width} p-3 hover:drop-shadow-xl`}>
       {text}
    </button>
  )
}

export default Button
