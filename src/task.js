import React from "react";

const Task = () => {
  return (
    <div>
      {localStorage.length > 0 ? (
        <div className="active">
          <p>Logged in</p>
        </div>
      ) : (
        <div className="inactive">
          <p>Logged out</p>
        </div>
      )}
    </div>
  );
};

export default Task;
