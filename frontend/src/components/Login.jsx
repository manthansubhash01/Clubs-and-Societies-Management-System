import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showChange, setShowChange] = useState(false);
  const [cpEmail, setCpEmail] = useState("");
  const [cpOld, setCpOld] = useState("");
  const [cpNew, setCpNew] = useState("");
  const [cpConfirm, setCpConfirm] = useState("");
  const [cpError, setCpError] = useState("");
  const [cpLoading, setCpLoading] = useState(false);
  const [cpSuccess, setCpSuccess] = useState("");

  const [clubs, setClubs] = useState([]);
  const stripRef = useRef(null);
  const navigate = useNavigate();
  const autoScrollIntervalRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const fetchClubs = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/clubs");
        if (!res.ok) throw new Error("Failed to fetch clubs");
        const data = await res.json();
        if (mounted && Array.isArray(data) && data.length) {
          setClubs(data);
        }
      } catch (e) {
        console.error("Failed to fetch clubs:", e);

        if (mounted) setClubs([]);
      }
    };
    fetchClubs();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (clubs.length > 0) {
      autoScrollIntervalRef.current = setInterval(() => {
        const el = stripRef.current;
        if (el) {
          const scrollAmount = 1;
          const itemWidth = 144;
          const singleSetWidth = itemWidth * clubs.length;

          if (el.scrollLeft >= singleSetWidth) {
            el.scrollLeft = el.scrollLeft - singleSetWidth;
          } else {
            el.scrollLeft += scrollAmount;
          }
        }
      }, 30);
    }

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [clubs]);

  const handleTogglePassword = () => setShowPassword((s) => !s);

  const pauseAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
  };

  const resumeAutoScroll = () => {
    if (clubs.length > 0) {
      autoScrollIntervalRef.current = setInterval(() => {
        const el = stripRef.current;
        if (el) {
          const scrollAmount = 1;
          const itemWidth = 144;
          const singleSetWidth = itemWidth * clubs.length;

          if (el.scrollLeft >= singleSetWidth) {
            el.scrollLeft = el.scrollLeft - singleSetWidth;
          } else {
            el.scrollLeft += scrollAmount;
          }
        }
      }, 30);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) return setError(data.error || "Invalid credentials");
      if (!data.accessToken) return setError("No access token received");

      sessionStorage.setItem("accessToken", data.accessToken);

      const parseJwt = (token) => {
        try {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );
          return JSON.parse(jsonPayload);
        } catch (err) {
          console.error("Failed to parse JWT", err);
          return null;
        }
      };
      const payload = parseJwt(data.accessToken);
      if (payload) {
        if (payload.role) sessionStorage.setItem("role", payload.role);
        if (payload.club_id)
          sessionStorage.setItem("club_id", String(payload.club_id));
        if (payload.sub) sessionStorage.setItem("userId", String(payload.sub));
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-3/5 bg-[#f3e6d9] p-12 flex flex-col justify-center">
        <div className="max-w-3xl">
          <h1 className="text-6xl pl-7 font-extrabold text-[#12202b] font-['Playfair_Display']">
            Clubs &amp; Societies
          </h1>
          <p className="mt-3 pl-7 text-[#7b6f61]">
            Discover, join and manage campus clubs. Explore activities and stay
            updated.
          </p>

          <div className="mt-12 pl-7">
            <div
              ref={stripRef}
              className="flex gap-10 overflow-x-auto py-6 scrollbar-hide"
              onMouseEnter={pauseAutoScroll}
              onMouseLeave={resumeAutoScroll}
            >
              {clubs.length === 0 ? (
                <div className="flex gap-8">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 flex flex-col items-center"
                    >
                      <div className="w-28 h-28 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="w-20 h-4 bg-gray-200 rounded mt-3 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              ) : (
                [...clubs, ...clubs, ...clubs].map((c, index) => (
                  <div
                    key={`${c.id}-${index}`}
                    className="flex-shrink-0 flex flex-col items-center group cursor-pointer"
                    title={`${c.club_name} - ${c.type}`}
                  >
                    <div className="w-28 h-28 rounded-full overflow-hidden shadow-xl border-4 border-white group-hover:border-[#FFC107] transition-all duration-300 group-hover:scale-110">
                      <img
                        src={c.logo_image || "/api/placeholder/112/112"}
                        alt={c.club_name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextElementSibling.style.display = "flex";
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-[#FFC107] to-[#b8894a] hidden items-center justify-center text-white text-base font-bold">
                        {c.club_name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .substring(0, 3)}
                      </div>
                    </div>
                    <p className="text-sm text-[#7b6f61] mt-3 text-center max-w-[112px] font-semibold leading-tight">
                      {c.club_name}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="md:w-2/5 pl-13 flex items-center justify-center p-12 bg-[#f6efe6]">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#12202b]">
            Sign In to Continue
          </h2>
          <p className="text-sm text-[#7b6f61] mt-2">
            Use your club core-member account
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && (
              <div className="bg-red-50 text-red-700 p-2 rounded">{error}</div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#12202b]">
                Email
              </label>
              <input
                className="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
                type="email"
                placeholder="Enter your college email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#12202b]">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  className="block w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-2 top-2 text-sm text-[#b8894a] hover:text-[#12202b]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={() => {
                  setShowChange((s) => !s);
                  setCpError("");
                  setCpSuccess("");
                }}
                className="text-[#b8894a] hover:text-[#12202b]"
              >
                {showChange ? "Hide change password" : "Change password"}
              </button>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FFC107] text-[#12202b] font-semibold py-2 rounded-md hover:bg-[#b8894a] transition-colors disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </div>
          </form>

          {showChange && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold">Change Password</h3>
              <p className="text-sm text-gray-600">
                Enter current and new password.
              </p>
              {cpError && (
                <div className="bg-red-50 text-red-700 p-2 rounded mt-2">
                  {cpError}
                </div>
              )}
              {cpSuccess && (
                <div className="bg-green-50 text-green-700 p-2 rounded mt-2">
                  {cpSuccess}
                </div>
              )}
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setCpError("");
                  setCpSuccess("");
                  if (!cpEmail || !cpOld || !cpNew)
                    return setCpError("Please fill all fields");
                  if (cpNew !== cpConfirm)
                    return setCpError("New passwords do not match");
                  setCpLoading(true);
                  try {
                    const payload = {
                      email: cpEmail,
                      oldPassword: cpOld,
                      newPassword: cpNew,
                    };
                    const res = await fetch(
                      "http://localhost:3001/api/auth/change-password",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                      }
                    );
                    const data = await res.json();
                    setCpLoading(false);
                    if (!res.ok)
                      return setCpError(
                        data.error || "Failed to change password"
                      );
                    setCpSuccess(
                      data.message || "Password changed successfully"
                    );
                    setCpOld("");
                    setCpNew("");
                    setCpConfirm("");
                    setCpEmail("");
                  } catch (err) {
                    console.error(err);
                    setCpLoading(false);
                    setCpError("Server error. Please try again.");
                  }
                }}
                className="mt-3 space-y-3"
              >
                <div>
                  <label className="block text-sm font-medium text-[#12202b]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={cpEmail}
                    onChange={(e) => setCpEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#12202b]">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={cpOld}
                    onChange={(e) => setCpOld(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#12202b]">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={cpNew}
                    onChange={(e) => setCpNew(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#12202b]">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={cpConfirm}
                    onChange={(e) => setCpConfirm(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={cpLoading}
                    className="w-full bg-[#f59e0b] text-[#12202b] font-semibold py-2 rounded-md hover:bg-[#b8894a] transition-colors disabled:opacity-50"
                  >
                    {cpLoading ? "Updating..." : "Change Password"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
