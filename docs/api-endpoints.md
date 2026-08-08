# API Endpoints

Base URL: `http://localhost:3000/api`

---

## Candidates

### Get Candidate by Registration Number

```
GET /candidates/:registrationNumber
```

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| registrationNumber | path (string) | Số báo danh của thí sinh |

**Response:**
```json
{
  "success": true,
  "message": "Candidate retrieved successfully",
  "data": {
    "registrationNumber": "01000002",
    "math": 8.6,
    "literature": 8.5,
    "physics": null,
    "foreignLanguage": 7.2,
    "chemistry": null,
    "biology": null,
    "history": 7.25,
    "geography": 6,
    "civicEducation": 8,
    "foreignLanguageCode": "N1"
  }
}
```

**Example:**
```bash
curl http://localhost:3000/api/candidates/01000002
```

---

## Analytics

### Get Top 10 Group A

```
GET /analytics/top-group-a
```

**Description:** Trả về top 10 thí sinh khối A (Toán, Vật lý, Hóa học) có điểm cao nhất.

**Response:**
```json
{
  "success": true,
  "message": "Top 10 Group A candidates retrieved successfully",
  "data": [
    {
      "registrationNumber": "01000001",
      "totalScore": 27.5,
      "math": 9.5,
      "physics": 9.0,
      "chemistry": 9.0
    }
    // ... 9 items
  ]
}
```

**Example:**
```bash
curl http://localhost:3000/api/analytics/top-group-a
```

---

### Get Score Distribution

```
GET /analytics/score-distribution
```

**Description:** Trả về phổ điểm theo các mức (0-2, 2-4, 4-6, 6-8, 8-10) cho từng môn học.

**Response:**
```json
{
  "success": true,
  "message": "Score distribution retrieved successfully",
  "data": {
    "math": {
      "0-2": 120,
      "2-4": 450,
      "4-6": 1200,
      "6-8": 2500,
      "8-10": 730
    },
    "literature": {
      "0-2": 80,
      "2-4": 320,
      "4-6": 1100,
      "6-8": 2800,
      "8-10": 700
    }
    // ... other subjects
  }
}
```

**Example:**
```bash
curl http://localhost:3000/api/analytics/score-distribution
```

---

## Error Responses

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "CANDIDATE_NOT_FOUND",
    "message": "Candidate not found"
  }
}
```

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid registration number format"
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "Internal server error"
  }
}
```
