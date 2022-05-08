import "../styles/AddList.css";
import React, { useState } from "react";
import ListEditor from "./ListEditor";
import shortid from "shortid";
import EditButtons from "./EditButtons";
import { useDispatch } from "react-redux";

const AddList = ({ toggleAddingList }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const createList = async () => {
    toggleAddingList();
    dispatch({
      type: "ADD_LIST",
      payload: { listId: shortid.generate(), listTitle: title },
    });
  };
  return (
    <div className="Add-List-Editor">
      <ListEditor
        title={title}
        handleChangeTitle={handleChangeTitle}
        onClickOutside={toggleAddingList}
        saveList={createList}
      />

      <EditButtons
        handleSave={createList}
        saveLabel={"Add list"}
        handleCancel={toggleAddingList}
      />
    </div>
  );
};

export default AddList;
