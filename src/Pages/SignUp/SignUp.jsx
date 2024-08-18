import { Button, Card, Label, TextInput, FileInput} from "flowbite-react";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {

    const [error, setError] = useState("");
    const [file, setFile] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
      };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = file;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
  
      if (!/^(?=.*[!@#$%^&*()_+=-{};:"<>,./?])./.test(password)) {
        setError("Password must have at least a special character");
        return;
    }
  
      if (!/^(?=.*[A-Z])/.test(password)) {
        setError("Password must have at least an uppercase letter");
        return;
      }

      if(password!==confirmPassword)
        {
            setError("Passwords must match!");
        return;
        }

      setError("");
      const imageFile = { image: photo }
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });

    const photoURL= res.data.data.display_url;


    createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(name, photoURL)
                    .then(() => {
                        
                                    navigate('/');
                                })})
  };
    return (
        <div className="flex flex-col md:flex-row mt-20 mb-20 justify-center gap-8 mx-auto max-w-[90%] ">
        <Helmet>
        <title>Register</title>
      </Helmet>
        <div className="flex items-center ">
        <img className="h-[400px]" src="https://i.ibb.co/tcVfqxK/Humaaans-3-Characters.png" alt="" />
        </div>
        
            <Card className="md:w-[40%]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your name" />
          </div>
          <TextInput id="name" type="text" placeholder="your name" required />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput id="email" type="email" placeholder="name@techworld.com" required />
        </div>
        

        <div>
      <div className="mb-2 block">
        <Label htmlFor="photoUpload" value="Upload your photo" />
      </div>
      <FileInput id="photoUpload" onChange={handleFileChange} />
    </div>


        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput id="password" type="password" required />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="confirmPassword" value="Confirm your password" />
          </div>
          <TextInput id="confirmPassword" type="password" required />
        </div>

        <Button type="submit">Sign Up</Button>
        {error && <small className="text-red-800">{error}</small>}
      </form>
      <p className="md:text-lg text-center mb-4">Already have an account? <Link className="font-semibold" to="/login">Sign In</Link></p>
      
      
    </Card>
        </div>
        
    );
};

export default SignUp;