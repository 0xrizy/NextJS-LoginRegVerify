"use client";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const [data, setData] = useState("nothing");
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      console.log("Logout Success");

      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get("/api/users/me");
        console.log(response.data);
        setData(response.data.data._id)
        setUserName(response.data.data.username);
      } catch (error: any) {
        console.log(error.message);
        toast.error(error.message);
      }
    };
    getUserDetails();
  }, [data, userName])
  
  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response.data);
      setData(response.data.data._id)
      setUserName(response.data.data.username);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div
      className="flex flex-col items-center
    justify-center min-h-screen py-2"
    >
      <h1>Profile</h1>
      <hr />
      <p> Profile Page</p>
      <h2 className="pl-2 pr-2 p-2 rounded bg-gray-700 text-white">{data==="nothing" ?"Not Found":<span>Welcome <span className="text-green-500 text-xl">{userName}</span> with id: {data}</span>} <Link className="text-blue-500 text-lg ml-5" href={`/profile/${data}`}>Go to Profile</Link></h2>
      <hr />
      <button
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base px-3 py-1 mr-2 mb-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 mt-3"
        onClick={logout}
      >
        Logout
      </button>
  

    </div>
  );
}
