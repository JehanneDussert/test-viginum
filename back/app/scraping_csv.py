import csv
from collections import Counter

def count_keywords():
    csv_file = 'test.csv' 
    keyword_counts = Counter()

    with open(csv_file, 'r', encoding='utf-8-sig') as file:
        reader = csv.reader(file)
        next(reader)

        for row in reader:
            keyword = row[4].strip()
            keyword_counts[keyword] += 1

    return keyword_counts

def get_top_keywords(keyword_counts):
    top_keywords = keyword_counts.most_common(10)
    print("Top 10 keywords:")
    for keyword, count in top_keywords:
        print(f"{keyword}: {count} occurrences")
        
    return top_keywords


def calculate_percentage():
    keyword_counts = count_keywords()
    top_keywords = get_top_keywords(keyword_counts)

    total_keywords = sum(keyword_counts.values())

    top_keywords_with_percentage = []
    for keyword, count in top_keywords:
        percentage = (count / total_keywords) * 100
        top_keywords_with_percentage.append({
            'keyword': keyword,
            'count': count,
            'percentage': round(percentage, 2) 
        })

    return top_keywords_with_percentage