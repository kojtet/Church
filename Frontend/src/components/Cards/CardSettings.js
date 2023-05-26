import React,{useState,useEffect} from "react";
import axios from 'axios'
import {auth} from '../../firebase' 
import { useHistory } from "react-router-dom";

// components

export default function CardSettings() {
  const currentUser = auth.currentUser;
  const history = useHistory()
  const [data,setData] = useState({
    attendance: 0,
    offertory: 0,
    totalPledge: 0,
    totalTithe: 0,

  })

  const [pastor,setPastor] = useState({}) 
  

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const obj = {
      ...data,
      branch: pastor.church? pastor.church : " Main"
    }
    axios.post('https://us-central1-gospelwaves-2d1c0.cloudfunctions.net/api/services',obj)
    .then(res => {
      history.push('/admin/dashboard')
      alert("Service Added Successfully")

    })
    .catch(err => {
      console.log(err)
    })
  }

  const getCurrentUser = () => {
    axios.get(`https://us-central1-gospelwaves-2d1c0.cloudfunctions.net/api/users/${currentUser.email}`)
    .then(res => {
      setPastor(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getCurrentUser()
  })

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Add Service</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Service Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Attendance
                  </label>
                  <input
                    type="number"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={data.attendance}
                    onChange={handleChange}
                    id="attendance"
                    placeholder="Attendance"

                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Offertory
                  </label>
                  <input
                    type="number"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={data.offertory}
                    onChange={handleChange}
                    id="offertory"
                    placeholder="Offertory"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Total Pledge
                  </label>
                  <input
                    type="number"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={data.totalPledge}
                    onChange={handleChange}
                    id="totalPledge"
                    placeholder="Total Pledge"

                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Tithe Payed
                  </label>
                  <input
                    type="number"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={data.totalTithe}
                    onChange={handleChange}
                    id="totalTithe"
                    placeholder="Total Tithe"

                  />
                </div>
              </div>
            </div>


            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Add Service
                  </button>

                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
