import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import SignIn from "../components/signIn/SignIn.jsx";
import SignUp from "../components/signIn/SignUp.jsx";

const SignInPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleForm = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-[1200px] min-h-[600px] shadow-xl flex relative justify-between overflow-hidden border border-gray-200">
        <div className="w-1/2 bg-gradient-to-b from-cyan-300 via-teal-200 to-purple-300 p-20 rounded-r-[20%] flex flex-col">
          <div className="bg-white h-full p-8 rounded-r-[20%]">
            <div className="flex items-center gap-2 mb-12">
              <MessageSquare className="w-8 h-8 text-indigo-600" />
              <span className="text-2xl font-semibold">Resume Builder</span>
            </div>

            <div
              className={`transition-all duration-300 ${
                !showSignUp
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12 absolute"
              }`}
            >
              <h1 className="text-5xl font-bold mb-4">Hey, Hello!</h1>
              <h2 className="text-xl text-indigo-600 mb-6">
                Create Your Professional Resume Today!
              </h2>
              <p className="text-gray-600 mb-12">
                Join our platform to create stunning resumes that stand out.
                Easy to use, professional templates, and instant downloads.
              </p>
              <div>
                <p className="text-gray-700 mb-3">Don't have an account?</p>
                <button
                  onClick={toggleForm}
                  className="px-6 py-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 hover:cursor-pointer transition-all font-semibold"
                >
                  Sign Up
                </button>
              </div>
            </div>

            <div
              className={`transition-all duration-300 ${
                showSignUp
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12 absolute"
              }`}
            >
              <h1 className="text-5xl font-bold mb-4">Welcome Back!</h1>
              <h2 className="text-xl text-indigo-600 mb-6">
                Ready to Continue Your Journey?
              </h2>
              <p className="text-gray-600 mb-12">
                Sign in to access your saved templates, continue editing your
                resumes, and explore new professional opportunities.
              </p>
              <div>
                <p className="text-gray-700 mb-3">Already have an account?</p>
                <button
                  onClick={toggleForm}
                  className="px-6 py-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 hover:cursor-pointer transition-all font-semibold"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex justify-center z-20 bg-white p-8">
          {!showSignUp && (
            <SignIn isVisible={!showSignUp} onSignUpClick={toggleForm} />
          )}
          {showSignUp && (
            <SignUp isVisible={showSignUp} onSignInClick={toggleForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
