import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLoginUserMutation  } from "@/lib/api";
import { Navigate } from "react-router";


function LoginPage() {
const [form , setForm] = useState({name:"" , password: ""})
const [errors, setErrors] = useState({name:"" ,password:""})
const [loggedin, setLoggedin] = useState(false)

const [loginUser,{isLoading}] = useLoginUserMutation();

const naviagte = Navigate();

const validateUser = () => {

    const newErrors = {name: "", password:""} 
    if(!form.name){
        newErrors.name = "Username Field is empty!"
    }
    if(!form.password){
        newErrors.name = "Password is Required"
    }
    setErrors(newErrors)
    return !newErrors.name && !newErrors.password
};

const handleChange  = (e) => {
    setForm({...form, [e.target.name]:e.target.value})
    setErrors({...errors, [e.target.name]:""})
}

const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validateUser())
        return;

    try{
         await loginUser(form)
         console.log("user loggedin successfully!")
         setLoggedin(true);
         naviagte("/")
    }catch(error){
        console.log(error)
        setErrors({ form: "Failed to create content. Try again." })

    }    
}

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-background/90 p-8 shadow-md">
        <h1 className="mb-2 text-2xl font-semibold text-foreground">Sign in</h1>
        <p className="mb-6 text-sm text-muted-foreground">Enter your username and password to continue.</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Username</label>
            <Input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Enter username" />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Password</label>
            <Input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter Password" />
          </div>

          <div className="flex items-center justify-between pt-2">
            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Login..." : "LoggedIn"}
            </Button>
            <a className="text-sm text-muted-foreground hover:underline" href="/signup">Create account</a>
          </div>
           {loggedin && (alert("User loggedin successfully"))}
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
