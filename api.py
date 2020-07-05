import re
import requests
import json
import math
import csv
import numpy as np
import pandas as pd
from datetime import datetime
import matplotlib.pyplot as plt
import seaborn as sns


day_wise = pd.read_csv('https://api.covid19india.org/csv/latest/case_time_series.csv')

day_wise.to_csv('./data/nation_level_daily.csv', index=False)


def timeformat(x):
    d = datetime.strptime(x, '%d %B , %Y')
    x = d.strftime('%Y-%m-%d')
    return x


day_wise["Date"] = day_wise["Date"].apply(lambda x: x+", 2020")


day_wise["Date"] = day_wise["Date"].apply(timeformat)

no_rows = len(day_wise)-1
perspective_deaths = math.floor(day_wise["Daily Deceased"][no_rows]/day_wise["Daily Confirmed"][no_rows]*100)


day_wise.to_csv('./data/nation_level_daily.csv', index=False)
day_wise.to_json('./data/nation_level_daily.json')

# str(perspective_deaths)+" in 100 people die due to COVID-19 in India based on the current stats."



latest = pd.read_csv('https://api.covid19india.org/csv/latest/state_wise.csv')

latest.to_csv('./data/state_level_latest.csv', index=False)
latest.drop(columns=["Migrated_Other","Delta_Confirmed","Delta_Recovered","Delta_Deaths","State_Notes"],axis=1,inplace=True)
latest.drop(latest.index[0],inplace=True)
latest.drop(latest.index[9],inplace=True)
latest.reset_index(drop=True)



df = pd.read_html("https://distancelatlong.com/country/india#table table-striped setBorder")

df = df[2]



latest = latest.sort_values('State')



line = pd.DataFrame({"States": "Ladakh", "Latitude": 34.209515, "Longitude":77.615112}, index=[17])
df2 = pd.concat([df.iloc[:16], line, df.iloc[16:]]).reset_index(drop=True)
line1 = pd.DataFrame({"States": "Gujarat", "Latitude": 22.2587, "Longitude":71.1924}, index=[11])
df3 = pd.concat([df2.iloc[:10], line1, df2.iloc[10:]]).reset_index(drop=True)
line2 = pd.DataFrame({"States": "Telangana", "Latitude": 18.1124, "Longitude":79.0193}, index=[32])
df4 = pd.concat([df3.iloc[:31], line2, df3.iloc[31:]]).reset_index(drop=True)
df4.sort_values("States")
df4.reset_index(drop=True)
df = df4



df = df.sort_values("States")
df.drop(columns="States",axis=1,inplace=True)



latest = latest.reset_index(drop=True)
latest = pd.concat([latest,df],axis=1)





latest["Last_Updated_Time"] = latest["Last_Updated_Time"].apply(lambda x:x.split()[0])



latest = latest.astype(str)
latest.to_csv("latest.csv",index=False)
latest.to_json("latest.json")