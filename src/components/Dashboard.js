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
        type: ""
    };
    handleCard = (type) => {
        const { show } = this.state;
        this.setState({ show: !show, type: type });
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
    }
    handleLogOut = () => {
        auth.logout();
    };

    render() {
        const { list, show, type } = this.state;
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
                            <Dropdown.Item onClick={this.handleAdminSignup}>Add Admin</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleScholarshipModal}>Create Scholarship</Dropdown.Item>
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
                                <div className="card pointer" onClick={() => this.handleCard(item.id)}>
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
                <div>
                    <Modal show={show} onHide={this.handleModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Container>
                            {type === 1 && <Egrants />}
                            {type === 2 && <Fisheries />}
                            {type === 3 && <CentralSector />}
                            {type === 4 && <MeritCumMeans />}
                            {type === 5 && <PostMatric />}
                            {type === 6 && <Koya />}
                            {type === 7 && <Pragati />}
                        </Container>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => this.handleApplication(type)}>
                                Apply
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Col>
        );
    }
}

export default Dashboard;
