// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const Navbar = () => {
  const navigate  = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("token", null);
    navigate("/login");
  }
  return (
    <nav className="flex items-center justify-between bg-gray-900 h-25 px-10 py-5">
      <div className="flex flex-row justify-center">
        < Avatar >
          <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUHt2T8aRJdvmYhbXFKFKKe-F-a2tPpUmTXA&usqp=CAU" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Link to="/home" className="text-white font-bold text-4xl ml-5 mt-7">DataApp</Link>
      </div>

      <div className="space-x-20">
        <Link to="/watchlist" className="text-white font-bold text-2xl">Watchlist</Link>
        <Link to="/file" className="text-white font-bold text-2xl">Files</Link>
        <AlertDialog className="bg-white m-0 h-4/6 " >
          <AlertDialogTrigger asChild>
            <Button className="text-white font-bold text-2xl" variant="outline">Logout</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white flex flex-wrap h-3.5/5 ">
            <AlertDialogHeader>
              <AlertDialogTitle className = "text-gray-900">Are you sure absolutely sure ,  you want to logout?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout} >Logout </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

    </nav>
  );
};

export default Navbar;
