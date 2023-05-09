import { LinearProgress } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const ProgressBar = () => {
  const loading = useSelector(state =>state.posts.loading)

  return (
    <div>
      {
        loading? <LinearProgress /> : null
      }
    </div>
  )
}

export default ProgressBar

