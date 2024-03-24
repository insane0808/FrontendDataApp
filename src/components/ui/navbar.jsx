// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
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
  const handleLogout = () => {

  }
  return (

    // <nav className="bg-gray-800 p-4 transform rotate-90 origin-right">
    //   <div className="container mx-auto">
    //     <Link to="/" className="text-white font-bold text-xl">Home</Link>
    //     <div className="space-y-4 mt-4">
    //       <Link to="/page-one" className="text-white">Page One</Link>
    //       <Link to="/page-two" className="text-white">Page Two</Link>
    //     </div>
    //   </div>
    // </nav>

    /* <nav className="bg-gray-800 p-4 flex flex-col items-start">
          <div className="container mx-auto">
            <Link to="/" className="text-white font-bold text-xl">Home</Link>
            <div className="space-y-4 mt-4">
              <Link to="/page-one" className="text-white">Page One</Link>
              <Link to="/page-two" className="text-white">Page Two</Link>
            </div>
          </div>
        </nav> */




    // <div class="flex flex-col h-screen bg-gray-800 text-white">
    //   {/* <div class="py-4 px-6">
    //     <h1 class="text-2xl font-bold">Your Logo</h1>
    //   </div> */}
    //   <nav class="flex flex-col h-screen bg-gray-800 ">
    //     <ul class="space-y-4">
    //       <li><a href="#" class="hover:text-gray-300">Home</a></li>
    //       <li><a href="#" class="hover:text-gray-300">About</a></li>
    //       <li><a href="#" class="hover:text-gray-300">Services</a></li>
    //     </ul>
    //   </nav>
    // </div>
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
        <Link to="/esmtnt" className="text-white font-bold text-2xl">EsmnT2T</Link>
        <AlertDialog >
          <AlertDialogTrigger asChild>
            <Button className="text-white font-bold text-2xl" variant="outline">Logout</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className = "bg-gray-900">
            <AlertDialogHeader>
              <AlertDialogTitle className = "text-gray-900">Are you absolutely sure to logout?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Logout</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

    </nav>
  );
};

export default Navbar;
