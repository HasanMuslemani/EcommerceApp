import React, {useState, useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams, useNavigate } from 'react-router-dom';

const Product = () => {

    const {id} = useParams();
    const [data, setData] = useState({ data: {} });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(`https://muslemah.myweb.cs.uwindsor.ca/comp3340/ecommerce_api/public/api/products/${id}`);
            setData(await response.json());
            setLoading(false);
        }
        getProduct();
    }, []);

    const Loading = () => {
        return(
            <>
                <div className="col-md-6">
                    <Skeleton height={400}/>
                </div>
                <div className="col-md-6">
                    <Skeleton height={50} width={300}/>
                    <Skeleton height={75}/>
                    <Skeleton height={50}/>
                    <Skeleton height={150}/>
                    <Skeleton height={50} width={100}/>
                </div>
            </>
        )
    }

    const ShowProduct = () => {
        let product = data.data;
        return(
            <>
                <div className="col-md-6">
                    <img src={product.img_url} alt={product.title} height="400px" width="400px" />
                </div>
                <div className="col-md-6">
                    <h4 className="text-uppercase text-black-50">
                        {product.category}
                    </h4>
                    <h1 className="display-5">{product.name}</h1>
                    <h3 className="display-6 fw-bold my-4">${product.price}</h3>
                    <p className="lead">{product.description}</p>
                    <button className="btn btn-outline-dark" onClick={() => {addToCart()}}>Add to Cart</button>
                </div>
            </>
        )
    }

    const addToCart = async () => {
        let cartItemObject = {product_id: data.data.id, quantity: 1};
        console.log(cartItemObject);
        let response = await fetch("https://muslemah.myweb.cs.uwindsor.ca/comp3340/ecommerce_api/public/api/cart/addItem", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(cartItemObject)
        });
        navigate('/cart');
    }

    return (
        <div>
            <div className="container py-5">
                <div className="row py-4">
                    {loading ? <Loading/> : <ShowProduct/>}
                </div>
            </div>
        </div>
    );
}

export default Product;
