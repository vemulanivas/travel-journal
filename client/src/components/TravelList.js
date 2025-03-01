import React from "react";
import Button from "./ui/Button";

const TravelList = ({ entries, onDelete }) => {
  return (
    <div className="mt-4">
      {entries.length === 0 ? (
        <p>No travel entries yet.</p>
      ) : (
        entries.map((entry) => (
          <div key={entry.id} className="bg-gray-100 p-4 rounded mb-2">
            <h3 className="font-bold text-lg">{entry.city}</h3>
            <p>{entry.experience}</p>

            {entry.image && (
              <img
                src={URL.createObjectURL(entry.image)}
                alt="Travel"
                className="mt-2 w-full rounded"
              />
            )}

            {/* Delete Button */}
            <Button onClick={() => onDelete(entry.id)} className="mt-2 bg-red-500">
              Delete
            </Button>
          </div>
        ))
      )}
    </div>
  );
};

export default TravelList;
