import numpy as np 
import pandas as pd
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Embedding, LSTM, SpatialDropout1D
from sklearn.model_selection import train_test_split
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.layers import Dropout
import re
from nltk.corpus import stopwords
from nltk import word_tokenize
from nltk.stem import WordNetLemmatizer 
STOPWORDS = set(stopwords.words('english'))
from tensorflow.keras.models import load_model
import pickle


loaded_model = load_model('.\emotionClassifierMainFromPY.h5')

# print(loaded_model.weights)

REPLACE_BY_SPACE_RE = re.compile('[/(){}\[\]\|@,;]')
BAD_SYMBOLS_RE = re.compile('[^0-9a-z #+_]')
STOPWORDS = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer() 

def clean_text(text):
    text = text.lower() # lowercase text
    text = [lemmatizer.lemmatize(word,pos="v") for word in text.split() if word not in STOPWORDS]
    text= ' '.join(text)
    text = [lemmatizer.lemmatize(word,pos="a") for word in text.split() if word not in STOPWORDS]
    text= ' '.join(text)
    
    text = REPLACE_BY_SPACE_RE.sub(' ', text) # replace REPLACE_BY_SPACE_RE symbols by space in text. substitute the matched string in REPLACE_BY_SPACE_RE with space.
    text = BAD_SYMBOLS_RE.sub('', text) # remove symbols which are in BAD_SYMBOLS_RE from text. substitute the matched string in BAD_SYMBOLS_RE with nothing. 
    text = text.replace('\d+', '')
    return text


# The maximum number of words to be used. (most frequent)
MAX_NB_WORDS = 50000
# Max number of words in each complaint.
MAX_SEQUENCE_LENGTH = 250

EMBEDDING_DIM = 100

f = open('Tokenizer.pkl','rb')
tokenizer = pickle.load(f)
f.close()

new_complaint = ['i am scared of COVID-19']
new_complaint = [clean_text(new_complaint[0])]
seq = tokenizer.texts_to_sequences(new_complaint)
padded = pad_sequences(seq, maxlen=MAX_SEQUENCE_LENGTH)
pred = loaded_model.predict(padded)
labels = ['anger','fear','joy','love','sadness','surprise']
print(pred, labels[np.argmax(pred)])
