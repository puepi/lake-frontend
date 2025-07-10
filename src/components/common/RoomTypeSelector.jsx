import { useEffect, useState } from "react"
import { getRoomTypes } from "../utils/api-functions"


export default function RoomTypeSelector({ handleNewRoomInputChange, newRoom }) {
    const [roomTypes, setRoomTypes] = useState([])
    const [showInput, setShowInput] = useState(false)
    const [newRoomType, setNewRoomType] = useState("")
    useEffect(() => {
        getRoomTypes()
            .then(data => {
                setRoomTypes(data)
            })
    }, [])

    function handleAddNewRoomType() {
        if (newRoomType !== ""){
            setRoomTypes([...roomTypes,newRoomType])
            setNewRoomType('')
            setShowInput(false)
        }
            
    }

    function handleChange(e){
        setNewRoomType(e.target.value)
    }
    return (
        <>
            {(roomTypes ? roomTypes.length : '')>= 0 && (
                <div>
                    <select name="roomType" id="roomType" value={newRoom.roomType} onChange={
                        (e) => {
                            if (e.target.value === '-- Add new --') {
                                setShowInput(true)
                            }
                             handleNewRoomInputChange(e)

                        }
                    }>
                        <option value=" ">Select a new room type</option>
                        <option value="-- Add new --">Add a New Room Type</option>
                        <option disabled>---------------------------</option>
                        {
                            roomTypes.map((type, i) => <option key={i} value={type}>{type}</option>)
                        }
                    </select>
                    {showInput &&
                        <div className="input-group">
                            <input type="text" value={newRoomType} onChange={(e)=>handleChange(e)}  className="form-control" placeholder="Enter a new room type" />
                            <button className="btn btn-hotel" type="button" onClick={handleAddNewRoomType}>Add</button>
                        </div>
                    }
                </div>
            )}
        </>
    )
}