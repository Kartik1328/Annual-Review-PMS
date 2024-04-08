// annualReviewEmp.jsx

import React, { useEffect, useState } from 'react'
import {GrAddCircle} from "react-icons/gr";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import axios from 'axios';


function AnnualReviewEmp() {
    const [rows, setRows] = useState(1);
    const [annRevValues, setAnnRevValues] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [icon, setIcon] = useState();

    const handleAddRow = () => {
        setRows(prevRows => prevRows + 1);
      };

      const handleDeleteRow= () =>{
        setRows(prevRows => prevRows - 1)
      }
      const [popoverVisible1, setPopoverVisible1] = useState(false);
      const [popoverVisible2, setPopoverVisible2] = useState(false);

                //  now this is the function to handle the submit functionality and to post things in table.
      const handleSubmit = () => {
          axios.post("http://localhost:8080/api/postByAnnRev", annRevValues)
            .then((response) => {
              axios.get("http://localhost:8080/api/getByAnnual/6")
                .then((response) => setAnnRevValues(response.data))
            })
        
        setSubmitted("You have filled annual review.");
        setIcon(<IoMdCheckmarkCircleOutline />);
        setPopoverVisible1(false);
        setPopoverVisible2(false);

      }

      const handleAnnRevValueChange=(e)=>{
        const key=e.target.name;
        const value=e.target.value;
        setAnnRevValues({...annRevValues,[key]:value});
      }
      
      console.log(annRevValues,"annRevValues");

      const handleSaveAsDraft = () => {
        setPopoverVisible1(false);
        setPopoverVisible2(false);
      }

       // Assuming you want this effect to run only once on component mount
      

   console.warn(annRevValues,"annRevValues")

   console.log(annRevValues,"annRevValues")

  return (
    <div className='w-full h-screen bg-gray-200'>
      <div className='bg-white rounded-md relative top-12 ml-4 mr-3 border-[1px] border-blue-400 pb-24'>
      {/* <h1 className='text-xl font-normal text-black pl-4 pt-10'>Quarter 4</h1> */}
        <div className='flex space-x-[500px] pt-6'>
          <h3 className='text-m text-gray-500 pl-5 mt-2'>01-Apr 2023 to 30-Jun-2023</h3>
          <div className='flex space-x-2 text-green-500 items-center text-lg'>
            <h1 className='text-xl'>{icon}</h1>
            <h1 className=''>{submitted} </h1>
          </div>
        </div>

        {/* MENU BAR */}
        <div className='text-gray-400 pl-1'>
          <div className="relative">
            <div className="toggle-bar absolute h-2  transition-transform duration-300">
            </div>
            <ul className="flex space-x-4  p-4">
              <li><a href="#" onClick={() => moveToggle(0)} className="text-lg">Goal Setting</a></li>
              <li><a href="#" onClick={() => moveToggle(1)} className="text-lg">Self Assessment</a></li>
              <li><a href="#" onClick={() => moveToggle(2)} className="text-lg">Manager Assessment</a></li>
              <li><a href="#" onClick={() => moveToggle(2)} className="text-lg">Annual Review</a></li>
            </ul>
          </div>
        </div>

        {/* Adding one seprating line according to the figma design */}

        <h1 className='border-b-[1px] border-gray-300 ml-4 mr-4'></h1>

        {/* NOW CREATING THE GRID AND TEXT AREAS FOR THE COMMENTS AND THYE ANNUAL REVIEW */}

        <div className='container'>
        {[...Array(rows)].map((_, index) => (

        <div className='grid grid-cols-10 ml-5'>
            
          <div className='col-span-2  mt-5'>
          <h2 className={`text-lg ${index !== 0 && 'hidden'}`}>Employee Comment</h2>
          <textarea type="text" placeholder="Enter here" className=' placeholder-gray-400 overflow-hidden resize-none w-[80%] h-[100px] font-extralight text-normal text-gray-600 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3' name='appraiseeComment' onChange={handleAnnRevValueChange} value={annRevValues.appraiseeComment} /> 
          </div>

          <div className='col-span-2  mt-5 '>
          <h2 className={`text-lg ${index !== 0 && 'hidden'}`}>Manager Comment</h2>
          <textarea type="text" placeholder="Enter here" className=' placeholder-gray-400 overflow-hidden resize-none w-[80%] h-[100px] font-extralight text-normal text-gray-600 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3' value={annRevValues.managerComment}/>
          </div>

          <div className='col-span-2  mt-5 '>
          <h2 className={`text-lg ${index !== 0 && 'hidden'}`}>Strength</h2>
          <textarea type="text" placeholder="Enter here" className=' placeholder-gray-400 overflow-hidden resize-none w-[80%] h-[100px] font-extralight text-normal text-gray-600 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3' value={annRevValues.appraiseeStrength} />
          </div>

          <div className='col-span-2   mt-5'>
          <h2 className={`text-lg ${index !== 0 && 'hidden'}`}>Area of imporvement</h2>
          <textarea type="text" placeholder="Enter here" className=' placeholder-gray-400 overflow-hidden resize-none w-[80%] h-[100px] font-extralight text-normal text-gray-600 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3' value={annRevValues.areaOfImprovement}/>
          </div>

          <div className='col-span-2  mt-5 '>
          <h2 className={`text-lg ${index !== 0 && 'hidden'}`}>Rating</h2>
            <div className='flex mt-8'>

          <textarea type="text" placeholder="Enter here" className=' placeholder-gray-400 overflow-hidden resize-none w-[35%] h-[50px] font-extralight text-normal text-gray-600 pt-2 border-[1px] border-gray-300' value={annRevValues.ratings}/>
          <svg onClick={handleDeleteRow} className='mt-3 pl-4' xmlns="http://www.w3.org/2000/svg"  height="22" width="32" viewBox="0 0 448 512" fill='red'>
          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
          </svg>

          </div>
            
          </div>

        </div>
  ))}

        </div>
        <div className='mt-4'>
          <button onClick={handleAddRow} className="flex items-center ml-[920px] text-blue-400 text-lg whitespace-nowrap ">
          <GrAddCircle />
          Add More
        </button>
          </div>


          {/* NOW THE SUBMIT, DRAFT AND CANCEL BUTTONS */}
          <div className='grid grid-cols-3 ml-[700px] mt-8 '>

            <div className="col-span-1">
                        <div className='relative'>
                          <button
                            className="border-2 border-white bg-blue-500 text-white  rounded-md hover:bg-gray-500 w-[100px] h-11 font-medium"
                            onClick={handleSubmit}
                            onMouseMove={() => setPopoverVisible1(true)}
                            onMouseOut={() => { setPopoverVisible1(false) }}>Submit</button>
                          {popoverVisible1 && (
                            <div className="absolute top-[calc(100%+10px)] left-0 bg-gray-200 p-2 rounded-md shadow-md font-extralight pl-2">
                              {/* Your popover content goes here */}
                              <p className='space-x-4'>Once submitted cannot edit</p>
                            </div>
                          )}
                        </div>
            </div>

            <div className="col-span-1">
                        <div className='relative'>
                          <button
                            className="border-2 border-white bg-gray-500 text-white w-[100px] h-11 rounded-md hover:bg-blue-500 -ml-24 font-medium"
                            onClick={handleSaveAsDraft}
                            onMouseMove={() => setPopoverVisible2(true)}
                            onMouseOut={() => setPopoverVisible2(false)}>Save as Draft</button>
                          {popoverVisible2 && (
                            <div className="absolute top-[calc(100%+10px)] left-0 bg-gray-200 p-2 rounded-md shadow-md font-extralight">
                              {/* Your popover content goes here */}
                              <p>You can edit it later</p>
                            </div>
                          )}
                        </div>
            </div>

            <div className="col-span-1 ">
                        <button className="border-2 border-white bg-black text-white rounded-md w-[100px] h-11 -ml-48 font-medium">Cancel</button>
            </div>

                      </div>

      </div>

    </div>
  )
}

export default AnnualReviewEmp
