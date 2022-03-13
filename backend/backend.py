from flask import Flask, request, jsonify, make_response, send_from_directory, send_file
import os
#from flask_mysqldb import MySQL
from flask_cors import CORS
from werkzeug.utils import send_from_directory
import string
import re
import pandas as pd
import re
import requests
import transformers
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import requests
from bs4 import BeautifulSoup
import re
import seaborn as sns
import neattext.functions as nfx
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from wordcloud import WordCloud
from sklearn.feature_extraction.text import TfidfVectorizer
pd.set_option('display.max_colwidth', 1000)
import nltk
from sklearn.feature_extraction.text import CountVectorizer
nltk.download('punkt')
nltk.download('stopwords')

from google_play_scraper.features.reviews import Sort, reviews_all, reviews
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'SENG401'
app.config['SECRET_KEY'] = 'MySecretKey'

CORS(app)
#mysql = MySQL(app)


def preprocess(text):
    str_punctuation = string.punctuation.replace('.', '')
    text = text.lower()
    text = re.sub(r'^https?://.[\r\n]', '', text, flags=re.MULTILINE)
    # text = text.translate(str.maketrans('', '', str_punctuation))
    text = " ".join(filter(lambda x: x[0] != '[', text.split()))
    text = text.replace('\n', '')
    text = text.replace('\t', '')
    text = re.sub(' +', ' ', text)
    return text




@app.route('/api/signup', methods=['POST'])
def signup():  # correct

    email = request.json['email']
    name = request.json['name']
    password = request.json['password']

    """

    cur0 = mysql.connection.cursor()
    result = cur0.execute('Select * FROM USERCREDENTIALS')

    if result > 0:
        userDetails = cur0.fetchall()
        for user in userDetails:
            if user[0] == email:
                return (jsonify({'error': 'user already exists.'}), 500)

    """

    """
    mysql.connection.commit()
    cur0.close()

    cur = mysql.connection.cursor()

                , (
        email,
        name,
        password,
        ))
    mysql.connection.commit()
    cur.close()
    
    """

    token = name + ':' + password
    return (jsonify({'token': token, 'name':name}), 201)

@app.route('/api/login', methods=['GET'])
def login():  # correct


    email = request.json['email']
    password = request.json['password']
    """
    email = request.args.get('email')
    password = request.args.get('password')"""

    """

    cur = mysql.connection.cursor()
    result = cur.execute("Select * FROM USERCREDENTIALS")

    if (result > 0):

        userDetails = cur.fetchall()
        for user in userDetails:
            if (user[0] == email and user[5] == password):
                token = user[4] + ":" + password
                return jsonify({'token': token, 'name':name}), 200
                
    """
    name = email[0:(str(email)).find(".")]
    return jsonify({'name':name})

    #return jsonify({'error': 'No valid account found!'}), 401

def get_sentiment_score(text, tokenizer, model):

  tokens = tokenizer.encode(text, return_tensors='pt')
  result= model(tokens)
  return int(torch.argmax(result.logits))+1


@app.route('/api/machinelearning', methods=['POST'])
def machinelearning():

    result, continuation_token = reviews('com.ubercab', lang='en', country='us', sort=Sort.MOST_RELEVANT, count=10000)

    df = pd.DataFrame(result)
    df_app = pd.DataFrame(np.array(df['content']), columns=['review'])
    df_app['review'] = df_app['review'].apply(nfx.remove_hashtags).apply(nfx.remove_emojis).apply(
        nfx.remove_urls).apply(nfx.remove_userhandles).apply(nfx.remove_multiple_spaces).apply(nfx.remove_punctuations)

    tokenizer = AutoTokenizer.from_pretrained('nlptown/bert-base-multilingual-uncased-sentiment')
    model = AutoModelForSequenceClassification.from_pretrained('nlptown/bert-base-multilingual-uncased-sentiment')
    df_app['sentiment'] = df_app['review'].apply(lambda x: get_sentiment_score(x[:512], tokenizer, model))

    negative_reviews = df_app[df_app['sentiment'] <= 3]['review']
    df_app = df_app.drop_duplicates()
    df_negative = pd.DataFrame(np.array(negative_reviews), columns=['processed_review'])

    cv = CountVectorizer(max_df=0.95, min_df=2, stop_words='english')
    vectorizer = cv.fit_transform(df_negative['processed_review'])
    LDA = LatentDirichletAllocation(n_components=3, random_state=1)
    LDA.fit(vectorizer)
    topic_results = LDA.transform(vectorizer)
    df_topic_results = pd.DataFrame(topic_results, columns=[
        '0_Service/App related Issues',
        '1_Payment Issues',
        '2_Driver/Ride Issues',
        '3_Booking/Cancellation Issues',
    ])
    df_result = pd.merge(df_negative, df_topic_results, how='inner', left_index=True, right_index=True)
    df_result.to_csv('app_reviews_bms.csv')


if __name__ == "__main__":
    app.run(debug=True)
