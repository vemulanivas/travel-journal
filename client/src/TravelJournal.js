import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TravelList from "./components/TravelList";
import Input from "./components/ui/Input";
import Textarea from "./components/ui/Textarea";
import Button from "./components/ui/Button";

const TravelJournal = () => {
  const [entries, setEntries] = useState([]);
  const [city, setCity] = useState("");
  const [experience, setExperience] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Load entries from local storage on initial render
  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("travelEntries"));
    if (storedEntries) {
      setEntries(storedEntries);
    }
  }, []);

  // Save entries to local storage whenever entries change
  useEffect(() => {
    localStorage.setItem("travelEntries", JSON.stringify(entries));
  }, [entries]);

  // Function to resize image
  const resizeImage = (file, maxWidth, maxHeight, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = img.width;
        let height = img.height;

        // Scale the image while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw the image on canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas to a blob and pass it to callback
        canvas.toBlob((blob) => {
          callback(blob);
        }, "image/jpeg", 0.8);
      };
    };
  };

  // Handle file selection
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Resize image before setting state
      resizeImage(file, 500, 500, (resizedBlob) => {
        const resizedFile = new File([resizedBlob], file.name, { type: "image/jpeg" });

        setImage(resizedFile);
        setPreview(URL.createObjectURL(resizedFile));
      });
    }
  };

  // Add new entry
  const addEntry = () => {
    if (city.trim() && experience.trim()) {
      const newEntry = { id: Date.now(), city, experience, image };
      const updatedEntries = [...entries, newEntry];

      setEntries(updatedEntries);
      setCity("");
      setExperience("");
      setImage(null);
      setPreview(null);
    }
  };

  // Delete an entry
  const deleteEntry = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
  };

  return (
    <div className="app-container">
      <Header title="Travel Journal" />
      <div className="mb-4">
      <h1 className="text-2xl font-bold">Travel Journal</h1>

        <Input type="text" placeholder="Name of the City" value={city} onChange={(e) => setCity(e.target.value)} />
        <Textarea placeholder="Travel Experience" value={experience} onChange={(e) => setExperience(e.target.value)} />

        {/* File input for image upload */}
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />

        {/* Show preview of the resized image */}
        {preview && <img src={preview} alt="Preview" className="mt-2 w-full rounded" />}

        <Button onClick={addEntry} className="mt-2 bg-green-500">
          Add Entry
        </Button>
      </div>

      {/* List of travel entries */}
      <TravelList entries={entries} onDelete={deleteEntry} />
    </div>
  );
};

export default TravelJournal;

