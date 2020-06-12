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

tweets = api.user_timeline(screen_name=screenname,count=20,tweet_mode="extended")  
tweet, tweets_dates, img_url, img = [], [], [], []

for status in tweets:
    if "Covid19 Bulletin:" in status.full_text:
        tweet.append(status.full_text)
        tweets_dates.append(status.created_at)
        for media in status.extended_entities['media']:
            img_url.append(media['media_url'])
            
for i in range(1,len(img_url),4):
    try:
        img.append(img_url[i])
    except:
        pass
    
df = pd.DataFrame({"Tweets":tweet,"Date Created":tweets_dates,"Image URL":img})
df.to_csv(screenname+'.csv')
df