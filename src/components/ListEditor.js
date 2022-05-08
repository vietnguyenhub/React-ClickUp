import "../styles/ListEditor.css";
import React, { createRef, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";

const ListEditor = ({
  saveList,
  onClickOutside,
  title,
  handleChangeTitle,
  deleteList,
}) => {
  const ref = createRef();
  const onEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      saveList();
    }
  };
  const handleClick = (e) => {
    const node = ref.current;
    if (node.contains(e.target)) {
      return;
    }
    onClickOutside();
  };
  useEffect(() => {
    document.addEventListener("click", () => handleClick, false);
  }, []);

  useEffect(() => {
    window.addEventListener("click", () => handleClick, false);

    // returned function will be called on component unmount
    return () => {
      window.removeEventListener("click", () => handleClick, false);
    };
  }, []);

  return (
    <div>
      <div className="List-Title-Edit" ref={ref}>
        <TextareaAutosize
          autoFocus
          className="List-Title-Textarea"
          placeholder="Enter list title..."
          value={title}
          onChange={handleChangeTitle}
          onKeyDown={onEnter}
          style={{ width: deleteList ? 220 : 245 }}
        />
        {deleteList && <ion-icon name="trash" onClick={deleteList} />}
      </div>
    </div>
  );
};

export default ListEditor;
