
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8282"
})

export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData();
    formData.append("file", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    try {
        const response = await api.post("/rooms/add", formData);
        console.log(response)
        if (response.status >= 200 && response.status < 300) {
            console.log("Room added successfully!"); // Good for confirmation
            return true;
        } else {
            // If the backend sends an error message in the response body, log it
            const errorData = response.data ? response.data : 'No additional error info.';
            console.error(`Failed to add room. Status: ${response.status}, Error:`, errorData);
            return false;
        }
    } catch (error) {
        console.error("Network or API call error:", error);
        // You might want to return false or throw a custom error depending on your error handling strategy
        return false;
    }
}

export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room-types")
        console.log(response.data)
        return response.data.data
    } catch (error) {
        console.log(error)
        return []
    }
}


