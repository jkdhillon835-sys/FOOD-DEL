import { useEffect, useState } from "react";
import { StoreContext } from "./StoreContext";
import axios from "axios";

const StoreContextProvider = ({ children }) => {
  const url = "http://localhost:4000";

  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));

    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }
  };

  // Calculate total cart amount safely with type coercion for IDs
  const getTotalCartAmount = () => {
  let totalAmount = 0;
  if (cartItems && typeof cartItems === "object") {
    for (const itemId in cartItems) {
      // Use Object.prototype.hasOwnProperty.call to avoid errors
      if (Object.prototype.hasOwnProperty.call(cartItems, itemId) && cartItems[itemId] > 0) {
        const itemInfo = food_list.find(
          (product) => String(product._id) === String(itemId)
        );
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      }
    }
  }
  return totalAmount;


  };

  // Fetch food list and user cart data
  const fetchFoodList = async (activeToken) => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      const data = response.data.data || [];
      setFoodList(data);

      if (activeToken) {
        const cartResponse = await axios.post(
          url + "/api/cart/get",
          {},
          { headers: { token: activeToken } }
        );
        // Provide fallback to empty object if data missing
        setCartItems(cartResponse.data.cartData || {});
      }
    } catch (error) {
      console.error("Error in fetchFoodList:", error.message);
    }
  };

  useEffect(() => {
    async function loadData() {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await fetchFoodList(storedToken);  // pass token directly
      } else {
        await fetchFoodList("");  // fetch food even without token
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContextProvider };
export default StoreContextProvider;
