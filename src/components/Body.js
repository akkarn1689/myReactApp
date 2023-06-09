// import { restaurantList } from "../constants";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";


//
import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";
import UserContext from "../utils/UserContext";



const Body = () => {
    // const searchTxt="KFC"; // js way to create variable

    // searchText is a local state variable
    const [searchText, setsearchText] = useState(); // returns => [variable name, function to update the variable]
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const { user, setUser } = useContext(UserContext);

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

    const isOnline = useOnline();

    if (!isOnline) {
        return <h1>🔴 Offline, please check your internet connection!!!</h1>;
    }

    // conditional rendering
    // if restaurant is empty => Shimer UI
    // if restaurant has data => actual data UI

    // not render component (Early return)
    if (!allRestaurants) return null;

    return (allRestaurants?.length === 0) ? <Shimmer /> : (
        <>
            <div className="search-container flex justify-center w-3/5 p-5 bg-pink-50 my-5 mx-auto items-center rounded-lg">
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
                    className="p-2 m-2 bg-black text-white rounded-full"
                    onClick={() => {
                        // need to filter the data
                        const data = filterData(searchText, allRestaurants);
                        // update the state - restaurants
                        setFilteredRestaurants(data);
                    }}
                >
                    Search
                </button>

                {/* <input value={user.name} onChange={
                    e => setUser({
                        ...user,
                        name: e.target.value,
                    })
                }></input>
                <input value={user.email} onChange={
                    e => setUser({
                        ...user,
                        email: e.target.value,
                    })
                }></input> */}

            </div>
            <div className="restaurant-list flex flex-wrap justify-center justify-between w-4/5 p-5 bg-black my-5 mx-auto items-center rounded-lg">
                {/* if search query is not found/ found */}
                {
                    (filteredRestaurants?.length === 0) ? <h1>No Restaurant match your Filter</h1> :
                        filteredRestaurants.map((restaurant) => {
                            return (
                                <Link
                                    to={"/restaurant/" + restaurant.data.id}
                                    key={restaurant.data.id}
                                >
                                    <RestaurantCard {...restaurant.data} />
                                </Link>
                            )
                        })
                }
            </div>
        </>
    );
}

export default Body;