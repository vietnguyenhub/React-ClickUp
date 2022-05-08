import React, { useState } from "react";
import "../styles/CardEditor.css";
import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "./EditButtons";

const CardEditor = ({ onSave, onCancel, onDelete, adding }) => {
  const [text, setText] = useState("");
  const handleChangeText = (e) => {
    setText(e.target.value);
  };
  const onEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onSave(text);
    }
  };
  return (
    <div className="Edit-Card">
      <div className="Card">
        <TextareaAutosize
          autoFocus
          className="Edit-Card-Textarea"
          placeholder="Enter the text for this card..."
          value={text}
          onChange={handleChangeText}
          onKeyDown={onEnter}
        />
      </div>
      <EditButtons
        handleSave={() => onSave(text)}
        saveLabel={adding ? "Add card" : "Save"}
        handleDelete={onDelete}
        handleCancel={onCancel}
      />
    </div>
  );
};

export default CardEditor;
