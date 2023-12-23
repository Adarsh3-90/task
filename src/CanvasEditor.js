
import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import "./styles.css";


export default function Editor() {
  const [imageUrl, setImageUrl] = useState("");
  const [textValue, setTextValue] = useState("");
  const [canvas, setCanvas] = useState();

  const addText = () => {
    if (canvas) {
      const text = new fabric.Text(textValue, {
        left: 100,
        top: 100,
        fontFamily: "Arial",
        fontSize: 18,
        fill: "black",
      });
      setTextValue("");
      canvas.add(text);
      canvas.renderAll();
    }
  };

  const addShape = (shapeType) => {
    if (canvas) {
      let shape;

      switch (shapeType) {
        case "rectangle":
          shape = new fabric.Rect({
       
            width: 200,
            height: 100,
            fill: "white",
            stroke: "black",
          });
          break;
        case "circle":
          shape = new fabric.Circle({
            left: 100,
            top: 100,
            radius: 50,
            fill: "blue",
            stroke: "black",
          });
          break;
        case "polygon":
          shape = new fabric.Polygon(
            [
              { x: 100, y: 100 },
              { x: 150, y: 50 },
              { x: 200, y: 100 },
              { x: 150, y: 150 },
            ],
            { fill: "white", stroke: "black" }
          );
          break;
        default:
          break;
      }

      if (shape) {
        canvas.add(shape);
        canvas.renderAll();
      }
    }
  };

  const downloadImage = () => {
    if (canvas) {
      // Convert the canvas to a data URL and trigger the download
      const dataURL = canvas.toDataURL({
        format: "jpeg",
        quality: 0.8,
        crossOrigin: "anonymous", // Set the crossOrigin property
      });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "canvas_image.jpg";
      link.click();
    }
  };

  useEffect(() => {
    let url = localStorage.getItem("imageUrl");
    console.log(url, "url");
    if (url) {
      setImageUrl(url);

      setTimeout(() => {
        let fcanvas = new fabric.Canvas("c");
        setCanvas(fcanvas);
        console.log(fcanvas, "canvas");
        fcanvas.setBackgroundImage(
          url,
          fcanvas.renderAll.bind(fcanvas),
          { crossOrigin: "anonymous" } // Set the crossOrigin property
        );
        fcanvas.setDimensions({ width: "500", height: "200" });
      
      }, 500);
    }
  }, []);

  return (
    <>
      <h1 className="edit">ADD CAPTION PAGE </h1>
      {!imageUrl && <h2> Please Select the image</h2>}
      {imageUrl && (
        <>
          <canvas style={{ width: "80vw", height: "70vh"}} id="c"></canvas>
           
          <div className="button-container">
          <input
            type="text"
            onChange={(e) => setTextValue(e.target.value)}
            value={textValue}
            className="input-box"
          ></input>
       
          <button onClick={addText}   style={buttonStyle}>Add Text</button>
          <button onClick={() => addShape("rectangle") } style={buttonStyle}>Add Rectangle</button>
          <button onClick={() => addShape("circle")} style={buttonStyle}>Add Circle</button>
          <button onClick={() => addShape("polygon")} style={buttonStyle}>Add Polygon</button>
          <button onClick={downloadImage}  style={buttonStyle}>Download Image</button>
          </div>
        </>
      )}
    </>
  );
}


const buttonStyle = {
    backgroundColor: "#4CAF50",
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
  };
  