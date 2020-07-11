#!/usr/bin/env python
# coding: utf-8

# https://public.flourish.studio/visualisation/2906911/
# # For website -

# div class="flourish-embed flourish-bar-chart-race" data-src="visualisation/2906911" data-url="https://flo.uri.sh/visualisation/2906911/embed"><script src="https://public.flourish.studio/resources/embed.js"></script></div

# In[2]:


import pandas as pd


# In[3]:


df = pd.read_csv('covid_19_clean_complete.csv')
df = df.groupby(['Date', 'Country/Region'])['Confirmed'].sum().reset_index()
df['Date'] = pd.to_datetime(df['Date'])
df = df.sort_values('Date')
df = df.pivot(index='Country/Region', columns='Date', values='Confirmed').reset_index()
# df.head()


# In[4]:


df.to_csv('flurish_data.csv')

