// AuthModalManager.js
import React, { useState } from "react";
import LoginForm from '../forms/LoginForm';
import SignUpForm from '../forms/SignUpForm';

const AuthModalManager = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <>
      {showLoginModal && (
        <LoginForm
          closeModal={() => setShowLoginModal(false)}
          openSignUpModal={() => setShowSignUpModal(true)}
        />
      )}
      {showSignUpModal && (
        <SignUpForm
          closeModal={() => setShowSignUpModal(false)}
        />
      )}
    </>
  );
};

export default AuthModalManager;
