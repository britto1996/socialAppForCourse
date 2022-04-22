import { CircularProgress } from '@mui/material'
import React from 'react'

interface Props {
    load?: boolean

}

function Load({load} : Props) {
  return (
    <div style={{textAlign:"center",marginTop:"20%"}}>
         <CircularProgress />
    </div>
  )
}

export default Load