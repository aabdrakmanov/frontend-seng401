import React, { useEffect } from "react";
import UserContext from "../context/UserContext";
import { useContext, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import AppSearchItem from "../components/AppSearchItem";
import uber from "../static/img/uber.png";
import twitch from "../static/img/twitch.jpg";
import zeeshan from "../static/img/zeeshan.jpg";
import minecraft from "../static/img/minecraft.png";
import instagram from "../static/img/instagram.jpg";
import disney from "../static/img/disney.jpg";
import netflix from "../static/img/photo-2.jpg";
import discord from "../static/img/discord.jpg";
import amazon from "../static/img/photo-4.jpg";
import firefox from "../static/img/firefox.jpg";
import youtube from "../static/img/photo-9.jpg";
import slack from "../static/img/photo-6.jpg";
import snapchat from "../static/img/photo-7.jpg";

function ViewApps() {
  
  let [firefoximg, setf] = useState(
    "https://techcrunch.com/wp-content/uploads/2018/07/logo-2.png?w=300"
  );
  const [option,setOption] = useState("all")
  const navigate = useNavigate();
  const [apps,useApps] = useState([
      {
          name: "uber",
          img: "../static/img/uber.png",
          category: ["other"]
      },
      {
          name: "slack",
          img: "https://www.howtogeek.com/wp-content/uploads/2019/06/slack_logo.png?width=1198&trim=1,1&bg-color=000&pad=1,1",
          category: ["other"]
      },
      {
          name: "twitch",
          img: "https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg",
          category: ["streaming"]
      },
      {
          category: ["streaming"],
          name:"netflix", 
          img: "data:image/png;base64,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"
      },
      {
          name: "amazon",
          category: ["other"],
          img : "https://images-na.ssl-images-amazon.com/images/G/15/gc/designs/livepreview/amazon_dkblue_noto_email_v2016_ca-main._CB468775011_.png"
      },
      {
          name: "youtube",
          category: ["streaming"],
          img : "https://variety.com/wp-content/uploads/2020/06/youtube-logo.png?w=999"

      },
      {
        name: "minecraft",
        category: ["other"],
        img : require("../static/img/minecraft.png")

    },
    {
        name: "prime video",
        category: ["streaming"],
        img : "https://reviewed-com-res.cloudinary.com/image/fetch/s--OCGmezmg--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_972/https://reviewed-production.s3.amazonaws.com/1590656678455/Amazon_Prime_Video_tips_1.jpg"

    },
    {
        name: "discord",
        category: ["social media"],
        img:  require("../static/img/discord.jpg")

    },
    {
        name: "firefox",
        category: ["other"],
        img: require("../static/img/firefox.jpg")
    },
     {
         name: "disney+",
         category: ["streaming"],
         img: require("../static/img/disney.jpg")
     },
     {
         name: "snapchat",
         category: ["social media"],
         img: require("../static/img/photo-7.jpg")
     }
  ])
  const [currentApps,setCurrentApps] = useState([
    {
        name: "uber",
        img: require("../static/img/uber.png"),
        category: ["other"]
    },
    {
        name: "slack",
        img: "https://www.howtogeek.com/wp-content/uploads/2019/06/slack_logo.png?width=1198&trim=1,1&bg-color=000&pad=1,1",
        category: ["other"]
    },
    {
        name: "twitch",
        img: "https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg",
        category: ["streaming"]
    },
    {
        category: ["streaming"],
        name:"netflix", 
        img: "data:image/png;base64,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"
    },
    {
        name: "amazon",
        category: ["other"],
        img : "https://images-na.ssl-images-amazon.com/images/G/15/gc/designs/livepreview/amazon_dkblue_noto_email_v2016_ca-main._CB468775011_.png"
    },
    {
        name: "youtube",
        category: ["streaming"],
        img : "https://variety.com/wp-content/uploads/2020/06/youtube-logo.png?w=999"

    },
    {
      name: "minecraft",
      category: ["other"],
      img : require("../static/img/minecraft.png")

  },
  {
      name: "prime video",
      category: ["streaming"],
      img : "https://reviewed-com-res.cloudinary.com/image/fetch/s--OCGmezmg--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_972/https://reviewed-production.s3.amazonaws.com/1590656678455/Amazon_Prime_Video_tips_1.jpg"

  },
  {
      name: "discord",
      category: ["social media"],
      img:  require("../static/img/discord.jpg")

  },
  {
      name: "firefox",
      category: ["other"],
      img: require("../static/img/firefox.jpg")
  },
   {
       name: "disney+",
       category: ["streaming"],
       img: require("../static/img/disney.jpg")
   },
   {
       name: "snapchat",
       category: ["social media"],
       img: require("../static/img/photo-7.jpg")
   }
])
  const selectAll = ()=>{
      setCurrentApps(apps)

  }
  const selectStreaming = ()=>{
      let copy = apps.filter((item)=>{
        return  item.category.some((c)=>{
               return c === "streaming"
          })

      })
      setCurrentApps(copy)
      
}
const selectSocialMedia = ()=>{
    let copy = apps.filter((item)=>{
      return  item.category.some((c)=>{
            return  c === "social media"
        })

    })
    setCurrentApps(copy)
      
}
const selectOther = ()=>{
    let copy = apps.filter((item)=>{
       return item.category.some((c)=>{
            return  c === "other"
        })

    })
    setCurrentApps(copy)
      
}
  if (localStorage.getItem("username") === null) {
    return (
      <>
        <Navbar /> <div>You arent logged in</div>{" "}
      </>
    );
  }
  return (
    <>
      <Navbar></Navbar>
      <div id="side-nav" className="sidenav"></div>{" "}
      <div className="jumbotron jumbotron-single d-flex align-items-center">
        <div className="container text-center">
          <h1 className="display-2 mb-4">Analytics</h1>
        </div>
      </div>
      <section id="portfolio" className="bg-white">
        <div className="container">
          <div className="section-content">
            <div className="title-wrap">
              <h2 className="section-title">
                {" "}
                CHOOSE AN <b>APP</b> FOR ANALYTICS
              </h2>
              <p className="section-sub-title">
                Use the filters below to sort the apps of your liking
              </p>
            </div>

            <div className="row">
              <div className="col-md-12 portfolio-holder mt-3">
                <div className="d-flex">
                    <button className="btn btn-primary" onClick={selectAll}>All</button>
                    <button className="btn btn-primary" onClick={selectStreaming}>Streaming</button>
                    <button className="btn btn-primary" onClick={selectSocialMedia}>Social media</button>
                    <button className="btn btn-primary" onClick={selectOther}>Other</button>
                </div>
                {currentApps.map((item) => (
                      <AppSearchItem app={item}></AppSearchItem>
                  ))}

               
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
                <a className="btn btn-outline-primary btn-lg" href="home">
                  HOME
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="mastfoot my-3">
        <div className="inner container">
          <div className="row">
            <div className="col-lg-4 col-md-12 d-flex align-items-center"></div>
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
  );
}

export default ViewApps;
