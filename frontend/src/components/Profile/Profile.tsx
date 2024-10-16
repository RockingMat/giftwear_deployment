import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const [existing, setExisting] = useState(false);
    const [newUser, setNewUser] = useState(false);

    useEffect(() => {
        if(existing){
            navigate('/existing');
        }
        if(newUser){
            navigate('/new');
        }
    }, [existing, newUser, navigate]);
    return (
        <div>
          <h1>Profile</h1>
          <button onClick={() => setNewUser(true)}>Create New Recipient</button>
          <button onClick={() => setExisting(true)}>Use Existing Recipient</button>
        </div>
      );
};
export default Profile;