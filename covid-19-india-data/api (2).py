#!/usr/bin/env python
# coding: utf-8

# # Data Source

# https://api.covid19india.org/  
# https://api.covid19india.org/csv/

# Total Confirmed Cases - https://public.flourish.studio/visualisation/2917845/ <br>
# Total Recovered - https://app.flourish.studio/visualisation/2917909/ <br>
# Confirmed vs Recovered - https://app.flourish.studio/visualisation/2917932/ <br>
# Confirmed vs Deceased - https://app.flourish.studio/visualisation/2917972/ <br>

# ## Import libraries

# In[24]:


import re
import requests
import json
import math
import csv
import numpy as np
import pandas as pd
import folium
from datetime import datetime
import matplotlib.pyplot as plt
import seaborn as sns
get_ipython().run_line_magic('matplotlib', 'inline')


# ## Daily cases

# In[25]:


day_wise = pd.read_csv('https://api.covid19india.org/csv/latest/case_time_series.csv')

# day_wise.to_csv('/home/adi/Desktop/CODS-NLP-ML-Team/covid-19-india-data/data/nation_level_daily.csv', index=False)

day_wise.to_csv('./data/nation_level_daily.csv', index=False)

# day_wise.tail()


# In[26]:


def timeformat(x):
    d = datetime.strptime(x, '%d %B , %Y')
    x = d.strftime('%Y-%m-%d')
    return x


# In[27]:


day_wise["Date"] = day_wise["Date"].apply(lambda x: x+", 2020")


# In[28]:


day_wise["Date"] = day_wise["Date"].apply(timeformat)


# In[29]:


# day_wise


# In[30]:


# no_rows = len(day_wise)-1
# perspective_deaths = math.floor(day_wise["Daily Deceased"][no_rows]/day_wise["Daily Confirmed"][no_rows]*100)


# In[31]:


# str(perspective_deaths)+" in 100 people die due to COVID-19 in India based on the current stats."


# ## Latest - State wise 

# In[32]:


latest = pd.read_csv('https://api.covid19india.org/csv/latest/state_wise.csv')

# latest.to_csv('/home/adi/Desktop/CODS-NLP-ML-Team/covid-19-india-data/data/state_level_latest.csv', index=False)
latest.to_csv('./data/state_level_latest.csv', index=False)
latest.drop(columns=["Migrated_Other","Delta_Confirmed","Delta_Recovered","Delta_Deaths","State_Notes"],axis=1,inplace=True)
latest.drop(latest.index[0],inplace=True)
latest.drop(latest.index[9],inplace=True)
latest.reset_index(drop=True)


# In[33]:


df = pd.read_html("https://distancelatlong.com/country/india#table table-striped setBorder")[2]


# In[35]:


latest = latest.sort_values('State')


# In[36]:


line = pd.DataFrame({"States": "Ladakh", "Latitude": 34.209515, "Longitude":77.615112}, index=[17])
df2 = pd.concat([df.iloc[:16], line, df.iloc[16:]]).reset_index(drop=True)
line1 = pd.DataFrame({"States": "Gujarat", "Latitude": 22.2587, "Longitude":71.1924}, index=[11])
df3 = pd.concat([df2.iloc[:10], line1, df2.iloc[10:]]).reset_index(drop=True)
line2 = pd.DataFrame({"States": "Telangana", "Latitude": 18.1124, "Longitude":79.0193}, index=[32])
df4 = pd.concat([df3.iloc[:31], line2, df3.iloc[31:]]).reset_index(drop=True)
df4.sort_values("States")
df4.reset_index(drop=True)
df = df4


# In[37]:


df = df.sort_values("States")
df.drop(columns="States",axis=1,inplace=True)


# In[38]:


latest = latest.reset_index(drop=True)
latest = pd.concat([latest,df],axis=1)


# In[39]:


# latest


# In[40]:


# latest["Last_Updated_Time"] = latest["Last_Updated_Time"].apply(lambda x:x.split()[0])


# In[41]:


# tests_state_wise = tests_state_wise.reset_index(drop=True)
latest = latest.astype(str)
latest.to_csv("latest.csv",index=False)


# In[42]:


# india = folium.Map(location = [20.5937,78.9629],zoom_start=4.5)

# for date,state,lat,long,total_cases,Death,Recov,Active in zip(list(latest["Last_Updated_Time"]),list(latest['State']),list(latest['Latitude']),list(latest['Longitude']),list(latest['Confirmed']),list(latest['Deaths']),list(latest['Recovered']),list(latest['Active'])):
#     folium.CircleMarker(location = [lat,long],
#                        radius = 5,
#                        color='red',
#                        fill = True,
#                        fill_color="red").add_to(india)
#     folium.Marker(location = [lat,long],
#                   popup=folium.Popup(('<strong><font color= blue>Last updated : '+date+'</font></striong><br>' +
#                     '<strong><b>State  : '+state+'</strong> <br>' +
#                     '<strong><b>Total Cases : '+total_cases+'</striong><br>' +
#                     '<strong><font color= red>Deaths : </font>'+Death+'</striong><br>' +
#                     '<strong><font color=green>Recoveries : </font>'+Recov+'</striong><br>'+
#                     '<strong><b>Active Cases : '+Active+'</striong>'  ),max_width=200)).add_to(india)
# india


# In[43]:


# india.save(outfile="india.html")

