import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './verCarousel.scss';
import Img1 from '../../assets/images/baotangdongthap.jpg';
import Img2 from '../../assets/images/dulichphuongnam.jpg';
import Img3 from '../../assets/images/damsenthap10.jpg';

class VerticalCarousel extends React.Component {
    state = {
        index: 0
    };

    handleSelect = (index) => {
        this.setState({ index });
    }

    render() {
        return (
            <div className="verCarousel">
                <Carousel activeIndex={this.state.index} onSelect={this.handleSelect}>
                    <Carousel.Item>
                        <img src={Img1} alt='Bao-tang-Dong-Thap' className="d-block w-100 h-200" />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={Img2} alt='Chua-kien-An-Cung' className="d-block w-100 h-200" />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={Img3} alt='Dam-sen-Thap-Muoi' className="d-block w-100 h-200" />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

export default VerticalCarousel;
