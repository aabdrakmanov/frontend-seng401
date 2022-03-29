import React from "react";
import { useEffect,useState,useRef } from "react"
import { useNavigate,Link,useSearchParams } from "react-router-dom";
import "../static/css/templatemo-main.css";
import UserContext from "../context/UserContext";

import Navbar from "../components/Navbar";
import { renderIntoDocument } from "react-dom/test-utils";
function AppEntry() {
  const isMounted = useRef
  const [searchParams] = useSearchParams()
  const a = (searchParams.get("company"))
  const [formatBugs,setFormatBugs] = useState([])
  const [reviews,setReviews]= useState([])
  const [option,setOption] = useState("1 month")
  const [appData,setData] = useState({
    numberOfReviews:0,
    numberOfPatchs:0,
    Summary: "",
    sentimentPieChart:"../static/img/piechart2.jpg",
    ratingsPieChart:"../static/img/piechart2.jpg",
    issuesBarChart:"../static/img/piechart2.jpg",
    issuesPieChart:"../static/img/piechart2.jpg",
    timePeriod: null,
    Bugs: [{Issues:"bruh", Status: "bd"},{Issues:"s", Status: "kami"}]

  })

  const [loading,setLoading] = useState(true);
  let timePeriodMapping = {
    "1 month":0,
    "6 months":1,
    "1 year":2,
    "2 years+":3
  }
  let mappingTopics = {
    "registration":0,
    "interface":1,
    "notifications":2,
    "mobile/desktop app":3
  }
  const changeOption = (e)=>{
    e.preventDefault()
    console.log(e)
    setOption(e.target.text)

  }
  useEffect(()=>{
    let isMounted = true;
    const fetchData = async()=>{
      try{
      const data =  await fetch(`https://api-401-ml.herokuapp.com/devResult?company=${a}`).then((response)=> response.json())
      if(isMounted){
      setData(data)
      console.log(data)
      let formatBugsCopy = []
      for(let i = 0; i< data.Bugs.Status.length;i++ ){
        formatBugsCopy.push({status: data.Bugs.Status[i], issue: data.Bugs.issues[i]})

      }
      setFormatBugs(formatBugsCopy)
      setLoading(false)
    }
  }
  catch(error){
    console.log(error)
    setLoading(false)
  }
    }
    fetchData()
    return ()=>{isMounted = false}
  }

  , [])
  if(localStorage.getItem("username") === null){
    return <><Navbar/> <div>You arent logged in</div> </>
}
  if(loading){
    return <div>Loading</div>
  }

  return (
    <>
 
      <div className="fixed-side-navbar">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link" href="#home">
              <span>Intro</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#services">
              <span>Statistics</span>
            </a>
          </li>{" "}
          <li className="nav-item">
            <a className="nav-link" href="#portfolio">
              <span>Graphs</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#our-story">
              <span>Advanced Review Analysis</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#contact-us">
              <span>Bug Tracker</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="parallax-content baner-content" id="home">
        <div className="container">
          <div className="first-content">
            <h1>{a}</h1>
            <span>
              <em>APP</em> Analysis
            </span>
            <div className="primary-button">
              <Link to = "/login">Switch Account</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="service-content" id="services">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="left-text">
              
                <h4>
                  <b>{a}</b>
                </h4>
                <div className="line-dec"></div>

                <h4>
                  <i>
                    {" "}
                    {appData.Summary}
                  </i>
                </h4>

                <div className="primary-button"></div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6">
                  <div className="service-item">
                    <h4>Number of Reviews Used</h4>
                    <div className="line-dec"></div>
                    <section className="numbers dark-blue-bg white-txt">
                      <div className="marged flex">
                        <div className="number-item">
                          <h1>
                            <span className="value">{appData.numberOfReviews}</span>
                          </h1>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="service-item">
                    <h4>Number of Patches Used</h4>
                    <div className="line-dec"></div>
                    <section className="numbers dark-blue-bg white-txt">
                      <div className="marged flex">
                        <div className="number-item">
                          <h1>
                            <span className="value">{appData.numberOfPatches}</span>
                          </h1>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="service-item">
                    <h4>Sentiment Distribution</h4>
                    <div className="line-dec"></div>
                    <a href={appData.sentimentPieChart} data-lightbox="image-1">
                      <img src="static/img/piechart2.jpg" alt="" />
                    </a>
                    <p>
                      Visualizes the sentiment distribution in the app reviews
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="service-item">
                    <h4>Ratings Distribution</h4>
                    <div className="line-dec"></div>
                    <a href={appData.ratingsPieChart} data-lightbox="image-1">
                      <img src="static/img/piechart1.jpg" alt="" />
                    </a>
                    <p>
                      Visualizes the ratings distribution for the app on Google
                      Play Store
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="service-item">
                    <h4>Issue Distribution</h4>
                    <div className="line-dec"></div>
                    <a href={appData.issuesBarChart} data-lightbox="image-1">
                      <img src="static/img/pirechart9.jpg" alt="" />
                    </a>
                    <p>
                      Visualizes the Issue distribution brought up by users in
                      app reviews
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="service-item">
                    <h4>Major Bugs Identified</h4>
                    <div className="line-dec"></div>
                    <a href={appData.issuesPieChart} data-lightbox="image-1">
                      <img src="static/img/bargraph.jpg" alt="" />
                    </a>
                    <p>
                      Visualizes the Issue distribution brought up by users in
                      app reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br /> <br />
        <br /> <br />
        <br />
      </div>
      <div className="parallax-content projects-content" id="portfolio">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div >
                  <h1>Graphs</h1>
                <div>
                  <div>
                        <h4>Sentiment Pie Graph</h4>
                      <img src={`${appData.sentimentPieChart}?raw=true`}alt="sentiment pie chart" />

                    <div>
                    <h4>Ratings Pie Graph</h4>
                    <img src={`${appData.ratingsPieChart}?raw=true`} alt="sentiment pie chart" />
                    </div>
                  </div>
                </div>
                <div >
                  <div >
                  <h4> Issues Pie Graph</h4>
                      <img src={`${appData.issuesPieChart}?raw=true`} alt="issues pie chart" />

                    <div >
                      <h4>Issues Bar Graph</h4>
                      <img src={`${appData.IssuesBarChart}?raw=true`} alt="issues pie chart" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tabs-content" id="our-story">
        <div className="container">
          <div className="row">
            <div className="wrapper">
              <h1>Review Analyzer</h1>
              <div className="line-dec"></div>
              <div className="trial1">
                <p>
                  This segment provides negative customer feedback mapped to
                  major clusters of bugs identified from the App reviews for
                  qualitative bug detection and analysis over multiple time
                  frames
                </p>
                <ul className="tabs clearfix" data-tabgroup="first-tab-group">
                    <li>
                      <a onClick = {changeOption} href="#our-story" value = "1 month"  className={option === "1 month" ?"active": ""}>
                        1 month
                      </a>
                    </li>
                    <li>
                     
                      <a onClick = {changeOption} href="#our-story" value = "6 months"  className={option === "6 months" ?"active": ""}>6 months</a>
                      
                    </li>
                    <li>
                      
                      <a onClick = {changeOption} href="#our-story" value = "1 year"  className={option === "1 year" ?"active": ""}>1 year</a>
                      
                    </li>
                    <li>
                     
                      <a onClick = {changeOption} href="#our-story"value = "2 years+" className={option === "2 years+" ?"active": ""}>2 years+</a>
                      
                    </li>
                  </ul>
                <br />
              
               
                   
                      <main className="st_viewport">
                       
                    <table class = "x">
                    
                    <caption class = "a">{appData.timePeriod[timePeriodMapping[option]][0].topic}</caption>
                    <thead className="stickydiv">
                    <tr >
                <th >Review</th>
                <th> Score </th>
                </tr>
                </thead>
                  <tbody class = "f">
                  {appData.timePeriod &&appData.timePeriod[timePeriodMapping[option]][0].reviews.map((r)=>(
                            <tr className="st_row">
                              <td >{r.negativeReviews}</td>
                              <td>{r.scores}</td>
                            </tr>
                          ))}
                       
                      </tbody>
                      </table>
                      <table class = "x">
   
                    <caption class = "a">{appData.timePeriod[timePeriodMapping[option]][1].topic}</caption>
                    <thead className="stickydiv">
                    <tr >

                <th >Review</th>
                <th> Score </th>
                </tr>
                </thead>
                  <tbody class = "c">
                  {appData.timePeriod &&appData.timePeriod[timePeriodMapping[option]][1].reviews.map((r)=>(
                            <tr className="st_row">
                              <td >{r.negativeReviews}</td>
                              <td>{r.scores}</td>
                            </tr>
                          ))}
                       
                      </tbody>
                      
                      
                      </table>
                      <table class = "x">
   
                    <caption class = "a">{appData.timePeriod[timePeriodMapping[option]][2].topic}</caption>
                    <thead className="stickydiv">
                    <tr >
                     
                <th >Review</th>
                <th> Score </th>
                </tr>
                </thead>
                  <tbody class = "d">
                  {appData.timePeriod &&appData.timePeriod[timePeriodMapping[option]][2].reviews.map((r)=>(
                            <tr className="st_row">
                              <td >{r.negativeReviews}</td>
                              <td>{r.scores}</td>
                            </tr>
                          ))}
                       
                      </tbody>
                      
                      
                      </table>

                      <table class = "x">
   
          <caption class = "a">{appData.timePeriod[timePeriodMapping[option]][3].topic}</caption>
          <thead className="stickydiv">
   <tr >
<th >Review</th>
<th> Score </th>
</tr>
</thead>
 <tbody class = "e">
 {appData.timePeriod &&appData.timePeriod[timePeriodMapping[option]][3].reviews.map((r)=>(
           <tr className="st_row">
             <td >{r.negativeReviews}</td>
             <td>{r.scores}</td>
           </tr>
         ))}
      
     </tbody>
     
     
     </table>

                      

                       
                      </main>
                   
                
                  
                  
                  
                  <br />
                  <br />
                  <br />
                  <br />
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="parallax-content contact-content" id="contact-us">
        <h1>Bug Tracker</h1>
        <div className="line-dec"></div>
        <div className="trial">
          <p>
            This segment visualizes the semantic links between Major Bug
            Clusters identified from App Reviews and the patch notes released by
            the developers. This serves as a tracking list for existing bugs and
            resolved issues with the application
          </p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <table className="container1">
            <thead>
              <tr>
                <th>
                  <h1>Major Bugs</h1>
                </th>
                <th>
                  <h1>Status</h1>
                </th>
              </tr>
            </thead>
            <tbody>
              {localStorage.getItem("company") === a && formatBugs.map((bug)=>(
                <tr>
                <td>{bug.issue}</td>
                <td>{bug.status}</td>
              </tr>))


              }

            </tbody>
          </table>
        </div>
      </div>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-12"></div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default AppEntry;
