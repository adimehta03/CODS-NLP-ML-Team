
from langdetect import detect
from selenium import webdriver

import time
from datetime import datetime
from datetime import timedelta

import numpy as np
import pandas as pd

class FilterData():
    '''
    Feature Extracting including removing Retweets, tweets which are in languages other than English and filtering out 
    tweets based on the text_query
    '''
    def tweets_to_data_frame(tweets):
        df = pd.DataFrame(data=[tweet.text for tweet in tweets], columns=['Tweets'])
        df['Date Created'] = np.array([tweet.created_at for tweet in tweets])
        df["24H"] = df["Date Created"].apply(lambda x: 0 if (datetime.utcnow()-x)>timedelta(1) else 1)
        df.drop(columns=["Date Created"],axis=1,inplace=True)
        df['likes'] = np.array([tweet.favorite_count for tweet in tweets])
        df.drop(df[df['likes']<=1000].index,inplace=True)
        df.drop(columns="likes",inplace=True)
        return df
    
    def filter_RT():
        df["Retweets"] = df["Tweets"].apply(lambda x: True if x[:2]=="RT" else False)
        df.drop(df[df["Retweets"]==True].index,inplace=True)
        df.drop(columns=["Retweets"],axis=1,inplace=True)
        df.index = [i for i in range(df["Tweets"].count())]
    
    def filter_lang():
        df["Lang"] = df["Tweets"].apply(lambda x: False if detect(x)=="en" else True)
        df.drop(df[df["Lang"]==True].index,inplace=True)
        df.drop(columns=["Lang"],axis=1,inplace=True)
        df.index = [i for i in range(df["Tweets"].count())]
    
    def filter_tweets(t):
        text_query = ["#COVID-19","#COVID19","COVID-19","CORONA","CORONAINDIA","#COVID19INDIA","COVID19INDIA"]
        for i in df["Tweets"]:
            for j in text_query:
                if j in i:
                    t.append(i)
        return t
    
    def filter_c_tweets(t):
        df["C-Tweets"] = df["Tweets"].apply(lambda x: False if x in list(set(t)) else True)
        df.drop(df[df["C-Tweets"] == True].index,inplace=True)
        df.drop(columns="C-Tweets",axis=1,inplace=True)
        df.index = [i for i in range(df["Tweets"].count())]
        
    def filter_url(urls): 
        df["Tweets"].apply(lambda x: urls.append(x[x.find("https://"):]) if "https://" in x else urls.append("False"))
        return urls
        
    def replace_tweet(urls):
            count = 0
            for i in range(1):
                driver = webdriver.Chrome(executable_path='C:\Program Files (x86)\Google\Chrome\Application\chromedriver.exe') #the path where chromedriver.exe is installed in your local system
                if urls[i] != "0":
                    driver.get(urls[i])
                    time.sleep(10)
                    elements = []
                    for i in range(2, 4):
                        try:
                            elements.append(driver.find_elements_by_xpath('/html/body/div/div/div/div[2]/main/div/div/div/div/div/div/div/section/div/div/div/div[' + str(i) + ']/div/div/div/div/article/div/div[2]/div[2]/div[2]/div[1]/div/span'))
                        except:
                            continue
                    for i in elements:
                         for j in i:
                                df.replace(to_replace = df["Tweets"][count],value = j.text,inplace=True)
                                count += 1
            #                 print(type(j.text))
                    driver.close()
                else:
                    pass