import "./RegistrationForm.scss"
import type { AppDispatch, RootState } from "../store"
import {  useDispatch, useSelector  } from "react-redux"
import { setName, setEmail, setEvent, setMessage } from "../store/registrationSlice"
import { useNavigate } from "react-router-dom"
import { submitRegistration } from "../store/registrationThunk"
import { useEffect } from "react"
function RegistrationForm() {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const formData = useSelector((state: RootState) => state.registration.formData)
     const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.event) {
  alert("Please fill all required fields");
  return;
}

if (!formData.email.includes("@")) {
  alert("Enter valid email");
  return;
}

    dispatch(submitRegistration(formData));
  };
  const success=useSelector((state: RootState) => state.registration.success);
  const registrationId = useSelector((state: RootState) => state.registration.registrationId);

    useEffect(() => {
    if (success && registrationId) {
      navigate(`/status/${registrationId}`);
    }
  }, [success, registrationId, navigate]);

    return(
        <form className="registrationFormBox" onSubmit={handleSubmit}>
            <div className="formField">
                <label>
                    Name* 
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={(e)=>dispatch(setName(e.target.value))}/>
                </label>
            </div>
            <div className="formField">
                
                <label>
                    Email*
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={(e)=>dispatch(setEmail(e.target.value))}/>
                </label>
            </div>
            <div className="formField">
                
                <label>
                    Event*
                    <select name="event" value={formData.event} onChange={(e)=>dispatch(setEvent(e.target.value))}>
                        <option value="">Select Event</option>
                        <option value="evt1">TechKriti</option>
                        <option value="evt2">Clay Workshop</option>
                        <option value="evt3">Art Exhibition</option>
                        <option value="evt4">Music Concert</option>
                        <option value="evt5">Jewellery Exhibition</option>
                    </select>
                </label>
            </div>
            <div className="formField">
                
                <label>
                    Message
                    <textarea name="message" placeholder="Type your message here..(Optiona)" value={formData.message} onChange={(e)=>dispatch(setMessage(e.target.value))}></textarea>
                </label>
            </div>

            <div className="formSubmit">
                <button type="submit" className="submitButton">Submit</button>
            </div>
        </form>
    )
}
export default RegistrationForm;