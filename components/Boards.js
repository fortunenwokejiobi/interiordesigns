import React, {useState} from "react";
import Rating from "./Rating";
import StarRating from "./StarRating";

export default function Board({
  name,
  description,
  colors,
  designs,
  phone,
  email,
  score,
  onRate = (f) => f,
}) {
  const colorValues = Object.values(colors);

  const renderColorBlocks = colorValues.map((color, index) => (
    <div
      key={index}
      style={{
        height: 50,
        width: 50,
        backgroundColor: color,
        margin: "5px",
        display: "inline-block",
      }}
    />
  ));

  const [showDesigns, setShowDesigns] = useState(false);

  const toggleDesigns = () => {
    setShowDesigns(!showDesigns);
  };
  // const colorValues = Object.values(colors).join(", ");
  const designValues = Object.values(designs).map((design) => (
    <div key={design.title}>
      <h3>{design.title}</h3>
      <div className="design-images">
        <img src="./assets/images/slide1.jpg"></img>
        <img src="./assets/images/slide2.jpg"></img>
        <img src="./assets/images/slide3.jpg"></img>
     </div>
      <p>Description: {design.description}</p>
      
      <div>
        {/* Display StarRating component for each design's rating */}
        <StarRating totalStars={5} selectedStars={design.rating} />
      </div>
    </div>
  ));

  return (
    <section className="board-container" >
      <div className = "cover-image">
        <img src="./assets/images/slide1.jpg" className="cover-img"></img>
      </div>
     <div className = "basic-info">
      <h1>{name}</h1>
      <p>{description}</p>
      <div>{renderColorBlocks}</div>
      {showDesigns && 
      <div>
      <div>{designValues}</div>
      <div>
        <p>Phone: {phone}</p>
        <p>Email: {email}</p>
        </div>
        </div>}
        <button onClick={toggleDesigns}>
          {showDesigns ? "Hide Designs" : "Show Designs"}
        </button>
    {/* //  <div>Designs: {designValues}</div> */}
      <Rating rating={score} onRateUp={() => onRate(1)} onRateDown={() => onRate(-1)} />
     </div>
      
    
     
    </section>
  );
}
