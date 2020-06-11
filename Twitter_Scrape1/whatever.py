import tweepy
from tweepy import API 
from tweepy import Cursor
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
 
# import twitter_credentials
consumer_key = "cFf7im7BH68xO9qh3zEsv3nFz"
consumer_secret = "2QyodEVK63XYE5D9RFPAo0I53rhBOsNocQGpGB8rapmEqxDnJi"
access_token = "1265319352795975680-EJBIU55ZHZnjn8svR420cqVuU9evRL"
access_token_secret = "i8h2utF6b2l2Uh7Vpg6c2mnPOO1CuthGdbyWtHSWdIURP"


# # # # TWITTER CLIENT # # # #
class TwitterClient():
    def __init__(self, twitter_user=None):
        self.auth = TwitterAuthenticator().authenticate_twitter_app()
        self.twitter_client = API(self.auth)

        self.twitter_user = twitter_user

    def get_twitter_client_api(self):
        return self.twitter_client

    
# # # # TWITTER AUTHENTICATER # # # #
class TwitterAuthenticator():

    def authenticate_twitter_app(self):
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        return auth
    
