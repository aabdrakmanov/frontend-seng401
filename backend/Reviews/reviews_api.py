
from django.http import JsonResponse
from django.shortcuts import redirect, render
from flask import Flask, request, jsonify, make_response, send_from_directory, send_file, render_template, url_for
import os
import flask
from flask_cors import CORS
import pandas as pd
import numpy as np
import requests
from flask_mysqldb import MySQL

app = Flask(__name__)


app.config['MYSQL_HOST'] = '35.199.186.226'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'seng401'
app.config['MYSQL_DB'] = 'applytics'

CORS(app)
mysql = MySQL(app)

@app.route('/addReview', methods = ['POST'])
def addReview():
    
    app = request.json['app']
    review = request.json['review']
    name = request.json['username']
    # add it to database

    cur = mysql.connection.cursor()
    cur.execute("""INSERT INTO REVIEWS(review,username,app) VALUES(%s,%s,%s)""", (review, name,app))
    mysql.connection.commit()
    cur.close()

    return jsonify({"status":"success"}), 201

@app.route('/getReview', methods = ['GET'])
def getReview():

    # retrieve from database

    cur = mysql.connection.cursor()
    result = cur.execute("""SELECT R.app, R.reviewID, R.review,R.username FROM REVIEWS AS R""")

    if(result<=0):
        return jsonify({"status": "failed"}), 500

    else:

        rows = cur.fetchall()
        myResult = []

        for row in rows:

            myResult.append({"ID":row[1], "app": row[0], "review": row[2],"username":row[4]})

        return jsonify(myResult), 200


@app.route('/getReviewApp', methods = ['GET'])
def getReviewApp():
    
    app = request.args['app']

    # retrieve from database

    cur = mysql.connection.cursor()
    result = cur.execute("""SELECT R.reviewID, R.review FROM REVIEWS AS R WHERE R.app=%s""",(app,))

    if(result<=0):
        return jsonify({"status": "failed"}), 500

    else:

        rows = cur.fetchall()
        myResult = []

        for row in rows:

            myResult.append({"ID":row[0], "review": row[1], "app": app})

        return jsonify(myResult), 200

@app.route('/getReviewUser', methods = ['GET'])
def getReviewUser():
    
    username= request.args['user']

    # retrieve from database

    cur = mysql.connection.cursor()
    result = cur.execute("""SELECT R.reviewID, R.review,R.app FROM REVIEWS AS R WHERE R.username=%s""",(app,))

    if(result<=0):
        return jsonify({"status": "failed"}), 500

    else:

        rows = cur.fetchall()
        myResult = []

        for row in rows:

            myResult.append({"ID":row[0], "review": row[1], "app": row[2], "username":username})

        return jsonify(myResult), 200


@app.route('/editReview', methods = ['PUT'])
def editReview():

    reviewID = request.json['ID']
    review = request.json['newReview']

    # edit in database

    cur = mysql.connection.cursor()
    cur.execute(
        """UPDATE REVIEWS AS R
        SET review = %s
        WHERE reviewID = %s""",
        (review,reviewID))
    mysql.connection.commit()
    cur.close()

    return jsonify({"status": "success"}), 200
    


@app.route('/deleteReview', methods = ['DELETE'])
def deleteReview():
    
    reviewID = request.json['ID']

    # delete in database
    cur = mysql.connection.cursor()
    cur.execute("""DELETE FROM REVIEWS WHERE reviewID=%s""", (reviewID,))
    mysql.connection.commit()
    cur.close()

    return jsonify({"status": "success"}), 200
  
if __name__ == "__main__":
    app.run(host=os.getenv('IP','0.0.0.0'),port=int(os.getenv('PORT',5020)))
