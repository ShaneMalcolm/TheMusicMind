# flask_moderation_api.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np
import re
import string
from nltk.stem import PorterStemmer

app = Flask(__name__)
CORS(app)

try:
    with open('model/sentiment_lr_model.pickle', 'rb') as f:
        model = pickle.load(f)
except FileNotFoundError:
    print("Model file not found. Please check the file path.")
    exit(1)
except Exception as e:
    print(f"Error loading the model: {e}")
    exit(1)

vocab = pd.read_csv('model/vocab.txt', header=None)
tokens = vocab[0].tolist()

# Load stopwords
with open('model/corpora/stopwords/english', 'r') as file:
    english_stopwords = file.read().splitlines()

# Initialize stemmer
stemmer = PorterStemmer()

def remove_punctuations(text):
    for punctuation in string.punctuation:
        text = text.replace(punctuation, '')
    return text

def preprocessing(text):
    text = text.lower()
    text = re.sub(r'^https?:\/\/.*[\r\n]*', '', text, flags=re.MULTILINE)
    text = remove_punctuations(text)
    text = re.sub(r'\d+', '', text)
    text = " ".join([stemmer.stem(word) for word in text.split() if word not in english_stopwords])
    return text

def vectorizer(text, vocabulary):
    vectorized_lst = []
    sentence_lst = np.zeros(len(vocabulary))
    for i, word in enumerate(vocabulary):
        if word in text.split():
            sentence_lst[i] = 1
    vectorized_lst.append(sentence_lst)
    return np.asarray(vectorized_lst, dtype=np.float32)

def get_prediction(vectorized_txt):
    prediction = model.predict(vectorized_txt)
    return 'negative' if prediction == 1 else 'positive'

@app.route('/moderate', methods=['POST'])
def moderate_comment():
    data = request.json
    comment = data.get('comment', '')
    
    if not comment:
        return jsonify({'error': 'No comment provided'}), 400

    preprocessed_txt = preprocessing(comment)
    vectorized_txt = vectorizer(preprocessed_txt, tokens)
    prediction = get_prediction(vectorized_txt)
    
    return jsonify({'prediction': prediction})

if __name__ == "__main__":
    app.run(debug=True)
