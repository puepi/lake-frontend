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
    function handleNewRoomInputChange(event) {
        setNewRoomType(event.target.value)
    }
    function handleAddNewRoomType() {
        if (newRoomType !== "")
            setRoomTypes([...roomTypes, newRoomType])
        setNewRoomType('')
        setShowInput(false)
    }
    return (
        <>
            {roomTypes.length > 0 && (
                <div>
                    <select name="roomType" id="roomType" value={newRoom.roomType} onChange={
                        (e) => {
                            if (e.target.value === 'Add new') {
                                setShowInput(true)
                            } else {
                                handleNewRoomInputChange(e)
                            }

                        }
                    }>
                        <option value="">Select a new room type</option>
                        <option value="Add new">Add a New Room Type</option>
                        <option value="" disabled>---------------</option>
                        {
                            roomTypes.map((type, i) => <option key={i} value={type}>{type}</option>)
                        }
                    </select>
                    {showInput &&
                        <div className="input-group">
                            <input type="text" onChange={handleNewRoomInputChange} className="form-control" placeholder="Enter a new room type" />
                            <button className="btn btn-hotel" onClick={handleAddNewRoomType}>Add</button>
                        </div>
                    }
                </div>
            )}
        </>
    )
}