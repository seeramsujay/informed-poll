import sys
import types
from unittest.mock import MagicMock

for mod_name in [
    "firebase_admin",
    "firebase_admin.firestore",
    "firebase_admin.credentials",
    "firebase_admin.auth",
    "lancedb",
    "google",
    "google.generativeai",
    "google.cloud",
    "google.cloud.firestore",
    "google.cloud.aiplatform",
    "pandas"
]:
    if mod_name not in sys.modules:
        m = MagicMock()
        sys.modules[mod_name] = m
