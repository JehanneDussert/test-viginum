from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional, Union
from scraping import scrape_reviews
from scraping_csv import calculate_percentage

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:4173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    print('hello')

@app.get("/articles/")
def get_all_articles():
    articles = scrape_reviews()
    
    return articles

@app.get("/keywords_from_csv/")
def get_all_articles():
    keywords = calculate_percentage()
    print('keywords: ', keywords)
    
    return keywords