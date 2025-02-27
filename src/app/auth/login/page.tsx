"use client";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        // Get stored users from local storage
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        // Find user
        const user = users.find((u: { email: string; password: string }) => u.email === email);

        if (!user) {
            alert("Email not registered. Please register first.");
        } else if (user.password !== password) {
            alert("Incorrect password.");
        } else {
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("currentUser", email);
            router.push("/main");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-400">
            <h1 className="text-4xl font-bold mb-6 text-white">Login</h1>
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-80">
                <input name="email" type="email" placeholder="Email" className="w-full p-3 border rounded mb-3 text-black placeholder-gray-500" required />
                <input name="password" type="password" placeholder="Password" className="w-full p-3 border rounded mb-3 text-black placeholder-gray-500" required />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Login
                </button>
            </form>
        </div>
    );
}
