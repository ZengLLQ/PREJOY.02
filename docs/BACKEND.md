# Optional Backend

`backend/server.py` provides a sample status API using FastAPI and MongoDB. The letter page does not call this API.

## PowerShell setup

Prepare Python compatible with `requirements.txt` and either a running local MongoDB instance or an accessible MongoDB URI. The repository does not yet pin a Python version.

From the project root:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

Create `backend/.env` locally:

```dotenv
MONGO_URL=mongodb://127.0.0.1:27017
DB_NAME=farewell_michelle
CORS_ORIGINS=http://localhost:3000
```

Adjust the values for your environment. Git ignores `.env`; do not commit credentials. The server reads `.env` from the backend directory.

Run from `backend`:

```powershell
.\.venv\Scripts\python.exe -m uvicorn server:app --reload --host 127.0.0.1 --port 8000
```

API documentation is available at [localhost:8000/docs](http://localhost:8000/docs). Use `--reload` for development.

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGO_URL` | Yes | MongoDB connection URI |
| `DB_NAME` | Yes | Database name |
| `CORS_ORIGINS` | No | Comma-separated origins; defaults to `*` |

The two required variables are read when the module is imported. Use explicit origins matching the frontend; the parser does not remove spaces after commas. The middleware enables credentials and allows all methods and headers.

## API contract

| Method | Path | Input | Result |
| --- | --- | --- | --- |
| GET | `/api/` | None | `{"message":"Hello World"}` |
| POST | `/api/status` | JSON `{"client_name":"local-check"}` | New status object |
| GET | `/api/status` | None | Array of up to 1,000 status objects |

A status object contains an `id` UUID string, a `client_name` string, and a UTC `timestamp` datetime. Timestamps are stored as ISO strings in the `status_checks` collection. MongoDB's `_id` is excluded from the list endpoint response. There is no pagination or explicit ordering.

Example from another terminal:

```powershell
Invoke-RestMethod -Uri 'http://localhost:8000/api/'
Invoke-RestMethod -Uri 'http://localhost:8000/api/status' -Method Post -ContentType 'application/json' -Body '{"client_name":"local-check"}'
Invoke-RestMethod -Uri 'http://localhost:8000/api/status'
```

POST adds one document to the database. `GET /api/` only establishes that the application responds, not that the database connection is healthy. Status operations require an accessible MongoDB instance.

## Status and testing

The endpoints do not yet have authentication or authorization. The backend is a status scaffold, not a complete letter service. `requirements.txt` lists more dependencies than the server imports.

The pytest configuration requires `pytest-xdist` with `-n 2 --dist loadscope`. Once test cases exist, run from `backend`:

```powershell
.\.venv\Scripts\python.exe -m pytest
```

No backend test cases are currently included. If pip cannot obtain a package, inspect the error and the relevant package source; this guide does not assume that all dependencies have been tested on every Python version or Windows environment.

Return to the [README](../README.md).
