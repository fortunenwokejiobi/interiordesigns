import React, { useState } from "react";
import { useInput } from "./hooks"; // Assuming your custom hook file is named "hooks.js"

export default function AddBoardForm({ onNewBoard = f => f }) {
  // User-related form fields using custom hook useInput
  const [userProps, resetUser] = useInput("");
  const [messageProps, resetMessage] = useInput("");
  const [imageProps, resetImage] = useInput(null);
  const [colorProp1, resetColor1] = useInput("#000000");
  const [colorProp2, resetColor2] = useInput("#000000");
  const [colorProp3, resetColor3] = useInput("#000000");
  const [colorProp4, resetColor4] = useInput("#000000");
  const [phoneProps, resetPhone] = useInput("");
  const [emailProps, resetEmail] = useInput("");
  // Dynamic design fields using custom hook useInput
  const [entries, setEntries] = useState([]);
  const [designName, resetDesignName] = useInput("");
  const [designImages, resetDesignImages] = useInput(null);
  const [designDescription, resetDesignDescription] = useInput("");

  const addEntry = () => {
    try{
    const newEntry = {
      title: designName.value,
    //  images: designImages.value, // Assuming designImages is an array
      description: designDescription.value,
      rating: 0,
    };

    console.log("New Entry:", newEntry);

    setEntries((prevEntries) => {
      const updatedEntries = [...prevEntries, newEntry];
      console.log("Updated Entries:", updatedEntries); // Log updated state
      return updatedEntries;
    });
    resetDesignName();
    resetDesignDescription();
    resetDesignImages();
  }
  catch (error) {
    console.error('Error in addEntry:', error);
  }
  };

  const submit = async (e) => {
    e.preventDefault();

    const colors1 = {
      color1: colorProp1.value,
      color2: colorProp2.value,
      color3: colorProp3.value,
      color4: colorProp4.value
    }
     console.log("entries are", entries);
    const formData = {
      name: userProps.value,
      description: messageProps.value,
      colors: colors1,
      designs: entries,
      phone: phoneProps.value,
      email: emailProps.value, // Send all design entries
    };

    try {
      const response = await fetch('/addCompany', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Reset form fields after successful submission
        onNewBoard(userProps.value, messageProps.value, entries.values, colorProp1.value, colorProp2.value, colorProp3, colorProp4.value, phoneProps.value, emailProps.value);

        setEntries([]);
        resetUser();
        resetMessage();
        resetImage();
        resetColor1();
        resetColor2();
        resetColor3();
        resetColor4();
        resetPhone();
        resetEmail();
        // Reset other user-related fields
      } else {
        // Handle errors if needed
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <form onSubmit={submit}>

      {/* User-related form fields */}
      <h2 className="form-block"> General company information </h2>

      <div className="general-form-group">
        <div className="form-group">
          <label htmlFor="user">Company Name:</label>
          <input {...userProps} type="text" id="user" required />
        </div>

        <div className="form-group">
          <label htmlFor="message">About company:</label>
          <textarea {...messageProps} id="message" rows="4" required />
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={e => resetImage(e.target.files[0])}
          />
        </div>
      </div>
     
      <h3 className="form-block"> Design color pattern </h3>
       
      <div className="general-form-group">
        <div className="form-group">
          <label htmlFor="color1">Color 1:</label>
          <input {...colorProp1} type="color" required />
        </div>
        <div className="form-group">
          <label htmlFor="color2">Color 2:</label>
          <input {...colorProp2} type="color" required />
        </div>
        <div className="form-group">
          <label htmlFor="color3">Color 3:</label>
          <input {...colorProp3} type="color" required />
        </div>
        <div className="form-group">
          <label htmlFor="color4">Color 4:</label>
          <input {...colorProp4} type="color" required />
        </div>
      </div>

      {/* Dynamic design fields */}
      <h2 className="form-block"> Inputted Entries </h2>
      {entries.map((entry, index) => (
        <div key={index}>
          <p>Entry {index + 1}:</p>
          <p>Design Name: {entry.name}</p>
          <p>Design Images: {entry.images}</p>
          <p>Design Description: {entry.description}</p>
        </div>
      ))}

      <h2 className="form-block"> New entries </h2>
      <div className="general-form-group">
      <div className="form-group">
        <label htmlFor="designName">Design Name:</label>
        <input {...designName} type="text" id="designName" required />
      </div>

      <div className="form-group">
        <label htmlFor="designDescription">Design Description:</label>
        <textarea {...designDescription} id="designDescription" rows="4" required />
      </div>

      <div className="form-group">
        <label htmlFor="designImages">Upload Design Images:</label>
        <input
          type="file"
          id="designImages"
          accept="image/*"
          onChange={e => resetDesignImages(e.target.files)}
        />
      </div>

      <button type="button" onClick={addEntry} className ="design-entry-button">
        Add Design Entry
      </button>

      </div>

      <h2 className="form-block"> Contact information </h2>
      <div className="general-form-group">
      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input {...phoneProps} type="text" id="phone" required />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input {...emailProps} type="text" id="email" required />
      </div>
      </div>

      {/* Submit button */}
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
}
