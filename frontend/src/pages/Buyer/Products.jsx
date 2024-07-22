import  { useEffect, useState } from "react";
import { ProductCard, Header, Loader } from "../../components";
import Pagination from "@mui/material/Pagination";
// import p1 from "../../assets/p1.jpg"
import { useSelector,useDispatch } from "react-redux";
import { getAllProducts } from "../../store/actions/product";
import { useLocation } from "react-router-dom";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Products = () => {
  const query = useQuery();
  const category= query.get("category");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const totalProducts=useSelector(state=>state.products.count)
  const currentProducts=useSelector(state=>state.products.allProducts)
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const paginate = async(e, value) => {
    setCurrentPage(value); 
  };
  const [sortOptions, setSortOptions] = useState({
    price:false,
    rating:false
  })
  const handleSortChange = (option) => {
    setSortOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };
  //filter
  const applyFilter = () => {
    dispatch(getAllProducts(currentPage,"",`originalPrice>=${minPrice},originalPrice<=${maxPrice}`));
  };
  useEffect(() => {
    dispatch(getAllProducts(currentPage,`${sortOptions.price ? "originalPrice":null},${sortOptions.rating ? "ratings":null}`,null,`${category ? category : ""}`));
  }, [sortOptions.price,sortOptions.rating,currentPage,dispatch,category]);
  return !currentProducts ? <Loader/> : (
    <div className="w-full h-screen overflow-y-scroll">
      <div className="w-full min-h-[20%]">
        <Header activeHeading={3}/>
      </div>
      <div className="w-full min-h-[70%] flex flex-col gap-2 mt-2 p-2">
      <div className="w-full flex justify-between items-center gap-4
      ">
        
        <div className="border w-[45%] flex items-center p-3 gap-2 border-gray-300 rounded-md shadow-md">
             <h2 className="w-[15%] flex items-center font-bold">
              Filters : 
            </h2>
            <div className="w-[70%] flex items-center gap-2">
              <div className=" w-[50%] grid grid-cols-8 items-center gap-1">
                <label htmlFor="minprice" className="col-span-4">Min Price</label>
                <input
                  type="number"
                  name="minprice"
                  id="minprice"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="col-span-4 border border-black pl-2 rounded-md"
                />
              </div>
              <div className="w-[50%] grid grid-cols-8 items-center gap-1">
                <label htmlFor="maxprice" className=" col-span-4">Max Price</label>
                <input
                  type="number"
                  name="maxprice"
                  id="maxprice"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className=" col-span-4 border border-black pl-2 rounded-md"
                />
              </div>
            </div>
            <button className="w-[15%] bg-secondary p-1 text-white
             rounded-md hover:bg-primary"
             onClick={applyFilter}
             >
              Apply
            </button>
        </div>
        <div className="border flex items-center gap-2 border-gray-300 p-3 rounded-md shadow-md">
            <h2 className="w-full flex items-center font-bold">
              Sort By : 
            </h2>
            <div className=" flex items-center gap-2">
              <div className="flex items-center gap-2">
                <label htmlFor="price">Price</label>
                <input
                  type="checkbox"
                  name="price"
                  id="price"
                  checked={sortOptions.price}
                  onChange={() => handleSortChange("price")}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <label htmlFor="rating">Rating</label>
                <input
                  type="checkbox"
                  name="rating"
                  id="rating"
                  checked={sortOptions.rating}
                  onChange={() => handleSortChange("rating")}
                  className="cursor-pointer"
                />
              </div>
            </div>
        </div>
        
        </div>
        <div className="w-[100%] h-full p-4 flex flex-wrap gap-8 justify-center">
          {
            currentProducts.map((product)=><ProductCard key={product._id} data={product}/>)
          }
        </div>
      </div>
      <div className=" w-full min-h-[10%] flex items-center justify-center">
      {
        totalProducts > 0 && <Pagination
        count={Math.ceil(totalProducts/9)}
        page={currentPage}
        onChange={paginate}
        color="primary"
        size="large"
        shape="rounded"
        />
      }
      </div>
    </div>
  );
};

export default Products;
