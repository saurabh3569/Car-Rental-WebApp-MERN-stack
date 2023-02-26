import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HistoryTable from '../../components/User/HistoryTable'
import ShowSpinner from '../../components/User/Spinner'
import { selectToken, selectUser, setUser } from '../../Slice/userSlice'
import Error from '../../components/User/Error'
import jwt_decode from "jwt-decode";


const HistoryBooking = () => {


  const token = useSelector(selectToken)
  let user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [data, setData] = useState()
  const [error, setError] = useState('')

  const get = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if(!user){
        const decode = jwt_decode(token)
        user = decode.user
        dispatch(setUser(user))
      }
      const { data } = await axios.get(`/api/booking/getallbookings/${user._id}`, config)
      setData(data);
    } catch (error) {
      setError(error.response.data);
    }
  }

  useEffect(() => {
    get()
  }, [data])

  return (
    <div className='history'>
      <h1 className='text-center text-white'>History</h1>
      {data ?
        <HistoryTable data={data} />
        : !error ? <ShowSpinner /> : <Error error={error} />}
    </div>
  )
}

export default HistoryBooking
