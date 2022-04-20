import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
class Dashboard extends Component {
    state = {
        list: [
            { id: 1, banner: "/illustration-1.jpg", content: "Community Scholarship " },
            { id: 2, banner: "/illustration-1.jpg", content: "Income Scholarship" },
            { id: 3, banner: "/illustration-1.jpg", content: "AICTE Scholarship " },
            { id: 4, banner: "/illustration-1.jpg", content: "Merit Cum Means Scholarship" },
            { id: 5, banner: "/illustration-1.jpg", content: "Central Sector Scholarship " },
            { id: 6, banner: "/illustration-1.jpg", content: "Post Matric Scholarship " },
            { id: 7, banner: "/illustration-1.jpg", content: "Muslim Girl's Scholarship" },
            { id: 8, banner: "/illustration-1.jpg", content: "Fisheries Egrants Scholarship" },
            { id: 9, banner: "/illustration-1.jpg", content: "Scholarship 9" },
            { id: 10, banner: "/illustration-1.jpg", content: "Scholarship 10" },
            { id: 11, banner: "/illustration-1.jpg", content: "Scholarship 11" },
            { id: 12, banner: "/illustration-1.jpg", content: "Scholarship 12" },
            { id: 13, banner: "/illustration-1.jpg", content: "Scholarship 13" }
        ]
    };
    render() {
        const { list } = this.state;
        return (
            <Col>
                <div className="header">
                    <h3>Dashboard</h3>
                    <div className="greetings">
                        <p>Hello User,</p>
                        <span>New Scholarships have been added to the list. Start browsing.</span>
                    </div>
                </div>
                <div>
                    <img src="/illustration-1.jpg" style={{ width: "100%", borderRadius: 12 }} />
                </div>
                <div className="suggested">
                    <h3>Suggested scholorships for you </h3>
                    <Swiper
                        className="slider"
                        navigation={true}
                        modules={[Navigation, Mousewheel]}
                        spaceBetween={10}
                        autoplay={{ delay: 1500 }}
                        speed={1000}
                        slidesPerView={4}
                        direction={"horizontal"}
                    >
                        {list.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="card">
                                    <div className="card-body scholarship-banner">
                                        <img src={item.banner} style={{ width: "100%" }} />
                                    </div>
                                    <div className="card-footer scholarship-content">
                                        <p>{item.content}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </Col>
        );
    }
}

export default Dashboard;
