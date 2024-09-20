import React from "react";
import styled, { keyframes } from "styled-components";

const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: clamp(10px, 2vw, 20px);
  background-color: #f4f5f8;
  padding: 20px;
  box-sizing: border-box;
`;

const pulse = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(52, 152, 219, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0);
  }
`;

const LoadingCircle = styled.div`
  width: clamp(40px, 10vw, 80px);
  height: clamp(40px, 10vw, 80px);
  border-radius: 50%;
  background-color: #3498db;
  animation: ${pulse} 2s infinite;
`;

const LoadingText = styled.span`
  font-size: clamp(0.875rem, 2.5vw, 1.25rem);
  color: #333333;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-align: center;
  max-width: 80%;
  line-height: 1.4;
`;

const Loading = ({ text = "Loading..." }) => {
  return (
    <LoadingContainer>
      <LoadingCircle />
      <LoadingText>{text}</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;



