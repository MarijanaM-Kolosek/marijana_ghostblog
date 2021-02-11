import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTags } from "../redux/actions/tagsActions";

const AddTags = (props) => {
  const dispatch = useDispatch();
  const [showCreateTag, setShowCreateTag] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const tags = useSelector((state) => state.tags.tags);

  const { addTagToPost, createTag } = props;

  useEffect(() => {
    dispatch(fetchTags());
  }, []);

  const toggleCreateNewTag = (e) => {
    setShowCreateTag(!showCreateTag);
  };

  return (
    <React.Fragment>
      <div className={!showCreateTag ? "createNewTagDiv" : "hideDiv"}>
        <select
          className="filtersSelectInput"
          name="selectTagFilter"
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="">Choose tag</option>
          {tags.map((tag) => (
            <option value={JSON.stringify(tag)}>{tag.name}</option>
          ))}
        </select>
        <button
          className="createTagButtons"
          onClick={(e) => addTagToPost(selectedTag)}
        >
          add
        </button>
        <button
          className="createTagButtons"
          onClick={(e) => toggleCreateNewTag(e)}
        >
          create new tag
        </button>
      </div>
      <div className={showCreateTag ? "createNewTagDiv" : "hideDiv"}>
        <input
          className="regularInput"
          type="text"
          name="newTagName"
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="new tag name"
        />
        <button
          className="createTagButtons"
          onClick={(e) => createTag(newTagName)}
        >
          create & add
        </button>
        <button
          className="createTagButtons"
          onClick={(e) => toggleCreateNewTag(e)}
        >
          X
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddTags;
