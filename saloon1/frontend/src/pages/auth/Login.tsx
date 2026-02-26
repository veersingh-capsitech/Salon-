import { useState } from "react";
import { Input, Button, message } from "antd";
import { MailOutlined, LockOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import "../../index.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    const handleSignIn = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3500/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            console.log("Login response:", data);
           

            if (response.ok) {
               

                message.success("Login successful!");
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data));
                
                if (data.role === "SuperAdmin") {
                    navigate("/superAdmin");
                } else if (data.role === "Admin") {
                    navigate("/admin");
                } else if (data.role === "Employee") {
                    navigate("/employee");
                } else {
                    navigate("/customer");
                }
            }
        } catch (error) {
            message.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSignIn();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 from-blue-50 to-white px-4">
            <div className="w-full max-w-md">
                
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h2>
                    <p className="text-gray-600">Sign in to manage your bookings</p>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Email
                        </label>
                        <Input
                            size="large"
                            placeholder="abc@xyz.com"
                            prefix={<MailOutlined className="text-gray-400" />}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="rounded-lg"
                            style={{ borderRadius: "8px" }}
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-medium text-gray-900">
                                Password
                            </label>
                           
                        </div>
                        <Input.Password
                            size="large"
                            placeholder="Enter password"
                            prefix={<LockOutlined className="text-gray-400" />}
                            iconRender={(visible) =>
                                visible ? (
                                    <EyeOutlined className="text-gray-400" />
                                ) : (
                                    <EyeInvisibleOutlined className="text-gray-400" />
                                )
                            }
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="rounded-lg"
                            style={{ borderRadius: "8px" }}
                        />
                    </div>

                    <Button
                        type="primary"
                        size="large"
                        block
                        loading={loading}
                        onClick={handleSignIn}
                        rootClassName="!bg-blue-500 !text-white !font-semibold !rounded-lg !h-12 !text-base hover:!bg-blue-600"
                    >
                        Sign In →
                    </Button>
                </div>
                

                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-500 font-semibold hover:text-blue-600 border-b-2 border-blue-500">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
