import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Counter = ({ count }) => {

    return (
        <>
            <div
                className='text-9xl'
            >{count}</div >
        </>
    )
}

export default Counter
