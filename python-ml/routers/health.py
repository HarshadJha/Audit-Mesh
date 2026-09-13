from fastapi import APIRouter
from datetime import datetime, timezone

router = APIRouter(tags=["Health"])

@router.get("/health")
async def get_health():
    return {
        "status": "healthy",
        "service": "audit-mesh-ml",
        "version": "1.0.0",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
