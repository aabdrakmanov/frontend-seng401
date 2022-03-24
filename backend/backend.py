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

@app.route('/')
@app.route('/home')
def home():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/generalUser')
def blog():
    return render_template('blog.html')

@app.route('/generalResult')
def userResult():
    return render_template('result.html')


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

    return jsonify({'error':'No valid account found!'}), 500


@app.route('/loggedIn', methods = ['POST', 'GET'])
def loggedIn():
    return render_template('blog.html')


@app.route('/devResult')
def displayResult():
    # result,continuation_token= reviews('com.Slack',lang='en',country='us',sort=Sort.MOST_RELEVANT, count=1000)

    company = request.args.get('company')
    print("result page")
    print(company)
    df = pd.read_csv ('roxy\\app_reviews_slack.csv')


    count_1,count_2,count_3,count_4 = 0,0,0,0
    # count_1v2,count_2v2,count_3v2,count_4v2 = 0,0,0,0


    idx1,idx2,idx3,idx4 = 0,0,0,0

    reg_dict = {}
    reg_dictv2 = {}
    int_dict = {}
    int_dictv2 = {}
    app_dict = {}
    app_dictv2 = {}
    not_dict = {}
    not_dictv2 = {}


    for i in df['RegistrationIssues']:
        if i>0.7 and idx1<=8:
            my_formatter = "{0:.2f}"
            reg_dict[df['processed_review'][count_1]] = str(my_formatter.format(i*100))+"%"
            idx1+=1

        elif idx1>8 and i>0.7:
            my_formatter = "{0:.2f}"
            reg_dictv2[df['processed_review'][count_1]] = str(my_formatter.format(i*100))+"%"
            idx1+=1

        count_1+=1


        if idx1 ==16:
            break
    # count_2 = 0
    for i in df['Notification Issues']:
        if i>0.7 and idx2<=8:
            my_formatter = "{0:.2f}"
            not_dict[df['processed_review'][count_2]] = str(my_formatter.format(i*100))+"%"
            idx2+=1
        elif idx2>8 and i>0.7:
            my_formatter = "{0:.2f}"
            not_dictv2[df['processed_review'][count_2]] = str(my_formatter.format(i*100))+"%"
            idx2+=1

        count_2+=1
        if idx2 == 16:
            break

    # count_3 = 0
    for i in df['Slack Desktop/Mobile App Issues']:
        if i>0.7 and idx3<=8:
            
            my_formatter = "{0:.2f}"
            app_dict[df['processed_review'][count_3]] = str(my_formatter.format(i*100))+"%"
            idx3+=1

        elif idx3>8 and i>0.7:
            my_formatter = "{0:.2f}"
            app_dictv2[df['processed_review'][count_3]] = str(my_formatter.format(i*100))+"%"
            idx3+=1

        count_3+=1
        if idx3 == 16:
            break

    # count_4 = 0
    for i in df['Interface Issues']:
        if i>0.7 and idx4<=8:
            my_formatter = "{0:.2f}"
            int_dict[df['processed_review'][count_4]] = str(my_formatter.format(i*100))+"%"
            # print(int_dict[df['processed_review'][count_4]])
            idx4+=1
        elif idx4>8 and i>0.7:
            my_formatter = "{0:.2f}"
            int_dictv2[df['processed_review'][count_4]] = str(my_formatter.format(i*100))+"%"
            print(int_dictv2[df['processed_review'][count_4]])
            idx4+=1

        count_4+=1
        if idx4 == 16:
            break


    print(len(reg_dict))
            
    cols = []

    for i in df.columns:
        cols.append(i)

    cols.pop(0)
    cols.pop(0)

    cols.append("Audio Call Issues")

    cols[0] = "Registration Issues"

    patch_status = ['Pending','Fixed','Fixed','Pending','In-progress']

    dict_bug = {}

    for i in range(len(cols)):
        dict_bug[cols[i]]=patch_status[i]

    
    # return render_template('resultDeveloper.html')

    return render_template('new_results.html',reg_dict=reg_dict,int_dict=int_dict,not_dict=not_dict,app_dict=app_dict,
         reg_dictv2 = reg_dictv2, int_dictv2 = int_dictv2, app_dictv2 = app_dictv2,not_dictv2=not_dictv2,dict_bug=dict_bug)


def get_sentiment_score(text):
  tokens = tokenizer.encode(text, return_tensors='pt')
  result= model(tokens)
  return int(torch.argmax(result.logits))+1

@app.route('/generateAnalytics')    # results for apps are already cached for demo
def generateAnalytcis():

    app = request.json['company']
    result,continuation_token= reviews('com.ubercab',lang='en',country='us',sort=Sort.MOST_RELEVANT, count=10000)
    df = pd.DataFrame(result)
    df_app=pd.DataFrame(np.array(df['content']),columns=['review'])
    df_app['review']=df_app['review'].apply(nfx.remove_hashtags).apply(nfx.remove_emojis).apply(nfx.remove_urls).apply(nfx.remove_userhandles)
    tokenizer = AutoTokenizer.from_pretrained('nlptown/bert-base-multilingual-uncased-sentiment')
    model = AutoModelForSequenceClassification.from_pretrained('nlptown/bert-base-multilingual-uncased-sentiment')
    df_app['sentiment']=df_app['review'].apply(lambda x: get_sentiment_score(x[:512]))
    negative_reviews = df_app[df_app['sentiment']<=3]['review']
    df_app=df_app.drop_duplicates()
    df_negative=pd.DataFrame(np.array(negative_reviews),columns=['processed_review'])
    cv = CountVectorizer(max_df=0.95, min_df=2, stop_words='english')
    vectorizer = cv.fit_transform(df_negative['processed_review'])
    LDA = LatentDirichletAllocation(n_components=3,random_state=1)
    LDA.fit(vectorizer) 
    topic_results = LDA.transform(vectorizer)
    df_topic_results = pd.DataFrame(topic_results, columns=[
    '0_Service/App related Issues',
    '1_Payment Issues' ,
    '2_Driver/Ride Issues'            ,
    '3_Booking/Cancellation Issues'  , 
    ])
    print(app)
    df_result = pd.merge(df_negative, df_topic_results,  how='inner', left_index=True, right_index=True )
    df_result.to_csv('app_reviews_bms.csv')
    df_visualization= pd.read_csv("app_reviews_bms.csv")
    df_visualization['0_Service/App related Issues']=round(df_visualization['0_Service/App related Issues']*100,2)
    df_visualization['1_Payment Issues']=round(df_visualization['1_Payment Issues']*100,2)
    df_visualization['2_Driver/Ride Issues']=round(df_visualization['2_Driver/Ride Issues']*100,2)
    df_visualization['3_Booking/Cancellation Issues']=round(df_visualization['3_Booking/Cancellation Issues']*100,2)
    df_visualization['0_Service/App related Issues']=df_visualization['0_Service/App related Issues'].astype(str)+"%"
    df_visualization['1_Payment Issues']=df_visualization['1_Payment Issues'].astype(str)+"%"
    df_visualization['2_Driver/Ride Issues']=df_visualization['2_Driver/Ride Issues'].astype(str)+"%"
    df_visualization['3_Booking/Cancellation Issues']=df_visualization['3_Booking/Cancellation Issues'].astype(str)+"%"
    df_list=df_visualization.values.tolist()
    counter0=0
    counter1=0
    counter2=0
    counter3=0
    for i in range(0,len(df_list)):
        temp=[float(df_list[i][2][:-1]),float(df_list[i][3][:-1]),float(df_list[i][4][:-1]),float(df_list[i][5][:-1])]
        if(i==0):
            print(temp)
        if(max(temp)==float(df_list[i][2][:-1])):
            counter0+=1
        elif(max(temp)==float(df_list[i][3][:-1])):
            counter1+=1
        elif(max(temp)==float(df_list[i][4][:-1])):
            counter2+=1
        elif(max(temp)==float(df_list[i][5][:-1])):
            counter3+=1

    labels = ['Service/App related Issues',
    'Payment Issues' ,
    'Driver/Ride Issues'            ,
    'Booking/Cancellation Issues']
    sizes = [counter0, counter1, counter2, counter3]
    # only "explode" the 2nd slice (i.e. 'Hogs')
    explode = (0, 0.1, 0, 0)  
    fig1, ax1 = plt.subplots()
    ax1.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%',
            shadow=True, startangle=90)
    # Equal aspect ratio ensures that pie is drawn as a circle
    ax1.axis('equal')  
    plt.tight_layout()
    plt.show()
    # Pie chart
    labels = ['Service/App related Issues',
    'Payment Issues' ,
    'Driver/Ride Issues'            ,
    'Booking/Cancellation Issues']
    sizes = [counter0, counter1, counter2, counter3]
    #colors
    colors = ['#FF0000','#00ABF0','#3CB043','#FFA500']
    
    fig1, ax1 = plt.subplots()
    ax1.pie(sizes, colors = colors, labels=labels, autopct='%1.1f%%', startangle=90)
    #draw circle
    centre_circle = plt.Circle((0,0),0.75,fc='white')
    fig = plt.gcf()
    fig.gca().add_artist(centre_circle)
    # Equal aspect ratio ensures that pie is drawn as a circle
    ax1.axis('equal')  
    plt.tight_layout()
    plt.show()
    plt.barh(labels, sizes, color=colors)
    plt.xlabel("Number of complaints",fontweight ='bold')
    plt.ylabel("Topics for Negative Reviews",fontweight ='bold')
    plt.show()




if __name__ == "__main__":
    app.run(debug=True)
