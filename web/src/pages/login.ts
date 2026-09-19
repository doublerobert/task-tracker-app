import '../styles/global.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configs/firebase";

async function handleLogin(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // redirect based on role — check custom claims or Data Connect user profile
    window.location.href = "/main.html"; // or wherever your dashboard lives
  } catch (error) {
    // show error to user
  }
}
