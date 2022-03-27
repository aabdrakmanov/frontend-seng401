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
import numpy as np

app = Flask(__name__)


app.config['MYSQL_HOST'] = '35.199.186.226'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'seng401'
app.config['MYSQL_DB'] = 'applytics'

CORS(app)
mysql = MySQL(app)

@app.route('/devResult')
def displayResult():
    # result,continuation_token= reviews('com.Slack',lang='en',country='us',sort=Sort.MOST_RELEVANT, count=1000)

    company = request.args.get('company')
    print("result page")
    print(company)
    df = pd.read_csv ('app_reviews_slack.csv')

    summary = df['Summary'][0]
    numPatches = df['numberOfPatches'][0]
    numReviews = df['NumberOfReviews'][0]

    issue1=[]
    issue2=[]
    issue3=[]
    issue4=[]

    my_formatter = "{0:.2f}"
    for i in range(len(df['processed_review'])):
        
        if(df['issue1'][i]>df['issue2'][i] and df['issue1'][i]>df['issue2'][i] and df['issue3'][i]>df['issue4'][i]):
            issue1.append({"negativeReviews": df['processed_review'][i], "scores": my_formatter.format(df['issue1'][i]*100)})
        elif(df['issue2'][i]>df['issue1'][i] and df['issue2'][i]>df['issue3'][i] and df['issue2'][i]>df['issue4'][i]):
            issue2.append({"negativeReviews": df['processed_review'][i], "scores": my_formatter.format(df['issue2'][i]*100)})
        elif(df['issue3'][i]>df['issue1'][i] and df['issue3'][i]>df['issue2'][i] and df['issue3'][i]>df['issue4'][i]):
            issue3.append({"negativeReviews": df['processed_review'][i], "scores": my_formatter.format(df['issue3'][i]*100)})
        else:
            issue4.append({"negativeReviews": df['processed_review'][i], "scores": my_formatter.format(df['issue4'][i]*100), "topic": df['Status'][3]})

    issue1[:] = [x for x in issue1 if float(x['scores']) >= 70.0]
    issue2[:] = [x for x in issue2 if float(x['scores']) >= 70.0]
    issue3[:] = [x for x in issue3 if float(x['scores']) >= 70.0]
    issue4[:] = [x for x in issue4 if float(x['scores']) >= 70.0]

    issue1 = sorted(issue1, key=lambda d: d['scores'], reverse = True) 
    issue2 = sorted(issue2, key=lambda d: d['scores'], reverse = True) 
    issue3 = sorted(issue3, key=lambda d: d['scores'], reverse = True) 
    issue4 = sorted(issue4, key=lambda d: d['scores'], reverse = True) 

    issue1split = np.array_split(issue1, 4)
    issue2split = np.array_split(issue2, 4)
    issue3split = np.array_split(issue3, 4)
    issue4split = np.array_split(issue4, 4)

    mainResult=[]
    for i in range(4):
        result=[]
        result.append({"topic": df['Status'][0], "reviews": issue1split[3-i]})
        result.append({"topic": df['Status'][1], "reviews": issue2split[3-i]})
        result.append({"topic": df['Status'][2], "reviews": issue3split[3-i]})
        result.append({"topic": df['Status'][3], "reviews": issue4split[3-i]})
        mainResult.append(result)

    issues = []
    status=[]

    for i in range(4):
        issues.append(df['issueName'][i])
        status.append(df['Status'][i])

    result = {}
    result["numberOfReviews"] = numReviews
    result["numberOfPatches"] = numPatches
    result["Summary"] = summary
    #result["timePeriod"] = mainResult
    result["Bugs"] = {"issues": issues, "Status": status} 
    print(result)
    return jsonify(result), 200

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


if __name__ == '__main__':
      app.run(port=5010)


