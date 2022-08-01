import React from 'react';

const About = () => {


    return (
        <>
            <div>
                <div className="container py-5">
                    <div className="row py-4">
                        <div className="col-md-6">
                            <h1 className="display-5">Welcome to DudeMarket</h1>
                            <p className="lead">We aim to offer our customers a variety of the latest electronics. We’ve come a long way, so we know exactly which direction to take when supplying you with high quality yet budget-friendly products. We offer all of this while providing excellent customer service and friendly support.</p>
                            <p className="lead">We always keep an eye on the latest trends in electronics and put our customers’ wishes first. That is why we have satisfied customers all over the country, and are thrilled to be a part of the electronics industry.</p>
                            <p className="lead">The interests of our customers are always top priority for us, so we hope you will enjoy our products as much as we enjoy making them available to you.</p>
                        </div>
                        <div className="col-md-6">
                            <img src="./assets/phones.jpg" className="img-fluid" alt="Phones" height="600px" width="600px" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
