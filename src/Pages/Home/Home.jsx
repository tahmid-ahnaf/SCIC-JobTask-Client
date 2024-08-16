import { Helmet } from "react-helmet-async";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useLoaderData } from "react-router-dom";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { Dropdown } from "flowbite-react";
const Home = () => {
  const { count } = useLoaderData();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);

  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:5000/paginatedproducts?page=${currentPage}&size=${itemsPerPage}`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Could not fetch items", error);
      }
    }

    fetchData();
  }, [currentPage,itemsPerPage]);

  const handleItemsPerPage = (val) =>{
    setItemsPerPage(val);
    setCurrentPage(1);
  }

  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <h2>Home Page</h2>

      <div className="grid grid-cols-3 gap-8">

      {
        products.map((product)=>(

          
          <ProductCard key={product._id} item = {product}></ProductCard>

          

        ))
      }

      </div>
      
      

      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={numberOfPages}
          onPageChange={onPageChange}
          showIcons
        />

        <Dropdown label="Select Items Per Page" >
          <Dropdown.Item onClick={() => handleItemsPerPage(5)}>
            5
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPage(10)}>
            10
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPage(15)}>
            15
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPage(20)}>
            20
          </Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
};

export default Home;
