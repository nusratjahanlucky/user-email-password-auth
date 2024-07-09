import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config"
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const  accepted = e.target.terms.checked;
        console.log(name,email, password,accepted);

        //reset error
        setRegisterError('');
        setSuccess('');

        if (password.length < 6) {
            setRegisterError('password should be at least 6 characters')
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your password should have at least one upper case characters.')
            return;
        }
        else if(!accepted){
            setRegisterError('please accept our terms and conditions!')
            return;
        }

        //create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User Created Successfully')

                //update profile
                updateProfile(result.user,{
                    displayName:name,
                    photoURL:"https://example.com/jane-q-user/profile.jpg"
                })
                .then(()=>{
                    console.log('profile update')
                })
                .catch(()=>{
                    console.log()
                })

                //send verification email
                sendEmailVerification(result.user)
                .then( () =>{
                    alert('please check your email and verify your account')
                })
            })

            .catch(error => {
                console.error(error);
                setRegisterError(error.message);
            })
    }

    return (
        <div className="">
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl mb-8">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <input className="w-full mb-4 py-2 px-4" placeholder="Your Name" type="name" name="name" id="" required />
                    <br />
                    
                    <input className="w-full mb-4 py-2 px-4" placeholder="Email Address" type="email" name="email" id="" required />
                    <br />
                    <div className="relative mb-4 border">
                        <input className=" w-full  py-2 px-4" placeholder="password" type={showPassword ? "text" : "password"} name="password" id="" required />
                        <span className="absolute top-3 right-2" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }

                        </span>
                    </div>
                    <br />
                    <div className="mb-2">
                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-2" htmlFor="">Accept our <a href="">Terms and Conditions</a></label>
                    </div>
                    <br />
                    <input className=" btn btn-secondary mb-4 w-full" type="submit" value="Register" />
                </form>
                {
                    registerError && <p className="text-red-800">{registerError}</p>
                }
                {
                    success && <p className="text-green-700">{success}</p>
                }
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;