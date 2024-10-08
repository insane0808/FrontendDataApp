import { useState } from 'react'
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/1ztOjIUO9hp
 */
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
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

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);

    const handleLogin = async () => {
        const response = await axios.post("http://localhost:3020/api/login", {
            "username": email,
            "password": password
        }, {
            "Content-type": "application/json",
        });

        console.log(response);

        if (response.data?.data?.token) {
            localStorage.setItem("token", JSON.stringify(response.data?.data?.token));
            navigate("/home");
        }

        else {
            setOpenAlert(true);
        }
    }
    const handleCloseAlert = () => {
        setOpenAlert(false);
    }
    return (
        <div class="flex items-center justify-center h-screen">
            <div class="bg-white p-6 rounded-md">
                <Card >
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>Please enter your username and password to login.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" placeholder="username" required type="text" value={email} onChange={(e => setEmail(e.target.value))} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" placeholder="password" required type="password" value={password} onChange={(e => setPassword(e.target.value))} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-gray-900 hover:bg-gray-700 text-white" variant="outline" onClick={handleLogin} >Sign in</Button>
                    </CardFooter>
                </Card>
                < AlertDialog open={openAlert} className="bg-white m-0 h-4/6 " >
                    {/*    */}
                    <AlertDialogContent setOpenAlert={setOpenAlert} className="bg-white flex flex-wrap h-3.5/5 ">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Username or password entered is incorrect , please try again !</AlertDialogTitle>
                            {/* <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription> */}
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={handleCloseAlert} >Cancel </AlertDialogCancel>
                            {/* <AlertDialogAction>Cancel</AlertDialogAction> */}
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div >
    )
}

