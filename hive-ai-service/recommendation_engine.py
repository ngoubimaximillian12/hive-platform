from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

app = FastAPI()

class User(BaseModel):
    id: int
    skills: List[str]
    interests: List[str]
    location: Optional[str]

class RecommendationRequest(BaseModel):
    user: User
    all_users: List[User]
    recommendation_type: str  # 'users', 'skills', 'events'

class ContentModerationRequest(BaseModel):
    text: str
    
class SmartSearchRequest(BaseModel):
    query: str
    content: List[dict]

# AI-powered user matching
@app.post("/api/ai/recommend-users")
async def recommend_users(request: RecommendationRequest):
    """Find similar users based on skills and interests"""
    try:
        current_user = request.user
        all_users = request.all_users
        
        # Create feature vectors
        def create_feature_string(user):
            return " ".join(user.skills + user.interests)
        
        # Get feature strings
        current_features = create_feature_string(current_user)
        other_features = [create_feature_string(u) for u in all_users if u.id != current_user.id]
        other_user_ids = [u.id for u in all_users if u.id != current_user.id]
        
        if not other_features:
            return {"recommendations": []}
        
        # Calculate similarity
        vectorizer = TfidfVectorizer()
        all_features = [current_features] + other_features
        tfidf_matrix = vectorizer.fit_transform(all_features)
        
        similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()
        
        # Get top 10 matches
        top_indices = similarities.argsort()[-10:][::-1]
        
        recommendations = [
            {
                "user_id": other_user_ids[i],
                "similarity_score": float(similarities[i]),
                "match_percentage": int(similarities[i] * 100)
            }
            for i in top_indices if similarities[i] > 0.1
        ]
        
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Content moderation
@app.post("/api/ai/moderate-content")
async def moderate_content(request: ContentModerationRequest):
    """Check if content is appropriate"""
    try:
        text = request.text.lower()
        
        # Simple keyword-based moderation (in production, use ML models)
        inappropriate_words = [
            'spam', 'scam', 'hate', 'offensive', 'inappropriate'
        ]
        
        flags = []
        toxicity_score = 0
        
        for word in inappropriate_words:
            if word in text:
                flags.append(word)
                toxicity_score += 0.2
        
        is_safe = toxicity_score < 0.3
        
        return {
            "is_safe": is_safe,
            "toxicity_score": min(toxicity_score, 1.0),
            "flags": flags,
            "action": "approve" if is_safe else "review"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Smart search with NLP
@app.post("/api/ai/smart-search")
async def smart_search(request: SmartSearchRequest):
    """Enhanced search with semantic understanding"""
    try:
        query = request.query.lower()
        content = request.content
        
        if not content:
            return {"results": []}
        
        # Extract text from content
        content_texts = [
            f"{item.get('title', '')} {item.get('description', '')} {item.get('category', '')}"
            for item in content
        ]
        
        # TF-IDF similarity
        vectorizer = TfidfVectorizer()
        all_texts = [query] + content_texts
        tfidf_matrix = vectorizer.fit_transform(all_texts)
        
        similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()
        
        # Rank results
        ranked_indices = similarities.argsort()[::-1]
        
        results = [
            {
                **content[i],
                "relevance_score": float(similarities[i]),
                "match_percentage": int(similarities[i] * 100)
            }
            for i in ranked_indices if similarities[i] > 0.1
        ]
        
        return {"results": results[:20]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Skill matching for marketplace
@app.post("/api/ai/match-skills")
async def match_skills(skill_offered: str, skills_wanted: List[str]):
    """Match offered skills with wanted skills"""
    try:
        if not skills_wanted:
            return {"matches": []}
        
        vectorizer = TfidfVectorizer()
        all_skills = [skill_offered] + skills_wanted
        tfidf_matrix = vectorizer.fit_transform(all_skills)
        
        similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()
        
        matches = [
            {
                "skill": skills_wanted[i],
                "match_score": float(similarities[i]),
                "compatibility": int(similarities[i] * 100)
            }
            for i in range(len(skills_wanted))
        ]
        
        matches.sort(key=lambda x: x['match_score'], reverse=True)
        
        return {"matches": matches}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Event recommendations
@app.post("/api/ai/recommend-events")
async def recommend_events(user_interests: List[str], available_events: List[dict]):
    """Recommend events based on user interests"""
    try:
        if not available_events:
            return {"recommendations": []}
        
        user_profile = " ".join(user_interests)
        event_descriptions = [
            f"{e.get('title', '')} {e.get('description', '')} {e.get('category', '')}"
            for e in available_events
        ]
        
        vectorizer = TfidfVectorizer()
        all_texts = [user_profile] + event_descriptions
        tfidf_matrix = vectorizer.fit_transform(all_texts)
        
        similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()
        
        recommendations = [
            {
                **available_events[i],
                "recommendation_score": float(similarities[i]),
                "match_percentage": int(similarities[i] * 100)
            }
            for i in range(len(available_events))
        ]
        
        recommendations.sort(key=lambda x: x['recommendation_score'], reverse=True)
        
        return {"recommendations": recommendations[:10]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/ai/health")
async def health():
    return {"status": "ok", "service": "AI Service"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
