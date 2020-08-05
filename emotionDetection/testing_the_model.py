from tensorflow import keras
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
import numpy as np
from tensorflow.keras.models import load_model
import re
from nltk.corpus import stopwords
from nltk import word_tokenize
from nltk.stem import WordNetLemmatizer 
STOPWORDS = set(stopwords.words('english'))

model = load_model('D:\\Python\\CODS-COVID-19\\covid19_sentiment_bot\\emotion detection\\emotionClassifierMain.h5')

print(model.weights)

REPLACE_BY_SPACE_RE = re.compile('[/(){}\[\]\|@,;]')
BAD_SYMBOLS_RE = re.compile('[^0-9a-z #+_]')
STOPWORDS = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer() 


def clean_text(text):
    
    text = [lemmatizer.lemmatize(word,pos="v") for word in text.split() if word not in STOPWORDS]
    text= ' '.join(text)
    text = [lemmatizer.lemmatize(word,pos="a") for word in text.split() if word not in STOPWORDS]
    text= ' '.join(text)
    text = text.lower() # lowercase text
    text = REPLACE_BY_SPACE_RE.sub(' ', text) # replace REPLACE_BY_SPACE_RE symbols by space in text. substitute the matched string in REPLACE_BY_SPACE_RE with space.
    text = BAD_SYMBOLS_RE.sub('', text) # remove symbols which are in BAD_SYMBOLS_RE from text. substitute the matched string in BAD_SYMBOLS_RE with nothing. 
    return text


MAX_SEQUENCE_LENGTH = 250
tokenizer = Tokenizer(num_words=50000, filters='!"#$%&()*+,-./:;<=>?@[\]^_`{|}~', lower=True)

new_complaint = ['i am anxious about COVID-19']
new_complaint = [clean_text(new_complaint[0])]
seq = tokenizer.texts_to_sequences(new_complaint)
padded = pad_sequences(seq, maxlen=MAX_SEQUENCE_LENGTH)
pred = model.predict(padded)
labels = ['anger','fear','joy','love','sadness','surprise']
print(pred, labels[np.argmax(pred)])