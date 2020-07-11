#!/usr/bin/env python
# coding: utf-8

# In[2]:


from datetime import datetime
import os
import re
import glob
import requests 
import pandas as pd
from bs4 import BeautifulSoup
import re
import numpy as np
import folium


# In[3]:


link = 'https://www.worldometers.info/coronavirus/'
req = requests.get(link)
soup = BeautifulSoup(req.content, "html.parser")


# In[4]:


thead = soup.find_all('thead')[-1]
head = thead.find_all('tr')
tbody = soup.find_all('tbody')[0]
body = tbody.find_all('tr')


# In[5]:


head_rows = []
body_rows = []
for tr in head:
    td = tr.find_all(['th', 'td'])
    row = [i.text for i in td]
    head_rows.append(row)
# print(head_rows)

for tr in body:
    td = tr.find_all(['th', 'td'])
    row = [i.text for i in td]
    body_rows.append(row)
# print(head_rows)


# In[6]:


df_bs = pd.DataFrame(body_rows[:len(body_rows)-6], 
                     columns=head_rows[0])         
# df_bs.head(5)


# In[7]:


df_bs = df_bs.iloc[8:, :-3].reset_index(drop=True)
df_bs = df_bs.drop('#', axis=1)
# df_bs.head()


# In[8]:


df_bs.columns = ['Country/Region', 'TotalCases', 'NewCases', 'TotalDeaths', 'NewDeaths',
       'TotalRecovered', 'NewRecovered', 'ActiveCases', 'Serious,Critical',
       'Tot Cases/1M pop', 'Deaths/1M pop', 'TotalTests', 'Tests/1M pop',
       'Population', 'Continent']
df_bs = df_bs[['Country/Region', 'Continent', 'Population', 'TotalCases', 'NewCases', 'TotalDeaths', 'NewDeaths',
       'TotalRecovered', 'NewRecovered', 'ActiveCases', 'Serious,Critical',
       'Tot Cases/1M pop', 'Deaths/1M pop', 'TotalTests', 'Tests/1M pop' ]]
# df_bs.head()


# In[9]:


who_region = {}

# African Region AFRO
afro = "Algeria, Angola, Cabo Verde, Congo, DRC, Eswatini, Sao Tome and Principe, Benin, South Sudan, Western Sahara, Congo (Brazzaville), Congo (Kinshasa), Cote d'Ivoire, Botswana, Burkina Faso, Burundi, Cameroon, Cape Verde, Central African Republic, Chad, Comoros, Ivory Coast, Democratic Republic of the Congo, Equatorial Guinea, Eritrea, Ethiopia, Gabon, Gambia, Ghana, Guinea, Guinea-Bissau, Kenya, Lesotho, Liberia, Madagascar, Malawi, Mali, Mauritania, Mauritius, Mozambique, Namibia, Niger, Nigeria, Republic of the Congo, Rwanda, São Tomé and Príncipe, Senegal, Seychelles, Sierra Leone, Somalia, South Africa, Swaziland, Togo, Uganda, Tanzania, Zambia, Zimbabwe"
afro = [i.strip() for i in afro.split(',')]
for i in afro:
    who_region[i] = 'Africa'
    
# Region of the Americas PAHO
paho = 'Antigua and Barbuda, Argentina, Bahamas, Barbados, Belize, Bermuda, Bolivia, Brazil, Canada, Chile, Colombia, Costa Rica, Cuba, Dominica, Dominican Republic, Ecuador, El Salvador, Grenada, Guatemala, Guyana, Haiti, Honduras, Jamaica, Mexico, Nicaragua, Panama, Paraguay, Peru, Saint Kitts and Nevis, Saint Lucia, Saint Vincent and the Grenadines, Suriname, Trinidad and Tobago, United States, US, USA, Uruguay, Venezuela'
paho = [i.strip() for i in paho.split(',')]
for i in paho:
    who_region[i] = 'Americas'

# South-East Asia Region SEARO
searo = 'Bangladesh, Bhutan, North Korea, India, Indonesia, Maldives, Myanmar, Burma, Nepal, Sri Lanka, Thailand, Timor-Leste'
searo = [i.strip() for i in searo.split(',')]
for i in searo:
    who_region[i] = 'South-East Asia'

# European Region EURO
euro = 'Albania, Andorra, Greenland, Kosovo, Holy See, Vatican City, Liechtenstein, Armenia, Czechia, Austria, Azerbaijan, Belarus, Belgium, Bosnia and Herzegovina, Bulgaria, Croatia, Cyprus, Czech Republic, Denmark, Estonia, Finland, France, Georgia, Germany, Greece, Hungary, Iceland, Ireland, Israel, Italy, Kazakhstan, Kyrgyzstan, Latvia, Lithuania, Luxembourg, Malta, Monaco, Montenegro, Netherlands, North Macedonia, Norway, Poland, Portugal, Moldova, Romania, Russia, San Marino, Serbia, Slovakia, Slovenia, Spain, Sweden, Switzerland, Tajikistan, Turkey, Turkmenistan, Ukraine, United Kingdom, UK, Uzbekistan'
euro = [i.strip() for i in euro.split(',')]
for i in euro:
    who_region[i] = 'Europe'

# Eastern Mediterranean Region EMRO
emro = 'Afghanistan, Bahrain, Djibouti, Egypt, Iran, Iraq, Jordan, Kuwait, Lebanon, Libya, Morocco, Oman, Pakistan, Palestine, West Bank and Gaza, Qatar, Saudi Arabia, Somalia, Sudan, Syria, Tunisia, United Arab Emirates, UAE, Yemen'
emro = [i.strip() for i in emro.split(',')]
for i in emro:
    who_region[i] = 'Eastern Mediterranean'

# Western Pacific Region WPRO
wpro = 'Australia, Brunei, Cambodia, China, Cook Islands, Fiji, Japan, Hong Kong, Kiribati, Laos, Malaysia, Marshall Islands, Micronesia, Mongolia, Nauru, New Zealand, Niue, Palau, Papua New Guinea, Philippines, South Korea, S. Korea, Samoa, Singapore, Solomon Islands, Taiwan, Taiwan*, Tonga, Tuvalu, Vanuatu, Vietnam'
wpro = [i.strip() for i in wpro.split(',')]
for i in wpro:
    who_region[i] = 'Western Pacific'


# In[10]:


df_bs['WHO Region'] = df_bs['Country/Region'].map(who_region)


# In[11]:


for col in df_bs.columns[2:]:
    df_bs[col] = df_bs[col].str.replace('[,+ ]', '', regex=True)
    df_bs[col] = df_bs[col].str.replace('N/A', '', regex=False)
df_bs = df_bs.replace('', np.nan)
df_bs = df_bs.fillna("Not Available")
df_bs = df_bs.astype(str)
df_bs.drop(columns=['NewCases','NewDeaths','NewRecovered','Serious,Critical'],axis=1,inplace=True)
df_bs.sort_values(by=["Country/Region"],inplace=True)
df_bs.drop(df_bs[df_bs["Continent"]=="Not Available"].index,axis=0,inplace=True)
df_bs = df_bs.reset_index(drop=True)


# In[12]:


df_bs.to_csv('worldometer_data.csv', index=False)


# In[13]:


df=pd.read_csv('worldometer_data.csv')
df=df.set_index(df['Country/Region'])
# df.head()


# In[14]:


countries = pd.read_html("https://developers.google.com/public-data/docs/canonical/countries_csv")[0]
countries=countries.set_index(countries['name'])
# countries.head()


# In[15]:


lat,long=[],[]
m_lat,m_long=[],[]
for country in df['Country/Region']:
    try:
        lat.append((country,countries.loc[country.strip()]['latitude']))
    except:
        m_lat.append(country)
for country in df['Country/Region']:
    try:
        long.append((country,countries.loc[country.strip()]['longitude']))
    except:
        m_long.append(country)

# m_lat


# In[16]:


s=''
for i in m_lat:
    s+='("{}",),'.format(i)
# print(s)


# In[17]:


lat+=[("CAR",6.111),("Cabo Verde",6.5388),("Channel Islands",49.372284),("Congo",-0.2280),("Curaçao",12.1696),("Czechia",49.8175),("DRC",-4.0383),("Eswatini",-26.5225),("Faeroe Islands",61.8926),("Falkland Islands",-51.7963),("Ivory Coast",7.5400),("Macao",22.1987),("Myanmar",21.9162),("North Macedonia",41.6086),("Palestine",31.9522),("S. Korea",35.9078),("Saint Martin",18.0826),("Sao Tome and Principe",0.1864),("Sint Maarten",18.0425),("South Sudan",6.8770),("St. Vincent Grenadines",12.9843),("Turks and Caicos",21.6940),("UAE",23.4241),("UK",55.3781),("USA",37.0902)]

long+=[("CAR",23.9394),("Cabo Verde",-23.0418),("Channel Islands",-2.364351),("Congo",15.8277),("Curaçao",-68.99),("Czechia",15.473),("DRC",-21.7587),("Eswatini",31.4659),("Faeroe Islands",-6.9118),("Falkland Islands",-59.5236),("Ivory Coast",5.5471),("Macao",113.5439),("Myanmar",95.956),("North Macedonia",21.7453),("Palestine",35.2332),("S. Korea",127.7669),("Saint Martin",63.0523),("Sao Tome and Principe",6.6131),("Sint Maarten",-63.0548),("South Sudan",31.307),("St. Vincent Grenadines",-61.2872),("Turks and Caicos",-71.7979),("UAE",53.8478),("UK",-3.436),("USA",-95.7129)]


# In[18]:


del df["Country/Region"]
lat.sort()
long.sort()
df.sort_values("Country/Region",inplace=True)
# df.head()


# In[20]:


df['Latitude']=[x[1] for x in lat]
df['Longitude']=[y[1] for y in long]
# df.tail()


# In[21]:


df=df.reset_index()
# df.head()


# In[23]:


# map = folium.Map(location=[50,50], max_bounds = True, zoom_start=1.5,min_zoom=1,width='100%',height='100%')

# for country,lat,long, cases, deaths, recovered, active, tests in zip(list(df["Country/Region"]),list(df['Latitude']),list(df['Longitude']),list(df["TotalCases"]),list(df["TotalDeaths"]),list(df["TotalRecovered"]),list(df["ActiveCases"]),list(df["TotalTests"])):
#     folium.CircleMarker(location = [lat,long],
#                        radius = 5,
#                        color='red',
#                        fill = True,
#                        fill_color="red").add_to(map)
#     folium.Marker(location = [lat,long],
#                   popup=folium.Popup(('<strong><font color= blue>Country : '+country+'</font></striong><br>'+
#                             '<strong>Total Cases : '+str(cases)+'</striong><br>'+
#                             '<strong><font color = red>Total Deaths : '+str(deaths)+'</font></striong><br>'+
#                             '<strong><font color = green>Total Recovered : '+str(recovered)+'</font></striong><br>'+
#                             '<strong>Active Cases : '+str(active)+'</striong><br>'+
#                             '<strong>Total Tests : '+str(tests)+'</striong><br>'),max_width=200)).add_to(map)
# map

