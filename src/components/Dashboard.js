import React, { Component } from "react";
import { Col, Modal, Container, Button, Dropdown } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Egrants from "./../scholarships/Egrants";
import Fisheries from "./../scholarships/Fisheries";
import CentralSector from "./../scholarships/CentralSector";
import MeritCumMeans from "./../scholarships/MeritCumMeans";
import PostMatric from "./../scholarships/PostMatric";
import Koya from "./../scholarships/Koya";
import Pragati from "./../scholarships/Pragati";
import { schinderDecode } from "./../services/jwt";
import auth from "../services/auth.service";
import { viewPending } from "./../services/scholarshipService";
import { toast } from "react-toastify";
import ApplyModal from "./ApplyModal";
class Dashboard extends Component {
    state = {
        list: [
            { id: 1, banner: "/illustration-1.jpg", content: "Egrants" },
            { id: 2, banner: "/illustration-1.jpg", content: "FISHERIES EGRANTS SCHOLARSHIPS" },
            { id: 3, banner: "/illustration-1.jpg", content: "Central Sector Scholarship" },
            { id: 4, banner: "/illustration-1.jpg", content: "Merit Cum Means Scholarship" },
            { id: 5, banner: "/illustration-1.jpg", content: "Post Matric Scholarship" },
            { id: 6, banner: "/illustration-1.jpg", content: "CH Muhammed Koya Scholarship" },
            { id: 7, banner: "/illustration-1.jpg", content: "Pragati Scholarship" }
        ],
        show: false,
        scholarships: [],
        details: ""
    };
    handleCard = (item) => {
        const { show } = this.state;
        this.setState({ details: item });
        this.setState({ show: !show });
    };
    handleModal = () => {
        const { show } = this.state;
        this.setState({ show: !show });
    };
    handleApplication = (appId) => {
        console.log(appId);
    };
    componentDidMount() {
        schinderDecode();
        this.loadScholarships();
    }
    loadScholarships = async () => {
        try {
            const response = await viewPending();
            if (response.status === 200) {
                this.setState({ isProcessing: false });
                const data = response.data.data;
                this.setState({ scholarships: data.scholarship });
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message);
            }
        }
    };
    handleLogOut = () => {
        auth.logout();
    };

    render() {
        const { list, show, scholarships } = this.state;
        return (
            <Col>
                <div className="user-header">
                    <div>
                        <h3>Dashboard</h3>
                        <div className="greetings">
                            <p>Hello User,</p>
                            <span>New Scholarships have been added to the list. Start browsing.</span>
                        </div>
                    </div>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Settings
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.handleLogOut} href="/">
                                Log Out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div>
                    <img src="/illustration-1.jpg" style={{ width: "100%", borderRadius: 12 }} />
                </div>
                <div className="suggested">
                    <h3>Suggested scholorships for you </h3>
                    {scholarships && (
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
                            {scholarships.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <div className="card pointer" onClick={() => this.handleCard(item)}>
                                        <div className="card-body scholarship-banner">
                                            <img src="/illustration-1.jpg" style={{ width: "100%" }} />
                                        </div>
                                        <div className="card-footer scholarship-content">
                                            <p style={{ fontWeight: 600 }}>{item.title}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                            {scholarships.length < 1 && (
                                <>
                                    <h2>Sorry, Currently There Are No Eligible Scholarships.</h2>
                                    <div style={{ width: 500, margin: "0 auto" }}>
                                        <img src="/empty.jpg" style={{ width: "100%" }} />
                                    </div>
                                </>
                            )}
                        </Swiper>
                    )}
                </div>
                <div>
                    <ApplyModal details={this.state.details} onHide={this.handleModal} show={this.state.show} />
                </div>
            </Col>
        );
    }
}

export default Dashboard;
