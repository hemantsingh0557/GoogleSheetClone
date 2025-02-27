"use client";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        // Get existing users
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        // Check if email is already registered
        if (users.some((user: { email: string }) => user.email === email)) {
            alert("Email already registered. Please log in.");
            return;
        }

        // Add new user
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("currentUser", email);

        router.push("/main");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-400">
            <h1 className="text-4xl font-bold mb-6 text-white">Register</h1>
            <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-80">
                <input name="name" type="text" placeholder="Name" className="w-full p-3 border rounded mb-3 text-black placeholder-gray-500" required />
                <input name="email" type="email" placeholder="Email" className="w-full p-3 border rounded mb-3 text-black placeholder-gray-500" required />
                <input name="password" type="password" placeholder="Password" className="w-full p-3 border rounded mb-3 text-black placeholder-gray-500" required />
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                    Register
                </button>
            </form>
        </div>
    );
}
