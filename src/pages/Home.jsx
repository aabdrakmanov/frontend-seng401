import React from 'react'
import Navbar from "../components/Navbar"
import triangle from "../static/img/obj_triangle.png" 
import dev4 from "../static/img/dev4.png"
import dev2 from "../static/img/dev2.png"
import {Link} from 'react-router-dom'
function Home() {
  return (
    
    <div data-spy="scroll" data-target="#navbar" className="static-layout">
          <Navbar></Navbar>
   
    <div className="jumbotron d-flex align-items-center">
  <div className="container text-center">
    <h1 className="display-1 mb-4">APPALYTICS<br/></h1>
  </div>
  <div className="rectangle-1"></div>
  <div className="rectangle-2"></div>
  <div className="rectangle-transparent-1"></div>
  <div className="rectangle-transparent-2"></div>
  <div className="circle-1"></div>
  <div className="circle-2"></div>
  <div className="circle-3"></div>
  <div className="triangle triangle-1">
  	<img src={triangle} alt=""/>
  </div>
  <div className="triangle triangle-2">
  	<img src={triangle} alt=""/>
  </div>
  <div className="triangle triangle-3">
  	<img src={triangle} alt=""/>
  </div>
  <div className="triangle triangle-4">
  	<img src={triangle}alt=""/>
  </div>
</div>

       <div className="row">
             
                <div className="col-md-10 offset-md-1 features-holder">
                    <div className="row">
                       
                        <div className="col-md-4 col-sm-12 text-center mt-4">
                            <div className="shadow rounded feature-item p-4 mb-4" data-aos="fade-up">
                                <div className="my-4">
                                    <i className="lnr lnr-cog fs-40"></i>
                                </div>
                                <h4>Generate App Analytics</h4>
                                <p>Applytics provides you with qualitative statistical information for all your faviroute apps</p>
                            </div>
                            <div className="shadow rounded feature-item p-4 mb-4" data-aos="fade-up">
                                <div className="my-4">
                                    <i className="lnr lnr-frame-contract fs-40"></i>
                                </div>
                                <h4>Reviews Analyzer</h4>
                                <p>Provides list of customer complaints on major bugs identified by Applytics for in-dept qualitative analysis by developers</p>
                            </div>
                        </div>
                       
                        <div className="col-md-4 col-sm-12 text-center">
                            <div className="shadow rounded feature-item p-4 mb-4" data-aos="fade-up">
                                <div className="my-4">
                                    <i className="lnr lnr-bubble fs-40"></i>
                                </div>
                                <h4>Analytics Visualization</h4>
                                <p>Applytics provides you with pie-charts, bargraphs and histograms to visualize the development status of the requested application</p>
                            </div>
                            <div className="shadow rounded feature-item p-4 mb-4" data-aos="fade-up">
                                <div className="my-4">
                                    <i className="lnr lnr-magic-wand fs-40"></i>
                                </div>
                                <h4>Developer Portal</h4>
                                <p>Applytics provides a developer portal to track all the existing bugs with their application and in-dept app statistics for qualitative analysis</p>
                            </div>
                        </div>
                    
                        <div className="col-md-4 col-sm-12 text-center mt-4">
                            <div className="shadow rounded feature-item p-4 mb-4" data-aos="fade-up">
                                <div className="my-4">
                                    <i className="lnr lnr-clock fs-40"></i>
                                </div>
                                <h4>Bug Tracker</h4>
                                <p>Tracks the status of the bugs identified by the App users with regards to the efforts put by the developers to resolve them</p>
                            </div>
                            <div className="shadow rounded feature-item p-4 mb-4" data-aos="fade-up">
                                <div className="my-4">
                                    <i className="lnr lnr-thumbs-up fs-40"></i>
                                </div>
                                <h4>Patch Notes Mapper</h4>
                                <p>Maps app patch/release notes with major bugs identified by Applytics to keep track of how many issues are resolved by the developer</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
                </div>
                <section id="section-featurettes" className="featurettes " style={{ backgroundImage: `url(${require("../static/img/orange.jpg")})` }}>

   
                <div className="container">
        <div className="section-content">
            <div className="row">
                <div className="col-md-12">
                    <div className="row align-items-center text-white ">
                        <div className='d-flex'>
                        <div className="col-md-4 offset-right-8 col-sm-3 mt-5 pt-4" data-aos="fade-right">
                            <h4 style= {{color : "white"}} className="mb-2">General Account</h4>
                            <p>Signing up for a General account will enable you to generate and visualize the analytics for your faviroute applications. Most importantly, it will allow you to assess the response of the App's developers towards their customers feedback.</p>
                            <Link to = "signup"><button type="button" className="btn btn-outline-primary" >Try Now!</button> </Link>
                        </div>

                       
                           
                            <img className="pull-right"  src={dev4} alt="" width=""/>
                            </div>
                            </div>
                       

                    </div>

                </div>

            </div>
        </div>
        </section>

        <section id="section-featurettes" className="featurettes">

    
    <div className="container"> 
        
        <div className="section-content">
           
            <div className="row">
                <div className="col-md-12">
                    <div className="row align-items-center">

                        
                       <div className='d-flex'>

                        <div className="col-md-4 offset-md-right-2 col-sm-6 mt-5 pt-4" data-aos="fade-left">
                            
                            <h4 className="mb-4">Developer Account</h4>
                            <p><b>Signing up for a Developer account will enable you to view the analytics for your application. Most importantly, it will provide you with numerous bug identification and tracking features like Advanced Customer Reviews Analyzer, Bug Tracker, Patch Notes Mapper and much more...</b></p>
                            <Link to = "signup"><button type="button" className="btn btn-outline-primary1"  >Try Now!</button> </Link>
                        </div>
                       <img src = {dev2}></img>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>

</section>
    </div>

  

      


       
    
   
  )
}

export default Home;