import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result =>{
            navigate("/");
        })
    }

    return (
        <div >
            <div className="divider"></div>
            <div className="flex justify-center items-center flex-col lg:flex-row gap-4">
            <p>Or Login With</p>
                <button onClick={handleGoogleSignIn} className="btn flex items-center">
                    <FaGoogle className="mr-2"></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;