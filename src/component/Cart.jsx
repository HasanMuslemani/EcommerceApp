import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const Cart = () => {

    const [data, setData] = useState({ data: [] });
    const [loading, setLoading] = useState(false);
    const [disableButtons, setDisableButtons] = useState(false);
    const navigate = useNavigate();
    let componentMounted = true;

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/login");
            return;
        }
        const getCartItems = async () => {
            setLoading(true);
            const response = await fetch(`https://muslemah.myweb.cs.uwindsor.ca/comp3340/ecommerce_api/public/api/cart/cartItems`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
            });
            if (componentMounted) {
                setData(await response.clone().json());
                setLoading(false);
            }

            return () => {
                componentMounted = false;
            }
        }

        getCartItems();
    }, []);

    const cartItems = (cartItem) => {
        return (
            <div className="px-4 my-5 bg-light rounded-3" key={cartItem.id}>
                <div className="container py-4">
                    <button className="btn-close float-end" aria-label="Close" onClick={() => { deleteCartItem(cartItem); }}></button>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <img className="" src={cartItem.product.img_url} alt={cartItem.product.name} height="200px" />
                        </div>
                        <div className="col-md-4">
                            <h3>{cartItem.product.name}</h3>
                            <p className="lead fw-bold">${cartItem.product.price}</p>
                            <div className="container d-flex align-items-center">
                                <button className="btn btn-primary" onClick={() => {
                                    changeQuantity(false, cartItem);
                                }} disabled={disableButtons || cartItem.quantity == 1} >-</button>
                                <div className="p mx-md-4 mx-2">{cartItem.quantity}</div>
                                <button className="btn btn-primary" onClick={() => {
                                    changeQuantity(true, cartItem);
                                }} disabled={disableButtons || cartItem.quantity == 9} >+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    const deleteCartItem = async (cartItem) => {
        let newData = { data: [] };
        newData.data = data.data.filter(item => cartItem.id != item.id);
        setData(newData);

        await fetch(`https://muslemah.myweb.cs.uwindsor.ca/comp3340/ecommerce_api/public/api/cartItem/${cartItem.id}`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        });
    }

    const changeQuantity = async (increment, cartItem) => {
        setDisableButtons(true);
        if ((!increment && cartItem.quantity == 1) || (increment && cartItem.quantity == 9)) {
            return;
        }
        increment ? cartItem.quantity++ : cartItem.quantity--;
        let cartItemObject = { product_id: cartItem.product.id, quantity: cartItem.quantity };
        let response = await fetch(`https://muslemah.myweb.cs.uwindsor.ca/comp3340/ecommerce_api/public/api/cartItem/${cartItem.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(cartItemObject)
        });
        if (response.status >= 200 && response.status <= 299) {
            let newData = { data: [] };
            newData.data = [...data.data];
            setData(newData);
            setDisableButtons(false);
        }
    }

    const showCart = () => {
        return(
            <>
                {data.data.map(cartItems)}
                <div className="d-flex justify-content-center">
                    <button className="btn btn-outline-primary mb-5 px-5" onClick={() => {
                        navigate("/checkout", {state: data});
                    }}>Proceed to checkout</button>
                </div>
            </>
        )
    }

    const showLoading = () => {
        return(
            <>
                <div className="px-4 my-5 bg-light rounded-3">
                    <div className="container py-4">
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <Skeleton height={200} width={150}/>
                            </div>
                            <div className="col-md-4">
                                <Skeleton height={50}/>
                                <Skeleton height={25}/>
                                <div className="container d-flex align-items-center">
                                    <Skeleton height={40} width={30}/>
                                    <Skeleton className="mx-md-4 mx-2" height={25} width={25}/>
                                    <Skeleton height={40} width={30}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {loading ? showLoading() : showCart()}
        </>
    );
}

export default Cart;
