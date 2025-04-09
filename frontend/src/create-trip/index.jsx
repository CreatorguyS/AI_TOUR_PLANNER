import { AI_PROMPT, SelectBudgetList, SelectTravelsList } from "@/constants/options";
import { Input } from "../components/ui/input";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { chatSession } from "@/service/AIMOdal";
import axios from 'axios'
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "@/service/firebaseConfig";
import { getDoc } from "firebase/firestore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
 
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const navigate=useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("Updated Form Data:", formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google Login Success:", tokenResponse);
      OnGetUserProfile(tokenResponse);
    },
    onError: (error) => console.error("Google Login Error:", error),
  });
  

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
  
    if (!user) {
      setOpenDialog(true);
      return;
    }
  
    if (
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler ||
      !formData?.noofdays
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields before proceeding.",
      });
      return;
    }
  
    if (formData.noofdays > 5) {
      toast({
        title: "Limit Exceeded",
        description: "Please select a plan for 5 days or less.",
      });
      return;
    }
  
    if (formData.noofdays <= 0) {
      toast({
        title: "Invalid Duration",
        description: "Number of days should be at least 1.",
      });
      return;
    }
  
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noofdays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget);
  
    console.log("FINAL_PROMPT:", FINAL_PROMPT);
  
    try {
      setLoading(true);
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result?.response?.text();
      console.log("RESULT:", responseText);
  
      // Save the trip to Firebase
      await SaveAiTrip(responseText);
  
      toast({
        title: "Trip Generated Successfully!",
        description: "Your personalized trip plan has been saved.",
      });
  
    } catch (error) {
      console.error("Error generating trip:", error);
      toast({
        title: "Generation Failed",
        description: "Something went wrong while generating your trip plan.",
      });
    } finally {
      setLoading(false);
    }
  };
  


  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user"));
  
    const tripDocRef = doc(db, "AItrips", docId);
  
    // Save the trip
    await setDoc(tripDocRef, {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
  
    // ✅ Now fetch it again to confirm and log
    const savedDoc = await getDoc(tripDocRef);
    if (savedDoc.exists()) {
      console.log("✅ Trip document saved:", savedDoc.data());
    } else {
      console.log("❌ No such document found.");
    }
  
    setLoading(false);
    navigate(`/view-trip/${docId}`);
  };
  
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
    onGenerateTrip()
})}
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
        <p className="mt-3 text-gray-500 text-xl">
          Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
        </p>
      </h2>

      {/* Destination Selection */}
      <div className="mt-20 flex flex-col gap-9">
        <h2 className="text-3xl my-3 font-medium">What is your destination of choice?</h2>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_MAP_API}
          selectProps={{
            value: place,
            onChange: (v) => {
              setPlace(v);
              handleInputChange("location", v?.label || "");
            },
          }}
        />
      </div>

      {/* Trip Duration */}
      <div className="mt-10">
        <h2 className="text-3xl my-3 font-medium">How many days are you planning your trip?</h2>
        <div className="mt-5">
          <Input
            placeholder="Ex. 3"
            type="number"
            onChange={(e) =>
              handleInputChange("noofdays", parseInt(e.target.value) || "")
            }
          />
        </div>
      </div>

      {/* Budget Selection */}
      <div className="mt-10">
        <h2 className="font-bold text-3xl">What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`flex flex-col cursor-pointer items-start gap-2 p-4 border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
                formData?.budget === item.title
                  ? "shadow-lg bg-blue-50 border-black"
                  : ""
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Companion Selection */}
      <div className="mt-10">
        <h2 className="font-bold text-3xl">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.title)}
              className={`flex flex-col cursor-pointer items-start gap-2 p-4 border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
                formData?.traveler === item.title
                  ? "shadow-lg bg-blue-50 border-black"
                  : ""
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Loading UI */}
      {loading &&
        <div className="text-center my-6">
          <p className="text-lg text-gray-600">
            Hang tight! Crafting your perfect trip... ✈️🌍
          </p>
        </div>
      }

      {/* Submit Button */}
      <div className="my-10 justify-end flex">
        <Button onClick={onGenerateTrip} disabled={loading}>
          {loading ? "Generating..." : "Generate Trip"}
        </Button>
      </div>


      {/* Dialog for Unauthenticated Users */}
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

export default CreateTrip;
