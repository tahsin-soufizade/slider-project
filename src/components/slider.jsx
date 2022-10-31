import data from "./data";
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useState } from "react";
import '../scss/slider.scss';
import { useEffect } from "react";

const Slider = () => {
    const [people, setPeople] = useState(data);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const lastIndex = people.length - 1;

        if (index < 0) {
            setIndex(lastIndex);
        }

        if (index > lastIndex) {
            setIndex(0);
        }
    }, [index, people]);

    // CHANGE USER INFO EVERY 3 SECONDS
    useEffect(() => {
        let sliderInterval = setInterval(() => {
            setIndex(index + 1)
        }, 3000);

        // CLEAR INTERVAL
        return () => clearInterval(sliderInterval);

    }, [index])

    return (
        <div className="slider-outer-container">
            <div className="container">
                <div className="row">
                    <div className="col-9 mx-auto">
                        <div className="slider-container">
                            {data.length > 0 && data.map((person, personIndex) => {
                                const { id, name, image, occupation, text } = person;

                                let position = 'next-slide';

                                if (personIndex === index) {
                                    position = 'active-slide';
                                }

                                if (personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)) {
                                    position = 'last-slide';
                                }

                                return (
                                    <article key={id} className={`slider-item ${position}`}>
                                        <img src={image} alt={name} className='slider-img' />
                                        <h4 className="slider-name">{name}</h4>
                                        <p className="slider-occupation">{occupation}</p>
                                        <p className="slider-text">{text}</p>
                                    </article>
                                )
                            })}

                            <button className="slider-btn prev-btn" onClick={() => setIndex(index - 1)}>
                                <FaChevronLeft />
                            </button>

                            <button className="slider-btn next-btn" onClick={() => setIndex(index + 1)}>
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default Slider;