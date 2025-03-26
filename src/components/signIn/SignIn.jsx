import React from "react";

const SignIn = ({ isVisible }) => {
  return (
    <div
      className={`w-4/5 ${isVisible ? "animate-slideIn" : "animate-slideOut"}`}
    >
      <h2 className="text-3xl font-semibold mb-2">Sign In</h2>
      <p className="text-gray-600 mb-8">
        Let's get started with your 30 days free trail.
      </p>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
        <div className="text-right">
          <a href="#" className="text-indigo-600 hover:underline">
            Forgot Password?
          </a>
        </div>
        <button className="w-full bg-indigo-600 text-white py-3 hover:cursor-pointer rounded-lg hover:bg-indigo-700 transition-all">
          Login
        </button>

        <div className="text-center text-gray-500 my-4">OR</div>

        <div className="flex gap-4">
          <button className="flex-1 bg-gray-50 py-3 rounded-lg hover:cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            Google
          </button>
          <button className="flex-1 bg-gray-50 py-3 rounded-lg hover:cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
            <img
              src="https://www.facebook.com/favicon.ico"
              alt="Facebook"
              className="w-5 h-5"
            />
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
