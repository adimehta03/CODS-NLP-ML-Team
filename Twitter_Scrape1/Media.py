#!/usr/bin/env python
# coding: utf-8

# In[1]:


import tweepy
import json
import pandas as pd

# import twitter_credentials
consumer_key = "cFf7im7BH68xO9qh3zEsv3nFz"
consumer_secret = "2QyodEVK63XYE5D9RFPAo0I53rhBOsNocQGpGB8rapmEqxDnJi"
access_key = "1265319352795975680-EJBIU55ZHZnjn8svR420cqVuU9evRL"
access_secret = "i8h2utF6b2l2Uh7Vpg6c2mnPOO1CuthGdbyWtHSWdIURP"

auth = tweepy.OAuthHandler(consumer_key, consumer_secret) 
auth.set_access_token(access_key, access_secret) 
api = tweepy.API(auth) 

screenname = "CMofKarnataka"
tweet, tweets_dates, img_url, img = [], [], [], []

tweets = api.user_timeline(screen_name=screenname,count=200,tweet_mode="extended")  

for status in tweets:
    if "Total Confirmed Cases: " in status.full_text:
        tweet.append(status.full_text)
        tweets_dates.append(status.created_at)
        for media in status.extended_entities['media']:
            img_url.append(media['media_url'])
        img.append(img_url)
        img_url=[]    
for i in img:
    img_url.append(i[1])
df = pd.DataFrame({"Image URL":img_url})
df.to_csv(screenname+'.csv')
# df


# In[2]:


import tweepy
import json
import pandas as pd

# import twitter_credentials
consumer_key = "cFf7im7BH68xO9qh3zEsv3nFz"
consumer_secret = "2QyodEVK63XYE5D9RFPAo0I53rhBOsNocQGpGB8rapmEqxDnJi"
access_key = "1265319352795975680-EJBIU55ZHZnjn8svR420cqVuU9evRL"
access_secret = "i8h2utF6b2l2Uh7Vpg6c2mnPOO1CuthGdbyWtHSWdIURP"

auth = tweepy.OAuthHandler(consumer_key, consumer_secret) 
auth.set_access_token(access_key, access_secret) 
api = tweepy.API(auth) 

screenname = "CMofKarnataka"
tweet, tweets_dates, img_url, img = [], [], [], []

tweets = api.user_timeline(screen_name=screenname,count=200,tweet_mode="extended")  
tweet = []
tweets_dates = []
img_url = []
img = []

for status in tweets:
    if "Total Confirmed Cases: " in status.full_text:
        tweet.append(status.full_text)
        tweets_dates.append(status.created_at)
        for media in status.extended_entities['media']:
            img_url.append(media['media_url'])
        img.append(img_url)
        img_url=[]    
for i in img:
    img_url.append(i[1])
df = pd.DataFrame({"Tweets":tweet,"Date Created":tweets_dates,"Image URL":img_url})
df.to_csv(screenname+'.csv')
df["Date Created"]=df['Date Created'].dt.date
# df


# In[3]:


case  = []
title = []
cases = []
for i in tweet:
    index = i.split("\n").index('')
    val = i.split("\n")
    rindex = (len(val) -1) - list(reversed(val)).index('')
    split_tweets = (val[index+1:rindex])

    count = 0
    for i in split_tweets:
            count += 1
            title.append(i.split(': ')[0])
            case.append((i.split(": ")[1]))
#             print(i.split(": "))
            if count == 4:
                break
    cases.append(case)
    case = []
title = title[:4]
# print(cases,title)


# In[4]:


df2 = pd.DataFrame(columns = title, data = cases)


# In[5]:


df2["Date Created"] = df["Date Created"]


# In[6]:


# df2

