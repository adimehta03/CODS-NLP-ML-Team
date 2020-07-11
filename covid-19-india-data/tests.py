#!/usr/bin/env python
# coding: utf-8

# In[111]:


import requests
import json
import csv
import numpy as np
import pandas as pd


# In[112]:


tests_day_wise = pd.read_csv('https://api.covid19india.org/csv/latest/tested_numbers_icmr_data.csv')

tests_day_wise.to_csv('./test_data/test_data/tests_day_wise.csv', index=False)

tests_day_wise.drop(columns=tests_day_wise.columns[3:],axis=1,inplace=True)
tests_day_wise.drop(columns=tests_day_wise.columns[1],axis=1,inplace=True)

tests_day_wise = tests_day_wise.fillna(0)

# tests_day_wise.columns

tests_day_wise["Total Samples Tested"] = tests_day_wise["Total Samples Tested"].astype(int)

tests_day_wise.columns = ["Date","Total Tested"]

tests_day_wise["Date"] = tests_day_wise["Date"].apply(lambda x:x.split()[0])

# tests_day_wise.tail(10)


# In[116]:


tests_state_wise = pd.read_csv('https://api.covid19india.org/csv/latest/statewise_tested_numbers_data.csv')

tests_state_wise.to_csv('./data/tests_state_wise.csv', index=False)

tests_state_wise.drop(columns=['Tag (Total Tested)','Tag (People in Quarantine)','Corona Enquiry Calls', 'Num Calls State Helpline', 'Source1',
        'Source2', 'Population NCP 2019 Projection','Cumulative People In Quarantine',
       'Total People Currently in Quarantine',
       'Total People Released From Quarantine', 'People in ICU',
       'People on Ventilators', 'Num Isolation Beds', 'Num ICU Beds',
       'Num Ventilators', 'Total PPE', 'Total N95 Masks','Tests per thousand','Tests per million','Unconfirmed','Test positivity rate','Tests per positive case'],axis=1,inplace=True)

if "Unnamed: 22" in tests_state_wise.columns:
    tests_state_wise.drop(columns=['Unnamed: 22'],axis=1,inplace=True)

tests_state_wise = tests_state_wise.fillna("Not Available")
tests_state_wise = tests_state_wise[tests_state_wise["Total Tested"]!="Not Available"]
tests_state_wise = tests_state_wise.reset_index(drop=True)
# tests_state_wise


# In[117]:


grp = tests_state_wise.groupby("State")
for i in tests_state_wise["State"].unique():
    group = grp.get_group(i)
    group.drop(columns="State",axis=1,inplace=True)
    group.to_csv('./test_data/state_test_data/'+i+'.csv',index=False)


# In[118]:


states = pd.read_csv('./test_data/state_test_data/Karnataka.csv')


# In[119]:


tests_per_day = [states["Total Tested"][0]]
for i in range(1,len(states["Total Tested"])):
    tests_per_day.append(states["Total Tested"][i]-states["Total Tested"][i-1])
states['Daily Tests'] = tests_per_day
tests_positivity_rate, tests_pp_case = [], []
for i in range(len(states["Total Tested"])):
    tests_positivity_rate.append((str(round((states["Positive"][i]/states["Total Tested"][i]*100),2)))+"%")
    tests_pp_case.append((str(round((states["Total Tested"][i]/states["Positive"][i]),0))))
states["Test positivity rate"] = tests_positivity_rate
states["Test per positive case"] = tests_pp_case


# In[120]:


# states

