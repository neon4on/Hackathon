import { fetchDistributionObjects, deleteDistributionObject } from "src/api/api";
import { useState, useEffect } from "react";

import styles from "src/styles/pages/Objects.module.scss";

const Objects = () => {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    const getObjects = async () => {
      try {
        const response = await fetchDistributionObjects();
        console.log("Fetched distribution objects:", response.data); // Debugging line
        if (Array.isArray(response.data)) {
          setObjects(response.data);
        } else {
          console.error("Expected an array but received:", response.data);
        }
      } catch (error) {
        console.error("Error fetching distribution objects:", error);
      }
    };
    getObjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDistributionObject(id);
      setObjects(objects.filter((obj) => obj.id !== id));
    } catch (error) {
      console.error("Error deleting distribution object:", error);
    }
  };

  return (
    <div className={styles.distribution}>
      <h1>Distribution Objects</h1>
      {objects.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {objects.map((obj) => (
              <tr key={obj.id}>
                <td>{obj.name}</td>
                <td>{obj.description}</td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => handleDelete(obj.id)}>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>No distribution objects found</h1>
      )}
    </div>
  );
};

export default Objects;