import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";// import { useNavigate } from "react-router-dom";
import axios from "axios";
const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
    const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // console.log("user", user);
  }, []);
  
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google Login Success:", tokenResponse);
      OnGetUserProfile(tokenResponse);
    },
    onError: (error) => console.error("Google Login Error:", error),
  });
  const OnGetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenInfo.access_token}`,{
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: "application/json",
      },
  
    }).then((response) => {
      console.log(response)
      localStorage.setItem("user", JSON.stringify(response.data));
      setOpenDialog(false);
     window.location.reload
  })}
  return (
    <div className="p-3 shadow-sm px-5 flex items-center justify-between">
      <div>
        <img src="/logo.svg" alt="Logo" />
       
      </div>
      <div className="flex items-center gap-3">
        {user ? 
        <div>
      <a href="/create-trip">
         
         <Button variant="outline" className="rounded-full">+ Create Trip</Button></a> 

         <a href="/my-trips">
         
        <Button variant="outline" className="rounded-full">My trips</Button></a> 

        <Popover>
  <PopoverTrigger>    <img src={user?.picture}   className='h-[35px] w-[35px] rounded full'alt="user picture" /></PopoverTrigger>
  <PopoverContent><h2 className="cursor-pointer"
  onClick={
    ()=>{
      googleLogout()
      // navigation('/')
      localStorage.clear()
      window.location.reload()
    }
  }>Logout</h2></PopoverContent>
</Popover>

      </div> : <Button onClick={()=>setOpenDialog(true)}>Sign in</Button>}
      </div>
      <Dialog open={openDialog} >
        <DialogContent>
          <DialogHeader>
           
            <DialogDescription>
              <img src="/logo.svg" alt="" />
              <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
              <p>Sign in to  the app with google authentication security</p>
              You need to be logged in to generate a trip plan. Please log in or create an account.
              <Button 
              onClick={login}
             
              className="w-full mt-5 flex gap-4">
              
  <FcGoogle className="h-7 w-7" />
  Sign in with Google
 
</Button>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4">
            <Button 
           
            variant="outline" onClick={() => setOpenDialog(false)}>
              Close
            </Button>
            <Button onClick={() => (window.location.href = "/login")}>
              Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
