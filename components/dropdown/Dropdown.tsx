import { Box } from '@mui/material'
import React from 'react'
import { FaArrowRight, FaArrowDown } from "react-icons/fa6"
import { useState } from 'react'

const Dropdown = ({ category, children }: {
    category: string;
    children: React.ReactNode;
}) => {
    const [display, uptDisplay] = useState(false)
    return (
        <Box mb={2}>
            <Box onClick={() => uptDisplay(e => !e)} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#444", color: "#fff", padding: "10px 20px" }}>
                <Box>{category}</Box>
                {display ? <FaArrowDown /> : <FaArrowRight />}
            </Box>
            {display && children}
        </Box>
    )
}

export default Dropdown