import "./styles.css";
import soldIcon from "../../../assets/sold.png";
import notSoldIcon from "../../../assets/not-sold.png";
import { useProductContext } from "../../../ProductContext.jsx";

export default function TableComponent({searchProducts}) {
    const { products } = useProductContext();
    return (
        <div className="dashboard-table">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Sold</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td className="product-title">{product.title}</td>
                                <td className="product-description">{product.description}</td>
                                <td className="product-price">${product.price.toFixed(2)}</td>
                                <td className="product-category">{product.category}</td>
                                <td className="product-sold">{product.sold? <img style={{width: "3rem", height: "3rem"}} src={soldIcon} alt="sold" /> : <img style={{width: "3rem", height: "3rem"}} src={notSoldIcon} alt="not sold" />}</td>
                                <td className="product-image"><img style={{width: "5rem", height: "5rem"}} src={product.image} alt="product" /></td>
                            </tr>
                        ))}
                        {searchProducts != [] ? searchProducts.map((product) => (
                            <tr key={product._id}>
                                <td className="product-title">{product.title}</td>
                                <td className="product-description">{product.description}</td>
                                <td className="product-price">${product.price.toFixed(2)}</td>
                                <td className="product-category">{product.category}</td>
                                <td className="product-sold">{product.sold? <img style={{width: "3rem", height: "3rem"}} src={soldIcon} alt="sold" /> : <img style={{width: "3rem", height: "3rem"}} src={notSoldIcon} alt="not sold" />}</td>
                                <td className="product-image"><img style={{width: "5rem", height: "5rem"}} src={product.image} alt="product" /></td>
                            </tr>
                        )) : <tr>No Result Found</tr>}
                    </tbody>
                </table>
        </div>
    )
}