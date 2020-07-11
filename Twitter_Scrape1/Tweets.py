#!/usr/bin/env python
# coding: utf-8

# In[1]:


import tweepy
import json
import pandas as pd
from langdetect import detect
from datetime import datetime 
from datetime import timedelta

consumer_key = "cFf7im7BH68xO9qh3zEsv3nFz"
consumer_secret = "2QyodEVK63XYE5D9RFPAo0I53rhBOsNocQGpGB8rapmEqxDnJi"
access_key = "1265319352795975680-EJBIU55ZHZnjn8svR420cqVuU9evRL"
access_secret = "i8h2utF6b2l2Uh7Vpg6c2mnPOO1CuthGdbyWtHSWdIURP"

auth = tweepy.OAuthHandler(consumer_key, consumer_secret) 
auth.set_access_token(access_key, access_secret) 
api = tweepy.API(auth) 

# screenname = input("Enter the twitter screen name: ")
screenname="narendramodi"

tweets = api.user_timeline(screen_name=screenname,count=200,tweet_mode="extended")  

tweet,tweets_dates,text_query = [], [], ["CORONA","COVID"]
# while True:
#     text_queries = input("Enter a list of text queries seperated by a comma")
#     if not text_queries:
#         break
#     else:
#         text_query.append(text_queries)
#     print("Your input:", text_query)
# print("While loop has exited")

for status in tweets:
    for text in text_query:
        if text in status.full_text and detect(status.full_text)=="en" and "RT" not in status.full_text:
            tweet.append(status.full_text)
            if (datetime.utcnow()-status.created_at)<timedelta(1):
                tweets_dates.append(1)
            else:
                tweets_dates.append(0)
    
    
df = pd.DataFrame({"Tweets":tweet,"Most Recent":tweets_dates})
df.to_csv(screenname+'.csv')
# df

