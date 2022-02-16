import React from "react";
import Navbar from "../components/Navbar";

function About() {
  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Appalytics</h1>

        <p className="text-start">
          Our web app is an analysis of application reviews and sentiment from
          Google Play Store and Twitter. We plan on using machine learning to
          categorize comments and reviews about a specific app and providing
          statistics to developers in the form of graphs, tables, and other
          simple visual forms. This app targets developers who wish to improve
          their app by fixing bugs or improving overall user sentiment.
          Developers will be able to view the analytics of any app in Google
          Play Store by entering the name of that app. Here they will be able to
          view reviews and categorization of issues, which we will provide
          visually. Recalculation of sentiments will be done on a regular (timed
          basis) with the possibility that we implement a force recalculation.
          These recalculations will take into account any new reviews or posts.
          Users with an account can also save issues and/or mark them as fixed.
          This feature allows developers to track their progress and ensure they
          are making progress in addressing issues. In addition to finding app
          issues, developers can also get an overview of overall sentiment
          towards their product through a combination of Google Play Store
          reviews and Twitter posts. Our web app will provide a breakdown of
          general sentiment, similar to the issues displayed. Developers should
          be able to toggle between the views to see one or the other. We hope
          to provide developers with a clear understanding of their products
          without them needing to manually fetch and sort through all of this
          information.
        </p>
        <div class = "flex">
        <i class="bi bi-envelope-fill"></i>
        <a className = "ms-1" href="mailto:someone@example.com">Send email</a>
        </div>
        <div class = "flex">
        <i class="bi bi-telephone-fill"></i>
        <span class = "ms-1">000-000-00000</span>
        </div>
        <a href="#" class="btn btn-primary" role="button" aria-pressed="true"><i class="bi bi-envelope-fill"></i></a>
      </div>
    </>
  );
}

export default About;
