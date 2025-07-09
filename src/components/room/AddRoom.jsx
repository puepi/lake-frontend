import { useState } from "react"
import { addRoom } from "../utils/api-functions"
import RoomTypeSelector from "../common/RoomTypeSelector"


export default function AddRoom() {
    const [newRoom, setNewRoom] = useState({
        photo: '',
        roomType: '',
        roomPrice: ''
    })

    const [imagePreview, setImagePreview] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    function handleInputChange(event) {
        const name = event.target.name
        let value = event.target.value
        if (name === "roomPrice") {
            if (!isNaN(value))
                Number.parseInt(value)
            else
                value = ""
        }
        setNewRoom({
            ...newRoom, [name]: value
        })
        console.log(newRoom)
    }

    function handleImageChange(event) {
        const selectedImage = event.target.files[0]
        setNewRoom({ ...newRoom, photo: selectedImage })
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
            if (success != undefined) {
                setSuccessMessage('A new room was added')
                setNewRoom({ photo: null, roomType: '', roomPrice: '' })
                setImagePreview('')
                setErrorMessage('')
            } else {
                setErrorMessage('Error adding room')
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }
    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Add a new room</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="roomType" className="form-label">Room Type</label>
                                <div>
                                    <RoomTypeSelector newRoom={newRoom} handleNewRoomInputChange={(e)=>handleInputChange(e)} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="roomPrice" className="form-label">Room Price</label>
                                <input
                                    type="number" className="form-control" required
                                    name="roomPrice"
                                    id="roomPrice"
                                    value={newRoom.roomPrice}
                                    onChange={(e)=>handleInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label">Room Photo</label>
                                <input
                                    type="file" className="form-control" required
                                    name="photo"
                                    id="photo"
                                    value={newRoom.photo}
                                    onChange={(e)=>handleImageChange(e)}
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview} alt="preview Room image"
                                        style={{ maxWidth: "400px", maxHeight: "400px" }}
                                        className="mb-3"
                                    />
                                )}
                            </div>
                            <div className="d-grid d-md-flex mt-2">
                                <button className="btn btn-outline-primary ml-5">
                                    Save room
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>


        </>
    )
}