from pydantic import BaseModel
from typing import List

class ArticleBase(BaseModel):
    title: str
    # reviews: List[str]