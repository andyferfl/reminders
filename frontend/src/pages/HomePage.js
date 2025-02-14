import React from 'react'
import Reminders from '../components/Reminders'
import MediaList from '../components/MediaList'
import Photos from '../components/Photos'

function HomePage() {
  return (
    <div className='bg-secondary'>
        <MediaList/>
        <Reminders/>
        <hr class="w-50 mx-auto mb-5"/>
        <Photos/>
    </div>
  )
}

export default HomePage