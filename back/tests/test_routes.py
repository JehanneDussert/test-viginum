import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.schemas import UserCreate, User
from app.database import engine, Base
from sqlalchemy.orm import Session

client = TestClient(app)

def test_delete_user():
    Base.metadata.create_all(bind=engine)
    
    new_user = {"title": "test", "type": "test"}
    response = client.post("/users/", json=new_user)
    assert response.status_code == 200
    user_id = response.json()["id"]

    response = client.delete(f"/users/?user_id={user_id}")
    assert response.status_code == 200

    response = client.get(f"/users/{user_id}")
    assert response.status_code == 404
    
    Base.metadata.drop_all(bind=engine)
        
def test_get_users():
    Base.metadata.create_all(bind=engine)
    response = client.get('/users/')

    assert response.status_code == 200
    assert len(response.json()) == 0
    
    Base.metadata.drop_all(bind=engine)
  
def test_post_user():
    Base.metadata.create_all(bind=engine)
    user_data = {'title': 'test_user', 'type': 'test_type'}
    response = client.post('/users/', json=user_data)
    # user_create = UserCreate(**user_data)
        
    assert response.status_code == 200
    response = client.get('/users/')
    assert response.json()[0] == {
        'title': 'test_user',
        'type': 'test_type',
        'id': 1,
    }
    
    Base.metadata.drop_all(bind=engine)