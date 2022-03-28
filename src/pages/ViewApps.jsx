import React, { useEffect } from 'react'
import UserContext from "../context/UserContext";
import {useContext,useState,useRef} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import Navbar from '../components/Navbar';
import {Helmet} from "react-helmet";

import uber from "../static/img/uber.png";
import twitch from "../static/img/twitch.jpg"
import zeeshan from "../static/img/zeeshan.jpg"
import minecraft from "../static/img/minecraft.png"
import instagram from "../static/img/instagram.jpg"
import disney from "../static/img/disney.jpg"
import netflix from "../static/img/photo-2.jpg"
import discord from "../static/img/discord.jpg"
import amazon from "../static/img/photo-4.jpg"
import firefox from "../static/img/firefox.jpg"
import youtube from "../static/img/photo-9.jpg"
import slack from "../static/img/photo-6.jpg"
import snapchat from "../static/img/photo-7.jpg"

function ViewApps() {
    useEffect(()=>{
    let reloads = sessionStorage.getItem('reloads');
    let isMounted = true
    if(reloads >= 1) {
        sessionStorage.removeItem('reloads');

    } else {
    window.location.reload();
    sessionStorage.setItem('reloads', (++reloads).toString());


    }},[])
    let [firefoximg,setf] = useState("https://techcrunch.com/wp-content/uploads/2018/07/logo-2.png?w=300")
    const navigate = useNavigate()


    if(localStorage.getItem("username") === null){
        return <><Navbar/> <div>You arent logged in</div> </>
    }
  return (
      <>

      <Navbar></Navbar>
    <div id="side-nav" className="sidenav">



</div>	<div className="jumbotron jumbotron-single d-flex align-items-center" >
  <div className="container text-center">
    <h1 className="display-2 mb-4">Analytics</h1>
  </div>
</div>


<section id="portfolio" className="bg-white">
    <div className="container">
        <div className="section-content">

            <div className="title-wrap">
                <h2 className="section-title"> CHOOSE AN <b>APP</b> FOR ANALYTICS</h2>
                <p className="section-sub-title">Use the filters below to sort the apps of your liking</p>
            </div>

            <div className="row">

                <div className="col-md-12 portfolio-holder mt-3">

                    <div className="filter-button-group btn-filter d-flex justify-content-center">
                        <a tabIndex="0" className="is-checked" data-filter="*">Show All</a>
                        <a tabIndex="0" data-filter=".minimalism">Streaming</a>
                        <a tabIndex="0" data-filter=".vintage">Social Media</a>
                        <a tabIndex="0" data-filter=".creative">Store</a>
                        <a tabIndex="0" data-filter=".other">Other</a>
                    </div>

                    <div className="grid-portfolio">
                        <div className="grid-sizer"></div>
                        <div className="gutter-sizer"></div>

                        <div className="grid-item other" data-aos="fade-up">
                            <div className="grid-item-wrapper">
                                <img src="https://d3i4yxtzktqr9n.cloudfront.net/uber-sites/f452c7aefd72a6f52b36705c8015464e.jpg" alt="portfolio-img" className="portfolio-item"/>
                                <div className="grid-info">
                                    <div className="grid-link d-flex justify-content-center">
                                    <Link className="ext-link" to = "/devResult?company=Uber">
                                            <span className="lnr lnr-link"></span>
                                        </Link>

                                    </div>
                                    <div className="grid-title">
                                        <h4>UBER</h4>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="grid-item vintage" data-aos="fade-up">
                            <div className="grid-item-wrapper">
                                <img src="https://www.howtogeek.com/wp-content/uploads/2019/06/slack_logo.png?width=1198&trim=1,1&bg-color=000&pad=1,1"alt="portfolio-img" className="portfolio-item"/>
                                <div className="grid-info">
                                    <div className="grid-link d-flex justify-content-center">

                                        <Link to = "/devResult?company=slack">
                                            <span className="lnr lnr-link"></span>
                                        </Link>
                                    </div>
                                    <div className="grid-title">
                                        <h4>SLACK</h4>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="grid-item minimalism grid-item-height" data-aos="fade-up">
                            <div className="grid-item-wrapper">
                                <img src="data:image/png;base64,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" alt="portfolio-img" className="portfolio-item"/>
                                <div className="grid-info">
                                    <div className="grid-link d-flex justify-content-center">
                                        <Link className="img-pop" to = "/devResult?company=Netflix">
                                            <span className="lnr lnr-move"></span>
                                        </Link>

                                    </div>
                                    <div className="grid-title">
                                        <h4>NETFLIX</h4>
                                    </div>
                                </div>

                            </div>
                        </div>

                         <div className="grid-item minimalism" data-aos="fade-up">
                            <div className="grid-item-wrapper">
                                <img src="https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg" alt="portfolio-img" className="portfolio-item"/>
                                <div className="grid-info">
                                    <div className="grid-link d-flex justify-content-center">

                                        <Link className="ext-link" to = "/devResult?company=Twitch">
                                            <span className="lnr lnr-link"></span>
                                        </Link>
                                    </div>
                                    <div className="grid-title">
                                        <h4>TWITCH</h4>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="grid-item creative" data-aos="fade-up">
                            <div className="grid-item-wrapper">
                                <img src="https://images-na.ssl-images-amazon.com/images/G/15/gc/designs/livepreview/amazon_dkblue_noto_email_v2016_ca-main._CB468775011_.png" alt="portfolio-img" className="portfolio-item"/>
                                <div className="grid-info">
                                    <div className="grid-link d-flex justify-content-center">

                                        <Link className="ext-link" to = "/devResult?company=Amazon">
                                            <span className="lnr lnr-link"></span>
                                        </Link>
                                    </div>
                                    <div className="grid-title">
                                        <h4>AMAZON</h4>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="grid-item minimalism" data-aos="fade-up">
                            <div className="grid-item-wrapper">
                                <img src="https://variety.com/wp-content/uploads/2020/06/youtube-logo.png?w=999" alt="portfolio-img" className="portfolio-item"/>
                                <div className="grid-info">
                                    <div className="grid-link d-flex justify-content-center">

                                        <Link to = "/devResult?company=Youtube">
                                            <span className="lnr lnr-link"></span>
                                        </Link>
                                    </div>
                                    <div className="grid-title">
                                        <h4>YOUTUBE</h4>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="grid-item other" data-aos="fade-up">
                            <div className="grid-item-wrapper">
                                <img src="data:image/jpeg;base64,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 "alt="portfolio-img" className="portfolio-item"/>
                                <div className="grid-info">
                                    <div className="grid-link d-flex justify-content-center">

                                        <Link className="ext-link" to = "/devResult?company=Minecraft">
                                            <span className="lnr lnr-link"></span>
                                        </Link>
                                    </div>
                                    <div className="grid-title">
                                        <h4>MINECRAFT</h4>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="grid-item minimalism" data-aos="fade-up">
                            <div className="grid-item-wrapper">
                                <img src="https://reviewed-com-res.cloudinary.com/image/fetch/s--OCGmezmg--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_972/https://reviewed-production.s3.amazonaws.com/1590656678455/Amazon_Prime_Video_tips_1.jpg" alt="portfolio-img" className="portfolio-item"/>
                                <div className="grid-info">
                                    <div className="grid-link d-flex justify-content-center">

                                        <Link className="ext-link" to = "/devResult?company=Prime Video" target="_blank">
                                            <span className="lnr lnr-link"></span>
                                        </Link>
                                    </div>
                                    <div className="grid-title">
                                        <h4>PRIME VIDEO</h4>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="grid-item other" data-aos="fade-up">
                            <div className="grid-item-wrapper">
                                <img src= "https://techcrunch.com/wp-content/uploads/2018/07/logo-2.png?w=300" alt="portfolio-img" className="portfolio-item"/>
                                <div className="grid-info">
                                    <div className="grid-link d-flex justify-content-center">

                                        <Link className="ext-link" to = "/devResult?company=Firefox">
                                            <span className="lnr lnr-link"></span>
                                        </Link>
                                    </div>
                                    <div className="grid-title">
                                        <h4>FIREFOX</h4>
                                    </div>
                                </div>

                            </div>
                        </div>
                       =
                        <div className="grid-item vintage" data-aos="fade-up">
                            <div className="grid-item-wrapper">
                                <img src="https://i.pinimg.com/originals/4e/95/26/4e95267bcf1cc4ce078755e85e388add.jpg" alt="portfolio-img" className="portfolio-item"/>
                                <div className="grid-info">
                                    <div className="grid-link d-flex justify-content-center">

                                        <Link className="ext-link" to="/devResult?company=Snapchat" >
                                            <span className="lnr lnr-link"></span>
                                        </Link>
                                    </div>
                                    <div className="grid-title">
                                        <h4>SNAPCHAT</h4>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="grid-item minimalism" data-aos="fade-up">
                            <div className="grid-item-wrapper">
                                <img src="data:image/png;base64,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" alt="portfolio-img" className="portfolio-item"/>
                                <div className="grid-info">
                                    <div className="grid-link d-flex justify-content-center">
                                    <Link className="ext-link" to="/devResult?company=Disney" >
                                            <span className="lnr lnr-link"></span>
                                        </Link>
                                    </div>
                                    <div className="grid-title">
                                        <h4>DISNEY+</h4>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="grid-item vintage" data-aos="fade-up">
                            <div className="grid-item-wrapper">
                                <img src="https://www.videogameschronicle.com/files/2021/05/discord-new-logo.jpg" alt="portfolio-img" className="portfolio-item"/>
                                <div className="grid-info">
                                    <div className="grid-link d-flex justify-content-center">
                                    <Link className="ext-link" to="/devResult?company=Discord" target="_blank">
                                            <span className="lnr lnr-link"></span>
                                        </Link>
                                    </div>
                                    <div className="grid-title">
                                        <h4>DISCORD</h4>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>
</section>



<section id="cta" className="bg-fixed overlay">
    <div className="container">
        <div className="section-content" data-aos="fade-up">
            <div className="row">
                <div className="col-md-12 text-center">

                    <a className="btn btn-outline-primary btn-lg" href="home">HOME</a>
                </div>
            </div>
        </div>
    </div>
</section>


<footer className="mastfoot my-3">
    <div className="inner container">
         <div className="row">
         	<div className="col-lg-4 col-md-12 d-flex align-items-center">

         	</div>
         	<div className="col-lg-4 col-md-12 d-flex align-items-center">
         		<p className="mx-auto text-center mb-0">Group 18- SENG 401</p>
         	</div>

            <div className="col-lg-4 col-md-12">
            	<nav className="nav nav-mastfoot justify-content-center">
	                <a className="nav-link" href="#">
	                	<i className="fab fa-facebook-f"></i>
	                </a>
	                <a className="nav-link" href="#">
	                	<i className="fab fa-twitter"></i>
	                </a>
	                <a className="nav-link" href="#">
	                	<i className="fab fa-instagram"></i>
	                </a>
	                <a className="nav-link" href="#">
	                	<i className="fab fa-linkedin"></i>
	                </a>
	                <a className="nav-link" href="#">
	                	<i className="fab fa-youtube"></i>
	                </a>
	            </nav>
            </div>

        </div>
    </div>
    </footer>
    </>
  )
}

export default ViewApps
