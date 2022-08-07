import React, {useState, useEffect} from 'react';

const About = () => {

    const [temp, setTemp] = useState(0);
    let componentMounted = true;

    useEffect(() => {
        const getWeather = async () => {

            const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=42.317432&lon=-83.026772&units=metric&appid=68864bbef324b02b24e9d4d34c550782");
            const data = await response.json();
            setTemp(Math.round(data.main.temp));
            return () => {
                componentMounted = false;
            };
        }
        getWeather();
    }, []);

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
                            <p className="lead">The weather at DudeMarket's location (Windsor, ON) is {temp}&#8451;</p>
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
