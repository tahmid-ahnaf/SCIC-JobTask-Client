import { Helmet } from "react-helmet-async";
import ProductCard from "../../components/ProductCard/ProductCard";
import { FloatingLabel, Label, Pagination, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Dropdown } from "flowbite-react";
const Home = () => {
  // const { count } = useLoaderData();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [categoryLabel, setCategoryLabel] = useState("All");
  const [brandLabel, setBrandLabel] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [lowToHigh,setLowToHigh] = useState("Newest First");
  const onPageChange = (page) => setCurrentPage(page);



  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://scic-job-task-server-lyart.vercel.app/filteredproducts?productName=${searchKeyword}&category=${category}&brand=${brand}&minPrice=${minPrice}&maxPrice=${maxPrice}&lowToHigh=${lowToHigh}&page=${currentPage}&size=${itemsPerPage}`
        );
        const data = await response.json();
        
        setProducts(data.result);
        const totalProducts = data.totalCount;
        console.log(totalProducts);
        const pages = Math.ceil(totalProducts / itemsPerPage);
        setNumberOfPages(pages);
      } catch (error) {
        console.error("Could not fetch items", error);
      }
    }

    fetchData();
  }, [currentPage,itemsPerPage,searchKeyword, category, brand, maxPrice, minPrice,lowToHigh]);

  useEffect(()=>{
    async function fetchCategories () {
      try{

        const response = await fetch(
          `https://scic-job-task-server-lyart.vercel.app/categories`
        );
        const data = await response.json();
        
        setCategories(data);


      }
      catch (error) {

        console.error("Could not fetch categories", error);

      }
    }

    fetchCategories();
  }, []);

  useEffect(()=>{
    async function fetchBrands () {
      try{

        const response = await fetch(
          `https://scic-job-task-server-lyart.vercel.app/brands`
        );
        const data = await response.json();
        
        setBrands(data);


      }
      catch (error) {

        console.error("Could not fetch brands", error);

      }
    }

    fetchBrands();
  }, []);





  const handleItemsPerPage = (val) =>{
    setItemsPerPage(val);
    setCurrentPage(1);
  }

  const handleSearch = e =>{
    setSearchKeyword(e.target.value);
  }

  const handleMinPrice = e => {
    setMinPrice(e.target.value);
  }

  const handleMaxPrice = e => {
    setMaxPrice(e.target.value);
  }

  return (
    <div className="max-w-[85%] mx-auto">
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-16">
        <div>

        <FloatingLabel value={searchKeyword} onChange={handleSearch} variant="outlined" label="Search By Name" />

        </div>

        <div className="flex gap-4 items-center justify-center">

        <p className="text-xl lg:text-3xl">Choose Category :</p>
          
            <Dropdown label={categoryLabel} dismissOnClick={false}>
            <Dropdown.Item onClick={()=>{setCategory("All");setCategoryLabel("All")}}>All</Dropdown.Item>
            {
            categories.map((category,idx)  => (

              <Dropdown.Item onClick={()=>{setCategory(category);setCategoryLabel(category)}} key={idx}>{category}</Dropdown.Item>
              
            ))
            }
            </Dropdown>
          
        </div>

        <div className="flex gap-4 items-center justify-center">

        <p className="text-xl lg:text-3xl">Choose Brand :</p>
          
            <Dropdown label={brandLabel} dismissOnClick={false}>
            <Dropdown.Item onClick={()=>{setBrand("All");setBrandLabel("All")}}>All</Dropdown.Item>
            {
            brands.map((brand,idx)  => (

              <Dropdown.Item onClick={()=>{setBrand(brand);setBrandLabel(brand)}} key={idx}>{brand}</Dropdown.Item>
              
            ))
            }
            </Dropdown>
          
        </div>

        <div className="flex gap-4 items-center justify-center">

        <p className="text-xl lg:text-3xl">Price Range :</p>

        <div className="flex items-center gap-4">
              <TextInput value={minPrice} onChange={handleMinPrice} type="number" min={0} max={100000} placeholder="Lowest Price" />

              <p>-</p>

              <TextInput value={maxPrice} onChange={handleMaxPrice} type="number" min={0} max={100000} placeholder="Highest Price" />

        </div>




          
            
          
        </div>

        <div className="flex gap-4 items-center justify-center">

        <p className="text-xl lg:text-3xl">Sort By :</p>
          
            <Dropdown label={`${lowToHigh}` } dismissOnClick={false}>
            <Dropdown.Item onClick={()=>{setLowToHigh("Ascending")}}>Price Ascending</Dropdown.Item>
            <Dropdown.Item onClick={()=>{setLowToHigh("Descending")}}>Price Descending</Dropdown.Item>
            <Dropdown.Item onClick={()=>{setLowToHigh("Newest First")}}>Newest First</Dropdown.Item>
            <Dropdown.Item onClick={()=>{setLowToHigh("Oldest First")}}>Oldest First</Dropdown.Item>

            </Dropdown>
          
        </div>


      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-8">

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
