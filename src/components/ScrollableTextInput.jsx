import React, { useRef } from "react";
import "./ScrollableTextInput.css";

const ScrollableTextInput = () => {
  const inputRef = useRef(null);

  const handleInput = (e) => {
    // Get the current text content
    const content = e.currentTarget.innerText;
    console.log("Current content:", content);
    // Here you can handle updates, validations, etc.
  };

  return (
    <div className="scrollable-text-input">
      <div
        className="input-area"
        contentEditable
        ref={inputRef}
        onInput={handleInput}
        placeholder="Type here..."
      ></div>
    </div>
  );
};

export default ScrollableTextInput;
