import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchRegistrationStatus } from "../store/registrationStatusThunk"
import type  { AppDispatch,  RootState } from "../store"


function RegistrationStatus() {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>()
    const { statusData, loading, error } = useSelector(
        (state: RootState) => state.registration
    )
 useEffect(() => {
        if (id) {
            dispatch(fetchRegistrationStatus(id))
        }
    }, [id,dispatch])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>


    return (
        <div className="statusCard">
            <h2>Registration Status</h2>
            <div className="statusBox">
                <p><span>Registration Id:</span> {id}</p>
                <p><span>Name:</span> {statusData?.name || "---"}</p>
                <p><span>Email:</span> {statusData?.email || "---"}</p>
                <p><span>Event:</span> {statusData?.event || "---"}</p>
                <p><span>Status:</span> {statusData?.status || "Queued"}</p>
            </div>
        </div>
    )
}

export default RegistrationStatus
