import React from 'react';
import "./Cards.css";
import CardItem from "./CardItem";

function Cards() {
    return (
        <div className='cards'>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItem
                            src='/Images/Porsche.jpg'
                            text='Elevate your drive with the ultimate luxury vehicles at your fingertips'
                            label='Premium Drive'
                            path='/'
                        />
                        <CardItem
                            src='/Images/lamborghini.png'
                            text='Step into the world of high performance and rent your dream sports car today'
                            label='Exotic Thrills'
                            path='/'
                        />
                    </ul>
                    <ul className='cards__items'>
                        <CardItem
                            src='/Images/BMW.png'
                            text='Indulge in sophistication with our selection of elegant and powerful vehicles'
                            label='Sophisticated Style'
                            path='/'
                        />
                        <CardItem
                            src='/Images/ferrari.png'
                            text='Rent a touch of class with our exclusive line of Italian sports cars'
                            label='Sporty Elegance'
                            path='/'
                        />
                        <CardItem
                            src='/Images/CarsLight.png'
                            text='Drive the future with our range of innovative and technologically advanced vehicles'
                            label='Modern Tech'
                            path='/login'
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cards;
