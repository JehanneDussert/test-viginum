import requests
from bs4 import BeautifulSoup
from typing import List 
from schemas import ArticleBase
from requests.exceptions import TooManyRedirects

def scrape_links(url: str) -> List[str]:
    list_links = []
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")

        articles = soup.find_all("article")
        
        for article in articles:
            a = article.find("a")
            link = a.get('href')
            if link.startswith("/"):
                full_link = url + link
            else:
                full_link = link
            list_links.append(full_link)
    
    return list_links[:10]

def scrape_reviews():
    url = "https://www.francetvinfo.fr"
    urls = scrape_links(url)
    articles = []
    
    for url in urls:
        print('url: ', url)
        try:
            response = requests.get(url, allow_redirects=False)
            response.raise_for_status() 
        except TooManyRedirects as e:
            print(f"Too many redirects for {url}: {e}")
            continue
        except requests.exceptions.RequestException as e:
            print(f"Error fetching {url}: {e}")
            continue

        if response.status_code == 200:
            soup = BeautifulSoup(response.content, "html.parser")
            h1 = soup.find('h1', class_="c-title")
            
            if h1:
                title = ''.join([text for text in h1.contents if isinstance(text, str)]).strip()
                new_article = ArticleBase(title=title)
                articles.append(new_article)

    return articles
