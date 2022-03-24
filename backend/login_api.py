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

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'applytics'

CORS(app)
mysql = MySQL(app)

@app.route('/signup', methods = ['POST', 'GET'])
def signup():

    print("signup")

    name = request.form.get("username")
    email = request.form.get("email")
    password = request.form.get("password")
    
    atPos = email.find('@')
    domain = email[atPos+1:]

    company = domain[0:domain.find('.')]

    if(company == "gmail" or company == "yahoo" or company =="ucalgary" or company == "hotmail"):
        company = "N/A"

    print(company)

    result = {"name": name, "email": email, "password": password, "company": company}

    response = requests.post("http://127.0.0.1:5000/signupStoreDB", json=result)

    print(response.status_code)

    if response.status_code == 201:
        return flask.redirect("loggedIn")

    else:
        return flask.redirect("login")
    
    
@app.route('/signupStoreDB', methods= ['POST'])
def storeSignupToDB():

    name = request.json['name']
    email = request.json['email']
    password = request.json['password']


    cur0 = mysql.connection.cursor()
    result = cur0.execute("Select * FROM USERCREDENTIALS")

    if (result > 0):
        userDetails = cur0.fetchall()
        for user in userDetails:
            if (user[1] == email or user[0] == name):
                return jsonify({'status':'user already exists.'}), 500

    mysql.connection.commit()
    cur0.close()

    cur = mysql.connection.cursor()
    cur.execute("""INSERT INTO USERCREDENTIALS(email,name, password) VALUES(%s,%s,%s)""", (email,name,password))
    mysql.connection.commit()
    cur.close()

    return jsonify({'status':'success'}), 201



@app.route('/signin', methods = ['POST'])
def signin():
    print("signin")

    email = request.form.get("email")
    password = request.form.get("password")
    atPos = email.find('@')
    domain = email[atPos+1:]

    company = domain[0:domain.find('.')]

    print(company)

    result = {"email": email, "password": password}

    response = requests.get("http://127.0.0.1:5000/signinGetDB", json=result)

    print(response.status_code)

    if response.status_code == 200:
        return flask.redirect("loggedIn")
        #return flask.redirect("http://127.0.0.1:5000/devResult?company="+str(company))

    else:
        return flask.redirect("login")


@app.route('/signinGetDB', methods= ['GET'])
def getSiginDB():

    email = request.json['email']
    password = request.json['password']

    print("Reached here   "+email)

    cur = mysql.connection.cursor()
    result = cur.execute("Select * FROM USERCREDENTIALS")

    if(result>0):

        userDetails = cur.fetchall()
        for user in userDetails:
            if(user[1]==email and user[2]==password):
                return jsonify({'status':"success"}), 200

    return jsonify({'error':'No valid account found!'}), 200

if __name__ == "__main__":
    app.run(debug=True)
