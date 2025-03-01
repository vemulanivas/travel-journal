import React from "react";
import Card from "./ui/Card";

const TravelEntry = ({ title, description, image }) => {
  return (
    <Card className="mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-600">{description}</p>

      {/* Display the resized image */}
      {image && <img src={URL.createObjectURL(image)} alt="Travel" className="mt-2 w-full rounded" />}
    </Card>
  );
};

export default TravelEntry;
