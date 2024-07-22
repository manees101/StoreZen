import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Header, Loader, ProductCard } from "../../components";
import styles from "../../styles/styles";
import axios from "axios";
import { server } from "../../server";
import { Pagination } from "@mui/material";

const BestSelling = () => {
  const [data, setData] = useState(null);
  const [totalProducts, setTotalProducts] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = async (e, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    axios.get(`${server}/product?page=${currentPage}`).then((res) => {
      setData(res.data.products);
      setTotalProducts(res.data.count);
    }).catch((err)=>console.log(err));
  }, [currentPage]);

  return (
    <>
      {!data ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={2} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <h1 className=" font-bold text-[25px] mb-4">Best Selling Products</h1>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
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
      )}
    </>
  );
};

export default BestSelling;
