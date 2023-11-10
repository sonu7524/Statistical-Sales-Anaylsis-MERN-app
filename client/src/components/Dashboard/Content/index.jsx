import React, { useState, useEffect } from "react";
import ButtonComponent from "../../common/Button";
import Loader from "../../common/Loader";
import "./styles.css";
import { useProductContext } from "../../../ProductContext";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { searchProd } from "../../../functions/searchProd";
import { getProdByMonth } from "../../../functions/getProdByMonth";
import { getAllProd } from "../../../functions/getAllProd";
import DropDownComponent from "../../common/DropDown";
import TabComponent from "../Tabs";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const pageArray = [5,6,7,8,9, 10]
export default function Dashboard() {  

    const { products, setProducts } = useProductContext();
    let [searchInput, setSearchInput] = useState("");
    let [searchProducts , setSearchProducts] = useState([]);
    let [selectedMonth, setSelectedMonth] = useState("All");
    let [pageNo, setPageNo] = useState(1);
    let [limit, setLimit] = useState(10);
    let [isStatistical, setIsStatistical] = useState(false);


    useEffect(() => {
        getData();
    }, [selectedMonth, pageNo, limit]);

    const getData = async () => {
        if(selectedMonth === "All"){
            const response = await searchProd(searchInput,pageNo,limit);
            setProducts(response);
        }
        else{
            const response = await getProdByMonth(selectedMonth);
            setProducts(response);
        }
    }
    const handleSearch = async () => {
        const response = await searchProd(searchInput,pageNo,limit);
        setSearchProducts(response);
        setProducts([]);
        console.log(searchProducts);
    }
    return (
        <div className="dashboard">
            <div className="dashboard-filter">
                <div className="search-bar">
                    <SearchRoundedIcon className="search-icon" />
                    <div className="search">
                        <input onChange={(e) => setSearchInput(e.target.value)} value={searchInput} type="text" />
                        <div onClick={handleSearch}><ButtonComponent text="Search" bgColor={"black"} /></div>
                    </div>
                </div>
                <div className="filter">
                    <DropDownComponent title={"Page"} pageArray={pageArray} selectedValue={limit} setSelectedValue={setLimit} />
                    <DropDownComponent title="Month" months={months} selectedValue={selectedMonth} setSelectedValue={setSelectedMonth} />
                </div>
            </div>
            <TabComponent selectedMonth={selectedMonth} setIsStatistical={setIsStatistical} searchProducts={searchProducts} />
            {isStatistical === false && (
                <div className="pagination">
                    <p>Page: {pageNo}</p>
                    <div className="pagination-btn">
                        <div onClick={() => setPageNo(pageNo - 1)}>
                            {pageNo > 1 && <ButtonComponent text="Prev" bgColor={"black"} />}
                        </div>
                        <div onClick={() => setPageNo(pageNo + 1)}>
                            {products.length === limit && <ButtonComponent text="Next" bgColor={"black"} />}
                        </div>
                    </div>
                    <p>Per page: {limit}</p>
                </div>
            )}
        </div>
    )
}