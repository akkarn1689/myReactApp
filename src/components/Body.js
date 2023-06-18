// import { restaurantList } from "../constants";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

// what is state?
// what is React Hooks? - function
// what is useState?

function filterData(searchText, allRestaurants) {
    const filterData = allRestaurants.filter((restaurant) =>
        restaurant?.data?.name?.toLowerCase().includes(searchText.toLowerCase())
    );

    return filterData;
}


const Body = () => {
    // const searchTxt="KFC"; // js way to create variable

    // searchText is a local state variable
    const [searchText, setsearchText] = useState(); // returns => [variable name, function to update the variable]
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    useEffect(() => {
        // API call
        getRestaurant();
        // Do error handling
    }, []);

    async function getRestaurant() {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.8041502&lng=83.34821459999999&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        console.log(json);
        // optional chaining
        setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
        setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    }



    // conditional rendering
    // if restaurant is empty => Shimer UI
    // if restaurant has data => actual data UI

    // not render component (Early return)
    if (!allRestaurants) return null;



    return (allRestaurants?.length === 0) ? <Shimmer /> : (
        <>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => {
                        // e.target.value -> whatever you write in input
                        setsearchText(e.target.value);
                    }}
                />
                <button
                    className="search-btn"
                    onClick={() => {
                        // need to filter the data
                        const data = filterData(searchText, allRestaurants);
                        // update the state - restaurants
                        setFilteredRestaurants(data);
                    }}
                >
                    Search
                </button>
            </div>
            <div className="restaurant-list">
                {/* if search query is not found/ found */}
                {
                    (filteredRestaurants?.length === 0) ? <h1>No Restaurant match your Filter</h1> :
                        filteredRestaurants.map(restaurant => {
                            return <RestaurantCard {...restaurant.data} key={restaurant.data.id} />
                        })
                }
            </div>
        </>
    );
}

export default Body;