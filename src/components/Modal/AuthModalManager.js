// AuthModalManager.js
import React, { useState } from "react";
import LoginForm from '../forms/LoginForm';
import SignUpForm from '../forms/SignUpForm';

const AuthModalManager = () => {
  const [modalVisible, setModalVisible] = useState(false); //로그인 로직 겹쳐서 수정 4/15
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <>{modalVisible && (
        <LoginForm
          closeModal={() => setModalVisible(false)}
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