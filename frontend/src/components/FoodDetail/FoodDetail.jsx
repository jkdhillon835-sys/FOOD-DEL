import React from "react";
import { BrowserRouter } from "react-router-dom";

const FoodDetail = ({ food_list }) => {
  const { id } = BrowserRouter();
  const food = food_list.find(item => item._id === id);

  if (!food) return <p>Food not found</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{food.name}</h2>
      <img src={food.image} alt={food.name} style={{ width: "300px", borderRadius: '12px' }} />
      <p>{food.description}</p>
      <p><b>Category:</b> {food.category}</p>
      <p><b>Price:</b> ${food.price}</p>
    </div>
  );
};

export default FoodDetail;
