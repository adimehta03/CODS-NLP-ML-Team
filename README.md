# CODS-NLP-ML-Team
The aim of this project is to create a chatbot which can provide emotional support through this global pandemic (COVID-19). The project
is primarily composed of 3 parts:

(i)   Scraping the web for all relevant articles and blogs.
(ii)  Creating a website which consists of updates, stats and the chatbot
(iii) Creating a chatbot with sentimental analysis models.
 
To run the chatbot, run the following commands in your anaconda prompt ->
  1. Create a new virtual environment with the required modules :
  
    `conda create --name venv python==3.7.6 ujson==2.0.3 tensorflow==2.1.0 rasa==1.10.0 pip`
 
 OR
    
  1. Downloading pip in conda :
  
    ```conda install pip```
  2. Running the requirements.txt to install all the required modules in the created environment instead of installing it      globally:
  
      ```pip install -r requirements.txt```
      
Activate the virtual envirnoment :

  ```conda activate venv```
  
  
Note: To run tensorflow on windows, you need to install Visual C++ - https://support.microsoft.com/en-us/help/2977003/the-latest-supported-visual-c-downloads

To initialise Rasa and train your model : rasa init

