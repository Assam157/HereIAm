import React,
{
    useContext,
    useEffect,
    useState
} from 'react';
import ProductItem from './ProductItem';
import { useItemContext } from '../context/ItemContext';
 


const ProductList = () => {
    const { items } = useItemContext(); // Use the hook to access context values
    // Keep a local state for sorted products
    const [sortedProducts, setSortedProducts] =
        useState([...items]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(3000);
    // 'all' represents no type filter
    const [selectedType, setSelectedType] = useState('all');

    useEffect(() => {
        setSortedProducts([...items])
    }, [items])

    const handleSortByPrice = () => {
        const sorted = [...sortedProducts]
            .sort((a, b) => a.price - b.price);
        setSortedProducts(sorted);
    };

    const handleFilterByPriceRange = () => {
        const filtered =
            items.filter(
                (product) =>
                    product.price >= minPrice &&
                    product.price <= maxPrice);
        setSortedProducts(filtered);
    };

    const handleFilterByType = () => {
        if (selectedType === 'all') {
            // Reset the type filter
            setSortedProducts([...items]);
        } else {
            const filtered =
                items.filter(
                    (product) =>
                        product.type === selectedType);
            setSortedProducts(filtered);
        }
    };
    const handleBuyNow = () => {
        const selectedItems = sortedProducts;
        console.log('Items to buy:', selectedItems);
        // Implement your purchasing logic here
    };

    return (
        <div className='prdt-list'>
            <h2>Product List</h2>
            <div className='filter-btn'>
                <button onClick={handleSortByPrice}>
                    Sort by Price
                </button>
                <label>
                    Min Price:
                    <input type='number' value={minPrice}
                        onChange={
                            (e) =>
                                setMinPrice(Number(e.target.value))
                        } />
                </label>
                <label>
                    Max Price:
                    <input type='number' value={maxPrice}
                        onChange={
                            (e) =>
                                setMaxPrice(Number(e.target.value))
                        } />
                </label>
                <button onClick={() => handleFilterByPriceRange()}>
                    Filter by Price Range
                </button>
                <label>
                    Filter by Type:
                    <select value={selectedType}
                        onChange={
                            (e) =>
                                setSelectedType(e.target.value)
                        }>
                        <option value='all'>
                            All
                        </option>
                        <option value='Aloo'>Aloo</option>
                        <option value='Pawaz'>Pawaz</option>
                    </select>
                </label>

                <button onClick={handleFilterByType}>
                    Filter by Type
                </button>
            </div>

            <ul className='item-card'>
                {sortedProducts.map((product) => (
                    <ProductItem key={product._id}
                        product={product} />
                ))}
            </ul>
            <div className='buy-now-btn'>
                <button type="submit" class="buy-now-btn" onClick={handleBuyNow}> Buy Now
                </button></div>
        </div>
    );
};

export default ProductList;